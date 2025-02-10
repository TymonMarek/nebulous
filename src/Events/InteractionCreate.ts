import { Collection, Events, Interaction, MessageFlags } from "discord.js";
import { Text } from "../Core/Enums/TranslationKey";
import { Command } from "../Core/Commands/Command";
import Event from "../Core/Events/Event"
import Bot from "../Core/Bot";

export default class InteractionCreate extends Event {
    constructor(bot: Bot) {
        super(bot, {
            name: Events.InteractionCreate,
            description: "Fires every time a new interaction is created.",
            once: false
        })
    }
    
    OnEvent = (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command: Command = this.bot.commands.get(interaction.commandName)!;

        if (!command) {
            this.bot.commands.delete(interaction.commandName);
            return interaction.reply({
                content: this.bot.localization.get(interaction.locale, Text.UnknownCommandReply),
                flags: MessageFlags.Ephemeral
            });
        }

        const cooldowns = this.bot.cooldowns;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;

        const totalDebounceAmount = (command.debounce || 3) * 1000;
        const timeOfLastInteraction = timestamps.get(interaction.user.id) || 0;

        const isOnCooldown = timestamps.has(interaction.user.id) && (now < timeOfLastInteraction + totalDebounceAmount);

        if (isOnCooldown) {
            const timeUntilCooldownEnds = (timeOfLastInteraction + totalDebounceAmount) - now;

            return interaction.reply({
                content: `Please wait ${Math.ceil(timeUntilCooldownEnds / 1000)} seconds before trying this command again.`,
                flags: MessageFlags.Ephemeral
            })
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), totalDebounceAmount);

        try {
            const subCommandGroup = interaction.options.getSubcommandGroup(false);

            const subCommandId = [
                interaction.commandName,
                subCommandGroup || null,
                interaction.options.getSubcommand(false) || null
            ]
                .filter(Boolean)
                .join(".");

            const subCommand = this.bot.subCommands.get(subCommandId);
            return (subCommand ?? command).OnExecute(interaction);
            } catch (err) {
            console.error(err);
        }
    }
}
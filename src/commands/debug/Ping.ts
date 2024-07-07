import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import { CommandCategory } from "../../base/enums/commands/CommandCategory.js";
import { CommandContexts } from "../../base/enums/commands/CommandContexts.js";
import Command from "../../base/classes/commands/Command.js";
import Bot from "../../base/classes/core/Bot.js";

export default class Ping extends Command {
    constructor(bot: Bot) {
		super(bot, {
            name: "ping",
            description: "Get the bot's latency.",
            category: CommandCategory.Debug,
            contexts: [CommandContexts.DirectMessage, CommandContexts.Guild, CommandContexts.PriaveChannel],
            nsfw: false,
            default_member_permission: PermissionFlagsBits.SendMessages,
            enabled: true,
            cooldown: 5,
            options: []
        });
    }   

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const ping = this.bot.client.ws.ping
        this.bot.logger.debug(`Ping: ${ping}ms`);

        await interaction.reply({
            content: `Pong! ${this.bot.client.ws.ping}ms`,
            ephemeral: true
        });
    }
}
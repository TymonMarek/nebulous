import { ChatInputCommandInteraction, MessageFlags, PermissionsBitField } from "discord.js";
import { Text } from "../Core/Enums/TranslationKey";
import { Command } from "../Core/Commands/Command";
import Bot from "../Core/Bot";

export default class Ping extends Command {
    constructor(bot: Bot) {
        super(bot, {
            name: "ping",
            description: "Measure the time it takes for a message to do a full trip from the bot to Discord.",
            nsfw: false,

            options: [],
            
            defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
            enabledInDms: true,
            debounce: 3,
        })
    }

    async OnExecute(interaction: ChatInputCommandInteraction) {
        const startTime = Date.now(); 
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const responseTime = Date.now() - startTime;
    
        await interaction.editReply({
            content: this.bot.localization.get(interaction.locale, Text.PingReply, responseTime),
        });
    }
    
}
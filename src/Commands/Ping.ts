import { ChatInputCommandInteraction, MessageFlags, PermissionsBitField } from "discord.js";
import { Command } from "../Core/Commands/Command";
import Bot from "../Core/Bot";

export default class Ping extends Command {
    constructor(bot: Bot) {
        super(bot, {
            name: "ping",
            description: "Get the ping of the bot to you and Discord.",
            options: [],
            defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands,
            enabledInDms: true,
            debounce: 3
        })
    }

    async OnExecute(interaction: ChatInputCommandInteraction) {
        const startTime = Date.now(); 
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const responseTime = Date.now() - startTime;
    
        await interaction.editReply({
            content: `${responseTime}ms`,
        });
    }
    
}
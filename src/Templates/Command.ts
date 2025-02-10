import { ChatInputCommandInteraction, MessageFlags, PermissionsBitField } from "discord.js";
import { Text } from "../Core/Enums/TranslationKey"; 
import { Command } from "../Core/Commands/Command";
import Bot from "../Core/Bot";

/**
 * Represents a command in the bot.
 * Change the class name to something unique.
 */
export default class CommandClassTemplate extends Command {
    constructor(bot: Bot) {
        super(bot, {
            name: "command_name", // The command name (appears as "/command_name").
            description: "A brief command description.", // Shown under the command name.
            nsfw: false, // Set to `true` to restrict users under 18.

            options: [], // Define command options if necessary.

            defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands, // Minimum permission required to use the command.
            enabledInDms: true, // Allow usage in DMs.
            debounce: 3, // Cooldown time (in seconds) before reuse.
        });
    }

    async OnExecute(interaction: ChatInputCommandInteraction): Promise<void> {
        // Implement command logic here.
    }

    async OnAutoComplete(): Promise<void> {
        // Implement auto-completion logic here.
    }
}

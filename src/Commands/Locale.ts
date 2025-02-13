import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import Bot from "../Core/Bot";
import { Command } from "../Core/Commands/Command";

export default class LocaleCommand extends Command {
    constructor(bot: Bot) {
        super(bot, {
            name: "locale",
            description: "Get or set the locale.",
            nsfw: false,
            options: [
                {
                    name: "set",
                    description: "Set the locale of your preference.",
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: "get",
                    description: "Get the locale of your preference.",
                    type: ApplicationCommandOptionType.Subcommand,
                }
            ],
            defaultMemberPermissions: PermissionFlagsBits.UseApplicationCommands,
            enabledInDms: true,
            debounce: 0
        })
    }
}
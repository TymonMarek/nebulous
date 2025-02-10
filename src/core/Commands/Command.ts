import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import Bot from "../Bot";

/**
 * Represents the configuration options for a command.
 */
export interface ICommandOptions {
    /**
     * The name of the command, which will be used as a slash command (e.g., `/command_name`).
     */
    name: string;

    /**
     * A brief description of the command, shown in the command list.
     */
    description: string;

    /**
     * Whether the command is restricted to NSFW channels.
     * If `true`, users under 18 will be prohibited from executing the command.
     */
    nsfw: boolean;

    /**
     * The options (parameters) available for the command.
     * Typically an array of objects defining specific command arguments.
     */
    options: object; // Consider using a more specific type if possible.

    /**
     * The minimum permission level required for a user to execute this command.
     * Uses Discord's permission bitfield system.
     */
    defaultMemberPermissions: bigint;

    /**
     * Determines whether the command can be executed in Direct Messages (DMs).
     */
    enabledInDms: boolean;

    /**
     * The cooldown time (in seconds) before a user can use the command again.
     */
    debounce: number;
}

/**
 * Represents a command in the bot.
 */
export interface ICommand {
    /**
     * The bot instance that this command is associated with.
     */
    bot: Bot;

    /**
     * The name of the command, which will be used as a slash command (e.g., `/command_name`).
     */
    name: string;

    /**
     * A brief description of the command, shown in the command list.
     */
    description: string;

    /**
     * Whether the command is restricted to NSFW channels.
     * If `true`, users under 18 will be prohibited from executing the command.
     */
    nsfw: boolean;

    /**
     * The options (parameters) for the command.
     * Define specific parameters required for command execution.
     */
    options: object;

    /**
     * The minimum permission level required for a user to execute this command.
     * Uses Discord's permission bitfield system.
     */
    defaultMemberPermissions: bigint;

    /**
     * Determines whether the command can be executed in Direct Messages (DMs).
     */
    enabledInDms: boolean;

    /**
     * The cooldown time (in seconds) before a user can use the command again.
     */
    debounce: number;

    /**
     * Executes the command when triggered.
     * @param interaction - The interaction instance representing the command execution.
     * @returns A promise that resolves when the execution is complete.
     */
    OnExecute(interaction: ChatInputCommandInteraction): Promise<void>;

    /**
     * Handles command auto-completion for interactive input fields.
     * @param interaction - The interaction instance for autocompletion.
     * @returns A promise that resolves when the autocompletion is handled.
     */
    OnAutoComplete(interaction: AutocompleteInteraction): Promise<void>;
}

/**
 * Represents a bot command.
 */
export class Command implements ICommand {
    bot: Bot;
    name: string;
    description: string;
    options: object;
    nsfw: boolean;
    defaultMemberPermissions: bigint;
    enabledInDms: boolean;
    debounce: number;

    /**
     * Initializes a new command instance.
     * @param bot - The bot instance.
     * @param options - The configuration options for the command.
     */
    constructor(bot: Bot, options: ICommandOptions) {
        this.bot = bot;

        this.name = options.name;
        this.description = options.description;
        this.nsfw = options.nsfw;
        this.options = options.options;

        this.defaultMemberPermissions = options.defaultMemberPermissions;
        this.enabledInDms = options.enabledInDms;
        this.debounce = options.debounce;
    }

    /**
     * Executes the command when triggered.
     * @param interaction - The interaction instance representing the command execution.
     * @throws An error if the method is not implemented.
     */
    async OnExecute(interaction: ChatInputCommandInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /**
     * Handles command auto-completion for interactive input fields.
     * @param interaction - The interaction instance for autocompletion.
     * @throws An error if the method is not implemented.
     */
    async OnAutoComplete(interaction: AutocompleteInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

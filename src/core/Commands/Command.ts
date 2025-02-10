import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import Bot from "../Bot";

export interface ICommandOptions {
    name: string;
    description: string;
    options: object;
    
    defaultMemberPermissions: bigint;
    enabledInDms: boolean;
    debounce: number;
}

export interface ICommand {
    bot: Bot;

    name: string;
    description: string;
    options: object;
    
    defaultMemberPermissions: bigint;
    enabledInDms: boolean;
    debounce: number;

    OnExecute(interaction: ChatInputCommandInteraction): Promise<void>;
    AutoComplete(interaction: AutocompleteInteraction): Promise<void>;
}

export class Command implements ICommand {
    bot: Bot;

    name: string;
    description: string;
    options: object;

    defaultMemberPermissions: bigint;
    enabledInDms: boolean;
    debounce: number;
    
    constructor(bot: Bot, options: ICommandOptions) {
        this.bot = bot;

        this.name = options.name;
        this.description = options.description;
        this.options = options.options;
    
        this.defaultMemberPermissions = options.defaultMemberPermissions;
        this.enabledInDms = options.enabledInDms;
        this.debounce = options.debounce;
    }

    async OnExecute(interaction: ChatInputCommandInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async AutoComplete(interaction: AutocompleteInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

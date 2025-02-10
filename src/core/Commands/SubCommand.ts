import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../Bot";

export interface ISubCommand {
    bot: Bot;
    name: string;

    OnExecute(interaction: ChatInputCommandInteraction): void;
}

export interface ISubCommandOptions {
    name: string;
}

export class SubCommand implements ISubCommand {
    bot: Bot;
    name: string;
    
    constructor(bot: Bot, options: ISubCommandOptions) {
        this.bot = bot;
        this.name = options.name;
    }

    OnExecute(interaction: ChatInputCommandInteraction): void {
        throw new Error("Method not implemented.");
    }
}
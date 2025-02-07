import { ClientEvents } from "discord.js";
import Bot from "../Bot";

export interface IEventOptions {
    name: keyof ClientEvents,
    description: string,
    once: boolean,
}

export interface IEvent {
    bot: Bot;
    
    name: keyof ClientEvents,
    description: string,
    once: boolean,

    OnEvent(...args: any): void;
}

export default class Event implements IEvent {
    bot: Bot;

    name: keyof ClientEvents;
    description: string;
    once: boolean;

    constructor(bot: Bot, options: IEventOptions) {
        this.bot = bot;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    OnEvent(...args: any): void {
        throw new Error("Method not implemented.");
    }
}
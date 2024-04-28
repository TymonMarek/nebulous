import { Events } from "discord.js";
import IEvent from "../../interfaces/events/IEvent";
import IEventOptions from "../../interfaces/events/IEventOptions";
import Bot from "../core/Bot";

export default class Event implements IEvent {
	bot: Bot;

	name: Events;
	description: string;

	once: boolean;
	enabled: boolean;

	constructor(bot: Bot, options: IEventOptions) {
		this.bot = bot;

		this.name = options.name;
		this.description = options.description;

		this.once = options.once;
		this.enabled = options.enabled;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	async execute(...args: any[]): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

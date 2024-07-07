import Bot from "../../classes/core/Bot.js";
import { ClientEvents } from "discord.js";

export default interface IEvent {
	
	readonly bot: Bot;

	
	readonly name: keyof ClientEvents;

	
	readonly description: string;

	
	readonly once: boolean;

	
	readonly enabled: boolean;

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	execute(...args: any[]): Promise<void>;
}


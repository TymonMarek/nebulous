import { ClientEvents } from "discord.js";

export default interface IEventOptions {
	name: keyof ClientEvents;

	description: string;

	once: boolean;

	enabled: boolean;
}

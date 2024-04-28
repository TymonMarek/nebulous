import { Events } from "discord.js";

export default interface IEventOptions {
	/**
	 * @name name
	 * @description The name of the event.
	 **/
	name: Events;

	/**
	 * @name description
	 * @description The description of the event.
	 **/
	description: string;

	/**
	 * @name once
	 * @description If the event should only run once.
	 **/
	once: boolean;

	/**
	 * @name enabled
	 * @description If the event is enabled.
	 **/
	enabled: boolean;
}

import Bot from "../../classes/core/Bot";
import { Events } from "discord.js";

export default interface IEvent {
	/**
	 * @name bot
	 * @description The bot.
	 * @public
	 * @readonly
	 * @instance
	 */
	readonly bot: Bot;

	/**
	 * @name name
	 * @description The name of the event.
	 * @public
	 * @readonly
	 */
	readonly name: Events;

	/**
	 * @name description
	 * @description The description of the event.
	 * @public
	 * @readonly
	 */
	readonly description: string;

	/**
	 * @name once
	 * @description If the event should only run once.
	 * @public
	 * @readonly
	 */
	readonly once: boolean;

	/**
	 * @name enabled
	 * @description If the event is enabled.
	 * @public
	 * @readonly
	 */
	readonly enabled: boolean;

	/**
	 * @name Execute
	 * @description Executes the event.
	 * @public
	 * @async
	 * @param {any[]} args The arguments for the event.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	execute(...args: any[]): Promise<void>;
}

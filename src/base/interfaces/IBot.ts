import Handler from "../classes/Handler";
import Logger from "../classes/Logger";
import { Client } from "discord.js";

export default interface IBot {
	/**
	 * @name client
	 * @description The client for the bot.
	 * @public
	 */
	client: Client;

	/**
	 * @name logger
	 * @description The logger for the bot.
	 * @public
	 */
	logger: Logger;

	/**
	 * @name handler
	 * @description The handler for the bot.
	 * @public
	 */
	handler: Handler;

	/**
	 * @name Initialize
	 * @description Initializes the bot.
	 * @public
	 */
	Initialize(): Promise<void>; // Initialize the bot
}

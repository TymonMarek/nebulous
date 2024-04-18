import Handler from "../classes/Handler";
import Logger from "../classes/Logger";
import { Client } from "discord.js";
import IProcessArgs from "./IProcessArgs";

export default interface IBot {
	/**
	 * @name client
	 * @description The client for the bot.
	 * @public
	 */
	client: Client;

	/**
	 * @name args
	 * @description The arguments for the bot.
	 * @public
	 */
	args: IProcessArgs;

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

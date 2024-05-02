import Bot from "../../classes/core/Bot.js";

export default interface ILoader {
	/**
	 * @name bot
	 * @description The bot.
	 * @public
	 * @readonly
	 * @instance
	 */
	readonly bot: Bot;

	/**
	 * @name LoadCommands
	 * @description Loads the commands.
	 * @public
	 * @async
	 */
	loadEvents(): Promise<void>;

	/**
	 * @name LoadCommands
	 * @description Loads the commands.
	 * @public
	 * @async
	 */
	loadCommands(): Promise<void>;
}

import Bot from "../classes/Bot";

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
	LoadEvents(): Promise<void>;

	/**
	 * @name LoadCommands
	 * @description Loads the commands.
	 * @public
	 * @async
	 */
	LoadCommands(): Promise<void>;
}

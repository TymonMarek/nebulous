import Bot from "../classes/Bot";

export default interface IRegistrar {
	/**
	 * @name bot
	 * @description The bot.
	 * @public
	 * @readonly
	 * @instance
	 */
	readonly bot: Bot;

	/**
	 * @name RegisterCommands
	 * @description Registers the commands to Discord's API.
	 * @async
	 */
	RegisterCommands(): Promise<void>;
}
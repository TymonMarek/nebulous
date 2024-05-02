import Bot from "../../classes/core/Bot.js";

export default interface ILogger {
	/**
	 * @name bot
	 * @description The bot instance.
	 * @instance
	 */
	bot: Bot;

	/**
	 * @name info
	 * @description Logs an info message to the console and log file.
	 * @param message
	 */
	info(message: string): Promise<void>;

	/**
	 * @name warn
	 * @description Logs a warning message to the console and log file.
	 * @param message
	 */
	warn(message: string): Promise<void>;

	/**
	 * @name error
	 * @description Logs an error message to the console and log file, then throws that error.
	 * @param err
	 * @never @undefined @void
	 */
	error(err: Error | unknown): Promise<never | undefined | void>;

	/**
	 * @name debug
	 * @description Logs a debug message to the console and log file.
	 * @param message
	 */
	debug(message: string): Promise<void>;

	/**
	 * @name initialize
	 * @description Initializes the logger.
	 */
	initialize(): Promise<void>;
}

import Bot from "../classes/Bot";

export default interface ILogger {
	/**
	 * @name bot
	 * @description The bot instance.
	 * @instance
	 */
	bot: Bot;

	/**
	 * @name Info
	 * @description Logs an info message to the console and log file.
	 * @param message
	 */
	Info(message: string, saveToFile?: boolean): Promise<void>;

	/**
	 * @name Warn
	 * @description Logs a warning message to the console and log file.
	 * @param message
	 */
	Warn(message: string, saveToFile?: boolean): Promise<void>;

	/**
	 * @name Error
	 * @description Logs an error message to the console and log file.
	 * @param err
	 */
	Error(err: Error, saveToFile?: boolean): Promise<void>;

	/**
	 * @name Debug
	 * @description Logs a debug message to the console and log file.
	 * @param message
	 */
	Debug(message: string, saveToFile?: boolean): Promise<void>;
}

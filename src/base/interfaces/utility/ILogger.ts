import Bot from "../../classes/core/Bot.js";

export default interface ILogger {
	bot: Bot;

	info(message: string): Promise<void>;

	warn(message: string): Promise<void>;

	error(err: Error | unknown): Promise<never | undefined | void>;

	debug(message: string): Promise<void>;

	initialize(): Promise<void>;
}

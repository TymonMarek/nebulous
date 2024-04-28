import { existsSync, mkdirSync, writeFileSync, appendFileSync } from "fs";
import { LogMessageType } from "../../enums/utility/LogMessageType";
import ILogger from "../../interfaces/utility/ILogger";
import { blue, yellow, red, gray } from "chalk";
import { gzip } from "compressing";
import Bot from "../core/Bot";

export default class Logger implements ILogger {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async info(message: string): Promise<void> {
		const text = `[${LogMessageType.Info}] ${message}`;
		this.save(text);
		console.log(blue(message));
	}

	async warn(message: string): Promise<void> {
		const text = `[${LogMessageType.Warn}] ${message}`;
		this.save(text);
		console.warn(yellow(message));
	}

	async error(err: Error | unknown): Promise<never | undefined | void> {
		if (!(err instanceof Error)) {
			return this.warn("An error was reported, but it was not an instance of Error: " + err);
		}

		const text = `[${LogMessageType.Error}] ${err.name} - ${err.message}\n${err.stack}`;
		console.error(red(`${err.name}\n${err.message}\n${err.stack}`));
		this.save(text);
		process.exit(1);
	}

	async debug(message: string): Promise<void> {
		const text = `[${LogMessageType.Debug}] ${message}`;
		this.save(text);

		if (!this.bot.args.verbose) return;
		console.debug(gray(message));
	}

	/**
	 * @name initialize
	 * @description Initializes the logger.
	 */
	async initialize(): Promise<void> {
		console.log("Initializing logger...");

		if (!existsSync(`${process.cwd()}/logs`)) {
			console.log("Creating logs directory...");

			try {
				mkdirSync(`${process.cwd()}/logs`);
			} catch (err) {
				console.error("Failed to create logs directory: ", err);
			}
		}

		if (existsSync(`${process.cwd()}/logs/latest.txt`)) {
			await this.compress(`${process.cwd()}/logs/latest.txt`);
		}

		console.log("Creating log file...");

		try {
			writeFileSync(`${process.cwd()}/logs/latest.txt`, "");
		} catch (err) {
			console.error("Failed to create log file: ", err);
		}

		this.info("Logger initialized.");

		if (this.bot.args.verbose) {
			this.warn("Launched in verbose mode, this will log more information than usual.");
			this.warn("This mode is not recommended for production use!");
		}
	}

	/**
	 * @name Save
	 * @description Save to the log file.
	 * @param text The text to save.
	 * @private
	 */
	private async save(text: string): Promise<void> {
		if (!existsSync(`${process.cwd()}/logs/latest.txt`)) return;

		try {
			appendFileSync(`${process.cwd()}/logs/latest.txt`, text + "\n");
		} catch (err) {
			console.error("Failed to save to log file: ", err);
		}
	}

	/**
	 * @name Compress
	 * @description Compresses the file.
	 * @private
	 */
	private async compress(file: string): Promise<void> {
		console.log("Compressing file...");

		try {
			const date = new Date();
			const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			const formattedTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
			await gzip.compressFile(file, `${process.cwd()}/logs/${formattedDate}-${formattedTime}.txt.gz`);
		} catch (err) {
			console.error("Failed to compress file: ", err);
		}

		console.log("File compressed.");
	}
}

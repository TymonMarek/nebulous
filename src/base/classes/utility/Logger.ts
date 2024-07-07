import { existsSync, mkdirSync, writeFileSync, appendFileSync } from "fs";
import { LogMessageType } from "../../enums/utility/LogMessageType.js";
import ILogger from "../../interfaces/utility/ILogger.js";
import { gzip } from "compressing";
import Bot from "../core/Bot.js";
import chalk from "chalk";

export default class Logger implements ILogger {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async info(message: string): Promise<void> {
		const text = `[${LogMessageType.Info}] ${message}`;
		this.save(text);
		console.log(chalk.blue(message));
	}

	async warn(message: string): Promise<void> {
		const text = `[${LogMessageType.Warn}] ${message}`;
		this.save(text);
		console.warn(chalk.yellow(message));
	}

	async error(err: Error | unknown): Promise<never> {
		if (!(err instanceof Error)) {
			this.warn("An error was reported, but it was not an instance of Error: " + err);
			err = new Error("Unknown error occurred.");
			process.exit(1);
		}

		const text = `[${LogMessageType.Error}] ${err.name} - ${err.message}\n${err.stack}`;
		console.error(chalk.red(`${err.name}\n${err.message}\n${err.stack}`));
		this.save(text);
		process.exit(1);
	}

	async debug(message: string): Promise<void> {
		const text = `[${LogMessageType.Debug}] ${message}`;
		this.save(text);

		if (!this.bot.args) return; // If the bot args are not yet initialized, return
		if (!this.bot.args.verbose) return;
		console.debug(chalk.gray(message));
	}

	
	async initialize(): Promise<void> {
		this.debug("Initializing logger...");

		if (!existsSync(`${process.cwd()}/logs`)) {
			this.debug("Creating logs directory...");

			try {
				mkdirSync(`${process.cwd()}/logs`);
			} catch (err) {
				this.error(new Error(`Failed to create logs directory: ${err}`));
			}
		}

		if (existsSync(`${process.cwd()}/logs/latest.txt`)) {
			this.debug("Compressing old log file...");
			await this.compress(`${process.cwd()}/logs/latest.txt`);
		}

		this.debug("Creating log file...");

		try {
			writeFileSync(`${process.cwd()}/logs/latest.txt`, "");
		} catch (err) {
			this.error(new Error(`Failed to create log file: ${err}`));
		}

		this.info("Logger initialized.");

		if (this.bot.args.verbose) {
			this.warn("Launched in verbose mode, this will log more information than usual.");
			this.warn("This mode is not recommended for production use!");
		}
	}

	
	private async save(text: string): Promise<void> {
		if (!existsSync(`${process.cwd()}/logs/latest.txt`)) return;

		try {
			appendFileSync(`${process.cwd()}/logs/latest.txt`, text + "\n");
		} catch (err) {
			this.error(new Error(`Failed to save to log file: ${err}`));
		}
	}

	
	private async compress(file: string): Promise<void> {
		this.debug("Compressing file...");

		try {
			const date = new Date();
			const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			const formattedTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
			await gzip.compressFile(file, `${process.cwd()}/logs/${formattedDate}-${formattedTime}.txt.gz`, {});
		} catch (err) {
			this.error(new Error(`Failed to compress file: ${err}`));
		}

		this.debug("File compressed.");
	}
}


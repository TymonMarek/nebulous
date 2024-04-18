import { existsSync, mkdirSync, writeFileSync, appendFileSync } from "fs";
import { blue, yellow, red, gray } from "chalk";
import ILogger from "../interfaces/ILogger";
import { LogType } from "../enums/LogType";
import { gzip } from "compressing";
import Bot from "./Bot";

export default class Logger implements ILogger {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async Info(message: string): Promise<void> {
		const text = `[${LogType.Info}] ${message}`;
		this.Save(text);
		console.log(blue(message));
	}

	async Warn(message: string): Promise<void> {
		const text = `[${LogType.Warn}] ${message}`;
		this.Save(text);
		console.warn(yellow(message));
	}

	async Error(err: Error): Promise<never> {
		const text = `[${LogType.Error}] ${err.name} - ${err.message}\n${err.stack}`;
		console.error(red(`${err.name}\n${err.message}\n${err.stack}`));
		this.Save(text);
		throw err;
	}

	async Debug(message: string): Promise<void> {
		const text = `[${LogType.Debug}] ${message}`;
		this.Save(text);

		if (!this.bot.args.verbose) return;
		console.debug(gray(message));
	}

	/**
	 * @name Initialize
	 * @description Initializes the logger.
	 */
	async Initialize(): Promise<void> {
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
			await this.Compress(`${process.cwd()}/logs/latest.txt`);
		}

		console.log("Creating log file...");

		try {
			writeFileSync(`${process.cwd()}/logs/latest.txt`, "");
		} catch (err) {
			console.error("Failed to create log file: ", err);
		}

		this.Info("Logger initialized.");
	}

	/**
	 * @name Save
	 * @description Save to the log file.
	 * @param text The text to save.
	 * @private
	 */
	private async Save(text: string): Promise<void> {
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
	private async Compress(file: string): Promise<void> {
		console.log("Compressing file...");

		try {
			const date = new Date();
			const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			await gzip.compressFile(
				file,
				`${process.cwd()}/logs/${formattedDate}.txt.gz`
			);
		} catch (err) {
			console.error("Failed to compress file: ", err);
		}

		console.log("File compressed.");
	}
}

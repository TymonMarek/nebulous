import IBot from "../interfaces/IBot";
import { Client, Collection } from "discord.js";
import dotenv from "dotenv";
import Logger from "./Logger";
import Handler from "./Handler";
import IProcessArgs from "../interfaces/IProcessArgs";
import Command from "./Command";
import SubCommand from "./SubCommand";

export default class Bot implements IBot {
	readonly client: Client;
	readonly args: IProcessArgs;
	
	readonly commands: Collection<string, Command>;
	readonly subCommands: Collection<string, SubCommand>;

	readonly cooldowns: Collection<string, Collection<string, number>>;

	readonly handler: Handler;
	readonly logger: Logger;

	public constructor() {
		this.client = new Client({ intents: [] });
		this.args = this.ParseProcessArgs();

		this.commands = new Collection();
		this.subCommands = new Collection();

		this.cooldowns = new Collection();

		this.handler = new Handler(this);
		this.logger = new Logger(this);
	}

	async Initialize(): Promise<void> {
		await this.logger.Initialize(); // Initialize the logger
		
		await this.handler.LoadEvents(); // Load the events
		await this.handler.LoadCommands(); // Load the commands

		if (dotenv.config().error) {
			// Load the .env file and check for errors
			throw new Error(
				"No .env file found, please create a .env file with the required fields."
			);
		}

		if (!process.env.TOKEN) {
			// Check if the token is provided
			throw new Error(
				"No token provided, please provide a token in the .env file."
			);
		}

		this.logger.Info("Bot is starting..."); // Log that the bot is starting

		try {
			await this.client.login(process.env.TOKEN); // Login to the client
		} catch (error) {
			console.error(error); // Log if there is an error
		}

		this.logger.Info("Bot initilized!"); // Log that the bot is initialized
	}

	ParseProcessArgs(): IProcessArgs {
		const args = process.argv.filter((arg) => arg.startsWith("--"));

		const processArgs: IProcessArgs = {
			verbose: args.includes("--verbose")
		};

		return processArgs;
	}
}

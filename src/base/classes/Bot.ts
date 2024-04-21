import IBot from "../interfaces/IBot";
import { Client, Collection } from "discord.js";
import dotenv from "dotenv";
import Logger from "./Logger";
import Handler from "./Handler";
import IProcessArgs from "../interfaces/IProcessArgs";
import Command from "./Command";
import SubCommand from "./SubCommand";
import Loader from "./Loader";
import Registrar from "./Registrar";

export default class Bot implements IBot {
	readonly client: Client;
	readonly token: string;

	readonly args: IProcessArgs;

	readonly commands: Collection<string, Command>;
	readonly subCommands: Collection<string, SubCommand>;

	readonly cooldowns: Collection<string, Collection<string, number>>;

	readonly registrar: Registrar;
	readonly handler: Handler;

	readonly loader: Loader;
	readonly logger: Logger;

	public constructor() {
		this.client = new Client({ intents: [] });

		if (dotenv.config().error) {
			// Load the .env file and check for errors
			throw new Error("No .env file found, please create a .env file with the required fields.");
		}

		if (!process.env.TOKEN) {
			// Check if the token is provided
			throw new Error("No token provided, please provide a token in the .env file.");
		}

		this.token = process.env.TOKEN;

		this.args = this.ParseProcessArgs();

		this.commands = new Collection();
		this.subCommands = new Collection();

		this.cooldowns = new Collection();

		this.registrar = new Registrar(this);
		this.handler = new Handler(this);

		this.loader = new Loader(this);
		this.logger = new Logger(this);
	}

	async Initialize(): Promise<void> {
		await this.logger.Initialize(); // Initialize the logger
		this.logger.Debug("Bot is starting..."); // Log that the bot is starting

		await this.loader.LoadEvents(); // Load the events
		await this.loader.LoadCommands(); // Load the commands

		try {
			await this.client.login(process.env.TOKEN); // Login to the client
		} catch (error) {
			console.error(error); // Log if there is an error
		}

		this.logger.Info("Bot loaded!"); // Log that the bot is loaded
	}

	ParseProcessArgs(): IProcessArgs {
		const args = process.argv.filter((arg) => arg.startsWith("--"));

		const processArgs: IProcessArgs = {
			verbose: args.includes("--verbose")
		};

		return processArgs;
	}
}

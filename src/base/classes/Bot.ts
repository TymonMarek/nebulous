import IProcessArgs from "../interfaces/IProcessArgs";
import { Client, Collection } from "discord.js";
import IBot from "../interfaces/IBot";
import SubCommand from "./SubCommand";
import Formatter from "./Formatter";
import Registrar from "./Registrar";
import Database from "./Database";
import Command from "./Command";
import Handler from "./Handler";
import Loader from "./Loader";
import Logger from "./Logger";
import dotenv from "dotenv";

export default class Bot implements IBot {
	readonly client: Client;

	readonly mongodbURL: string;
	readonly token: string;

	readonly args: IProcessArgs;

	readonly commands: Collection<string, Command>;
	readonly subCommands: Collection<string, SubCommand>;

	readonly cooldowns: Collection<string, Collection<string, number>>;

	readonly database: Database;

	readonly formatter: Formatter;

	readonly registrar: Registrar;
	readonly handler: Handler;

	readonly loader: Loader;
	readonly logger: Logger;

	public constructor() {
		this.logger = new Logger(this);

		this.client = new Client({ intents: [] });

		if (dotenv.config().error) {
			// Load the .env file and check for errors
			this.logger.error(new Error("No .env file found, please create a .env file with the required fields."));
		}

		if (!process.env.DISCORD_TOKEN) {
			// Check if the token is provided
			this.logger.error(new Error("No token provided, please provide a DISCORD_TOKEN in the .env file."));
		}

		if (!process.env.MONGODB_URL) {
			// Check if the mongodb username is provided
			this.logger.error(new Error("No MongoDB URL provided, please provide a MONGODB_URL in the .env file."));
		}

		this.mongodbURL = process.env.MONGODB_URL!;
		this.token = process.env.DISCORD_TOKEN!;

		this.args = this.ParseProcessArgs();

		this.commands = new Collection();
		this.subCommands = new Collection();

		this.cooldowns = new Collection();

		this.database = new Database(this);

		this.formatter = new Formatter();

		this.registrar = new Registrar(this);
		this.handler = new Handler(this);

		this.loader = new Loader(this);
	}

	async Initialize(): Promise<void> {
		this.logger.debug("Bot is starting..."); // Log that the bot is starting

		await this.database.Connect(); // Connect to the database
		await this.loader.LoadEvents(); // Load the events
		await this.loader.LoadCommands(); // Load the commands

		try {
			await this.client.login(this.token); // Login to the client.
		} catch (error) {
			this.logger.error(error); // Log if there is an error
		}

		this.logger.info("Bot loaded!"); // Log that the bot is loaded
	}

	ParseProcessArgs(): IProcessArgs {
		const args = process.argv.filter((arg) => arg.startsWith("--"));

		const processArgs: IProcessArgs = {
			verbose: args.includes("--verbose")
		};

		return processArgs;
	}
}

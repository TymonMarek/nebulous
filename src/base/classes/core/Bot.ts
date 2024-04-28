import IProcessArgs from "../../interfaces/misc/IProcessArgs";
import SubCommand from "../commands/SubCommand";
import { Client, Collection } from "discord.js";
import IBot from "../../interfaces/core/IBot";
import Formatter from "../utility/Formatter";
import Command from "../commands/Command";
import Logger from "../utility/Logger";
import Registrar from "./Registrar";
import Database from "./Database";
import Handler from "./Handler";
import Loader from "./Loader";
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

		this.args = this.parseProcessArgs();

		this.commands = new Collection();
		this.subCommands = new Collection();

		this.cooldowns = new Collection();

		this.database = new Database(this);

		this.formatter = new Formatter();

		this.registrar = new Registrar(this);
		this.handler = new Handler(this);

		this.loader = new Loader(this);
	}

	async initialize(): Promise<void> {
		this.logger.debug("Bot is starting..."); // Log that the bot is starting

		await this.logger.initialize(); // Initialize the logger
		await this.database.connect(); // Connect to the database
		await this.loader.loadEvents(); // Load the events
		await this.loader.loadCommands(); // Load the commands

		try {
			this.logger.debug("Logging in..."); // Log that the bot is logging in
			await this.client.login(this.token); // Login to the client.
			this.logger.debug("Logged in!"); // Log that the bot is logged in
		} catch (error) {
			this.logger.error(error); // Log if there is an error
		}

		this.logger.info("Bot loaded!"); // Log that the bot is loaded
	}

	parseProcessArgs(): IProcessArgs {
		const args = process.argv.filter((arg) => arg.startsWith("--"));

		this.logger.debug("Parsing process arguments...");

		const processArgs: IProcessArgs = {
			verbose: args.includes("--verbose")
		};

		this.logger.debug(`Process arguments: ${JSON.stringify(processArgs)}`);
		return processArgs;
	}
}

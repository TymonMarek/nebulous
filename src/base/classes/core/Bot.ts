import IProcessArgs from "../../interfaces/process/IProcessArgs.js";
import IProcessEnv from "../../interfaces/process/IProcessEnv.js";
import SubCommand from "../commands/SubCommand.js";
import IBot from "../../interfaces/core/IBot.js";
import Formatter from "../utility/Formatter.js";
import { Client, Collection } from "discord.js";
import Command from "../commands/Command.js";
import Logger from "../utility/Logger.js";
import Registrar from "./Registrar.js";
import Database from "./Database.js";
import Handler from "./Handler.js";
import Loader from "./Loader.js";
import dotenv from "dotenv";

export default class Bot implements IBot {
	readonly client: Client;

	readonly token: string;

	readonly env: IProcessEnv;
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

		this.env = this.parseProcessEnv();
		this.args = this.parseProcessArgs();

		this.token = process.env.DISCORD_TOKEN!;

		this.commands = new Collection();
		this.subCommands = new Collection();
		this.cooldowns = new Collection();

		this.database = new Database(this);
		this.formatter = new Formatter(this);
		this.registrar = new Registrar(this);
		this.handler = new Handler(this);
		this.loader = new Loader(this);
	}

	async initialize(): Promise<void> {
		this.logger.debug("Bot is starting..."); // Log that the bot is starting

		await this.logger.initialize(); // Initialize the logger
		await this.database.initialize(); // Connect to the database
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
		const args = process.argv.filter((arg) => arg.startsWith("--")); // Filter out the arguments that start with "--"

		this.logger.debug("Parsing process arguments...");

		const processArgs: IProcessArgs = {
			verbose: args.includes("--verbose") || args.includes("--v") // Check if the verbose flag is provided
		};

		this.logger.debug(`Process arguments: ${JSON.stringify(processArgs)}`);
		return processArgs;
	}

	parseProcessEnv(): IProcessEnv {
		if (dotenv.config().error) {
			this.logger.warn("A '.env' file was not found!");
			this.logger.debug(dotenv.config().error?.message || "An unknown error was provided.");
		}

		if (!process.env.DISCORD_TOKEN) {
			this.logger.error(new Error("No token provided!"));
		}

		const env: IProcessEnv = {
			DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
			DATABASE_URI: process.env.DATABASE_URI!,
			DATABASE_USER: process.env.DATABASE_USER!,
			DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!
		};

		if (!env.DATABASE_URI) {
			this.logger.error("No database URI provided!");
		}

		this.logger.debug(`Parsed environment variables: ${JSON.stringify(env)}`);

		return env;
	}
}

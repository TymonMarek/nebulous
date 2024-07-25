import IDatabase from "../../interfaces/core/IDatabase.js";
import { SGuild } from "../../schemas/SGuild.js";
import { SUser } from "../../schemas/SUser.js";
import MGuilds from "../../models/MGuilds.js";
import MUsers from "../../models/MUsers.js";
import mongoose, { Model } from "mongoose";
import Bot from "./Bot.js";

export default class Database implements IDatabase {
	readonly bot: Bot;

	readonly guilds: Model<SGuild>;
	readonly users: Model<SUser>;

	private readonly user: string;
	private readonly password: string;
	private readonly uri: string;
	private readonly collection: string;

	constructor(bot: Bot) {
		this.bot = bot;

		this.guilds = MGuilds;
		this.users = MUsers;

		this.user = bot.env.DATABASE_USER;
		this.password = bot.env.DATABASE_PASSWORD;
		this.uri = bot.env.DATABASE_URI;
		this.collection = bot.env.DATABASE_COLLECTION || "test";
	}

	async initialize(): Promise<void> {
		await this.connect();
	}

	async connect(): Promise<void> {
		this.bot.logger.info("Connecting to database...");
		try {
			this.bot.logger.debug(`Connecting to ${this.uri}...`);
			await mongoose.connect(`mongodb+srv://${this.user}:${this.password}@${this.uri}/${this.collection}`, {});
			this.bot.logger.debug(`Connected to collection ${this.collection} with user ${this.user} at database ${this.uri}!`);
			this.bot.logger.info(`Connected to database!`);
		} catch (error) {
			this.bot.logger.error(new Error(`Failed to connect to database: ${error}`));
		}
	}

	async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			this.bot.logger.info("Disconnected from database.");
		} catch (error) {
			this.bot.logger.error(new Error(`Failed to disconnect from database: ${error}`));
		}
	}
}


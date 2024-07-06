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

	private readonly url: string;

	constructor(bot: Bot) {
		this.bot = bot;

		this.guilds = MGuilds;
		this.users = MUsers;

		if (!process.env.MONGODB_URL) {
			this.bot.logger.info("No MongoDB URL provided, using mongodb://database:27017/ instead.");
			this.bot.logger.debug("The current environment is optimized for Docker.");
			this.bot.logger.debug("You can provide a MongoDB URL by setting the MONGODB_URL environment variable.");
		}

		this.url = process.env.MONGODB_URL || "mongodb://database:27017/haze";
	}

	async initialize(): Promise<void> {
		await this.connect();
	}

	async connect(): Promise<void> {
		this.bot.logger.info("Connecting to MongoDB...");
		try {
			await mongoose.connect(this.url, {});
			this.bot.logger.info("Connected to MongoDB!");
		} catch (error) {
			this.bot.logger.error(new Error(`Failed to connect to MongoDB: ${error}`));
		}
	}

	async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			this.bot.logger.info("Disconnected from MongoDB.");
		} catch (error) {
			this.bot.logger.error(new Error(`Failed to disconnect from MongoDB: ${error}`));
		}
	}
}


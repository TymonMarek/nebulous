import IDatabase from "../interfaces/IDatabase";
import mongoose, { Model } from "mongoose";
import { SGuild } from "../schemas/SGuild";
import { SUser } from "../schemas/SUser";
import MGuilds from "../models/MGuilds";
import MUsers from "../models/MUsers";
import Bot from "./Bot";

export default class Database implements IDatabase {
	readonly bot: Bot;

	readonly guilds: Model<SGuild>;
	readonly users: Model<SUser>;

	constructor(bot: Bot) {
		this.bot = bot;

		this.guilds = MGuilds;
		this.users = MUsers;
	}

	async Connect(): Promise<void> {
		try {
			await mongoose.connect(this.bot.mongodbURI);
			this.bot.logger.Info("Connected to MongoDB.");
		} catch (error) {
			this.bot.logger.Error(new Error(`Failed to connect to MongoDB: ${error}`));
		}
	}

	async Disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			this.bot.logger.Info("Disconnected from MongoDB.");
		} catch (error) {
			this.bot.logger.Error(new Error(`Failed to disconnect from MongoDB: ${error}`));
		}
	}
}

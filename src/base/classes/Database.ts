import IDatabase from "../interfaces/IDatabase";
import mongoose, { Model } from "mongoose";
import { SGuild } from "../schemas/SGuild";
import { SUser } from "../schemas/SUser";
import MGuilds from "../models/MGuilds";
import MUsers from "../models/MUsers";
import { existsSync } from "fs";
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

	async initialize(): Promise<void> {
		if (!existsSync(`${process.cwd()}/certs/mongodb.pem`)) {
			this.bot.logger.warn("MongoDB certificate not found!");
			this.bot.logger.warn(
				`Please provide a MongoDB certificate at "${process.cwd()}/certs/" and call it "mongodb.pem"!`
			);
		}
	}

	async connect(): Promise<void> {
		try {
			await mongoose.connect(
				`mongodb+srv://${this.bot.mongodbURL}/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
				{
					tlsCertificateKeyFile: `${process.cwd()}/certs/mongodb.pem`,
					authMechanism: "MONGODB-X509",
					authSource: "$external"
				}
			);

			this.bot.logger.info("Connected to MongoDB.");
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

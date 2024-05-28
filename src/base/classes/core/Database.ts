import IDatabase from "../../interfaces/core/IDatabase.js";
import { SGuild } from "../../schemas/SGuild.js";
import { SUser } from "../../schemas/SUser.js";
import mongoose, { Model } from "mongoose";
import MGuilds from "../../models/MGuilds.js";
import MUsers from "../../models/MUsers.js";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import Bot from "./Bot.js";

export default class Database implements IDatabase {
	readonly bot: Bot;

	readonly guilds: Model<SGuild>;
	readonly users: Model<SUser>;

	private readonly url: string;
	private readonly cert: string;

	constructor(bot: Bot) {
		this.bot = bot;

		this.guilds = MGuilds;
		this.users = MUsers;

		if (!process.env.MONGODB_URL) {
			// Check if the mongodb username is provided
			this.bot.logger.info("No MongoDB URL provided.");
			this.bot.logger.warn("WARNING! All database related queries will fall back to a localhost!");
		}

		if (!process.env.MONGODB_CERT) {
			this.bot.logger.info("No MongoDB certificate provided.");
			this.bot.logger.warn("WARNING! All database related queries will most likely fail!");
		}

		this.url = process.env.MONGODB_URL! || "localhost";
		this.cert = process.env.MONGODB_CERT! || "";
	}

	async initialize(): Promise<void> {
		if (!existsSync(`${process.cwd()}/certs/mongodb.pem`)) {
			this.bot.logger.warn(
				"MongoDB certificate not found, attempting to generate one using environment variables!"
			);

			if (!this.cert) {
				this.bot.logger.error(new Error("No MongoDB certificate provided, unable to generate one!"));
			}

			try {
				this.bot.logger.debug("Generating MongoDB certificate...");
				mkdirSync(`${process.cwd()}/certs`);
				writeFileSync(`${process.cwd()}/certs/mongodb.pem`, this.cert);
				this.bot.logger.info("MongoDB certificate generated!");
			} catch (error) {
				this.bot.logger.error(new Error(`Failed to generate MongoDB certificate: ${error}`));
			}

			await this.connect();
		}
	}

	async connect(): Promise<void> {
		try {
			await mongoose.connect(
				`mongodb+srv://${this.url}/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
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

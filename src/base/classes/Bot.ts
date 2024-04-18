import IBot from "../interfaces/IBot";
import { Client } from "discord.js";
import dotenv from "dotenv";
import Logger from "./Logger";
import Handler from "./Handler";

export default class Bot implements IBot {
	client: Client;

	handler: Handler;
	logger: Logger;

	public constructor() {
		this.client = new Client({ intents: [] });

		this.handler = new Handler(this);
		this.logger = new Logger(this);
	}

	async Initialize(): Promise<void> {
		await this.logger.Initialize(); // Initialize the logger
		await this.handler.LoadEvents(); // Load the events

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
}

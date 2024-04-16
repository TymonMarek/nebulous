import IBot from "../interfaces/IBot";
import { Client } from "discord.js";
import dotenv from "dotenv";

export default class Bot extends Client implements IBot {
	public constructor() {
		super({ intents: [] });
	}

	async Initialize(): Promise<void> {
		if (dotenv.config().error) { // Load the .env file and check for errors
			throw new Error("No .env file found, please create a .env file with the required fields.");
		}
	
		if (!process.env.TOKEN) { // Check if the token is provided
			throw new Error("No token provided, please provide a token in the .env file.");
		}

		try {
			await this.login(process.env.TOKEN) // Login to the bot
		} catch (error) {
			console.error(error); // Log if there is an error
		}

		console.log("Bot initialized.");
	}
}
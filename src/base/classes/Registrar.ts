import IAPICommand from "../interfaces/IAPICommand";
import IRegistrar from "../interfaces/IRegistrar";
import { REST, Routes } from "discord.js";
import Bot from "./Bot";

export default class Registrar implements IRegistrar {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async RegisterCommands(): Promise<void> {
		try {
			const commands = this.bot.commands.filter(command => command.enabled); // Filter out disabled commands
			const data: IAPICommand[] = []; // Array to store command data

			for (const [, command] of commands) {
				data.push(await command.toJSON()); // Push command data to the array
			}

			this.bot.logger.Debug(`Started refreshing ${data.length} application (/) commands.`); 

			const rest = new REST().setToken(this.bot.token); // Create a new REST client
			await rest.put(Routes.applicationCommands(this.bot.client.user!.id), { body: data }); // Register commands

			this.bot.logger.Info(`Successfully reloaded ${data.length} application (/) commands.`); 

		} catch (error) {
			this.bot.logger.Error(new Error(`Failed to register commands: ${error}`));
		}
	}
}

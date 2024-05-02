import IAPICommand from "../../interfaces/commands/IAPICommand.js";
import IRegistrar from "../../interfaces/core/IRegistrar.js";
import { REST, Routes } from "discord.js";
import Bot from "./Bot.js";

export default class Registrar implements IRegistrar {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async registerCommands(): Promise<void> {
		try {
			const commands = this.bot.commands.filter((command) => command.enabled); // Filter out disabled commands
			const data: IAPICommand[] = []; // Array to store command data

			for (const [, command] of commands) {
				data.push(await command.toJSON()); // Push command data to the array
			}

			this.bot.logger.info(`Started refreshing ${data.length} application (/) commands...`);

			const rest = new REST().setToken(this.bot.token); // Create a new REST client
			await rest.put(Routes.applicationCommands(this.bot.client.user!.id), { body: data }); // Register commands

			this.bot.logger.info(`Successfully reloaded ${data.length} application (/) commands!`);
		} catch (error) {
			this.bot.logger.error(new Error(`Failed to register commands: ${error}`));
		}
	}
}

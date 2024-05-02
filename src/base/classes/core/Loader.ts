import ILoader from "../../interfaces/core/ILoader.js";
import SubCommand from "../commands/SubCommand.js";
import Command from "../commands/Command.js";
import Event from "../events/Event.js";
import { glob } from "glob";
import Bot from "./Bot.js";
import path from "path";
import url from "url";

export default class Loader implements ILoader {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async loadEvents(): Promise<void> {
		this.bot.logger.debug("Loading events...");

		const files = (await glob(`${path.join(import.meta.dirname, "../../../events")}/**/*.js`)).map((file) =>
			path.resolve(file)
		);			

		if (!files.length) return this.bot.logger.warn("No events found!");
		this.bot.logger.debug(`Found ${files.length} events...`);

		const eventLoader = files.map(async (file) => {
			this.bot.logger.debug(`Found event ${file}`);

			const pathUrl = url.pathToFileURL(file).href;
			const event: Event = new (await import(pathUrl)).default(this.bot);

			if (!event.name) {
				this.bot.logger.warn(`${file} failed to load due to missing name!`);
			}

			if (!event.enabled) {
				this.bot.logger.warn(`${file} failed to load due to being disabled!`);
			}

			try {
				this.bot.logger.debug(`Loading event ${event.name}`);

				if (event.once) {
					// @ts-expect-error This correctly passes the arguments to the event
					this.bot.client.once(event.name, (...args) => event.Execute(...args));
				} else {
					// @ts-expect-error This correctly passes the arguments to the event
					this.bot.client.on(event.name, (...args) => event.Execute(...args));
				}
			} catch (error) {
				this.bot.logger.error(new Error(`Event ${file} failed to load: ${error}`));
			}

			this.bot.logger.debug(`Event ${event.name} loaded!`);
		});

		await Promise.all(eventLoader);
		this.bot.logger.info("Events hooked!");
	}

	async loadCommands(): Promise<void> {
		this.bot.logger.debug("Loading commands...");
		
		const files = (await glob(`${path.join(import.meta.dirname, "../../../commands")}/**/*.js`)).map((file) =>
			path.resolve(file)
		);

		if (!files.length) return this.bot.logger.warn("No commands found!");
		this.bot.logger.debug(`Found ${files.length} commands...`);

		const commandLoader = files.map(async (file) => {
			const pathUrl = url.pathToFileURL(file).href;
			const command: Command | SubCommand = new (await import(pathUrl)).default(this.bot);

			if (!command.name) {
				this.bot.logger.warn(`${file} failed to load due to missing name!`);
			}

			if (!command.enabled) {
				this.bot.logger.warn(`${file} failed to load due to being disabled!`);
			}

			try {
				this.bot.logger.debug(`Loading command ${command.name}`);

				if (command instanceof Command) {
					this.bot.commands.set(command.name, command);
				} else {
					this.bot.subCommands.set(command.name, command);
				}
			} catch (error) {
				this.bot.logger.error(new Error(`Command ${file} failed to load: ${error}`));
			}

			this.bot.logger.debug(`Command ${command.name} loaded successfully!`);
		});

		await Promise.all(commandLoader);
		this.bot.logger.info("Commands loaded!");
	}
}

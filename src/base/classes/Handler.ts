import IHandler from "../interfaces/IHandler";
import Event from "../classes/Event";
import { glob } from "glob";
import path from "path";
import Bot from "./Bot";

export default class Handler implements IHandler {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async LoadEvents(): Promise<void> {
		const files = (
			await glob(`${path.join(__dirname, "../../events")}/**/*.js`)
		).map((file) => path.resolve(file));

		this.bot.logger.Debug("Loading events...");

		files.map(async (file) => {
			const event: Event = new (await import(file)).default(this.bot);

			if (!event.name) {
				this.bot.logger.Warn(
					`${file} failed to load due to missing name!`
				);
				return delete require.cache[require.resolve(file)];
			}

			if (!event.enabled) {
				this.bot.logger.Warn(
					`${file} failed to load due to being disabled!`
				);
				return delete require.cache[require.resolve(file)];
			}

			try {
				this.bot.logger.Debug(`Loading event ${event.name}`);

				if (event.once) {
					// @ts-expect-error This correctly passes the arguments to the event
					this.bot.client.once(event.name, (...args) =>
						event.Execute(...args)
					);
				} else {
					// @ts-expect-error This correctly passes the arguments to the event
					this.bot.client.on(event.name, (...args) =>
						event.Execute(...args)
					);
				}
			} catch (error) {
				this.bot.logger.Error(
					new Error(`Event ${file} failed to load: ${error}`)
				);
			}

			this.bot.logger.Debug(`Event ${event.name} loaded!`);
			return delete require.cache[require.resolve(file)];
		});

		this.bot.logger.Info("Events loaded!");
	}
}

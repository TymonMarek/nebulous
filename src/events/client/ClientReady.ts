import Event from "../../base/classes/events/Event.js";
import Bot from "../../base/classes/core/Bot.js";
import { Events } from "discord.js";

export default class ClientReady extends Event {
	constructor(bot: Bot) {
		super(bot, {
			name: Events.ClientReady,
			description: "Triggered when the client is ready.",

			enabled: true,
			once: true
		});
	}

	async Execute() {
		this.bot.logger.info(`Client is ready! (Logged in as ${this.bot.client.user?.tag})`);
		this.bot.registrar.registerCommands(); // Register commands to the API
	}
}

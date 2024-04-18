import { Events } from "discord.js";
import Bot from "../../base/classes/Bot";
import Event from "../../base/classes/Event";

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
		this.bot.logger.Info(
			`Client is ready! (Logged in as ${this.bot.client.user?.tag})`
		);
	}
}

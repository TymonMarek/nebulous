import { Events } from "discord.js";
import Bot from "../../base/classes/Bot";
import Event from "../../base/classes/Event";

export default class InteractionCreate extends Event {
	constructor(bot: Bot) {
		super(bot, {
			name: Events.InteractionCreate,
			description: "Triggered when an interaction is created.",
			enabled: true,
			once: false
		});
	}

	async Execute() {
		this.bot.logger.Debug("Interaction created!");
	}
}

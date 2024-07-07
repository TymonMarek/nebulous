import Event from "../../base/classes/events/Event.js";
import Bot from "../../base/classes/core/Bot.js";
import { Events, Guild } from "discord.js";

export default class GuildDelete extends Event {
	constructor(bot: Bot) {
		super(bot, {
			name: Events.GuildDelete,
			description: "Emitted when the client leaves a guild.",
			enabled: true,
			once: false
		});
	}

	public async Execute(guild: Guild): Promise<void> {
		this.bot.logger.debug(`Left guild ${guild.name} (${guild.id})`);

		if (!(await this.bot.database.guilds.exists({ id: guild.id }))) return; // If the guild doesn't exist in the database, return.

		await this.bot.database.guilds.deleteOne({ id: guild.id }); // Delete the document from the database.
	}
}


import { Events, Guild } from "discord.js";
import Bot from "../../base/classes/Bot";
import Event from "../../base/classes/Event";

export default class GuildCreate extends Event {
	constructor(bot: Bot) {
		super(bot, {
			name: Events.GuildCreate,
			description: "Emitted when the client joins a guild.",
			enabled: true,
			once: false
		});
	}

	public async Execute(guild: Guild): Promise<void> {
		this.bot.logger.Debug(`Joined guild ${guild.name} (${guild.id})`);

		if (await this.bot.database.guilds.exists({ id: guild.id })) return; // If the guild already exists in the database, return.

		await this.bot.database.guilds.create({
			id: guild.id // Create a new document in the database.
		});
	}
}
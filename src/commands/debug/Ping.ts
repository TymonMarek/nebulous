import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import { Category } from "../../base/enums/Category";
import { Contexts } from "../../base/enums/Contexts";
import Command from "../../base/classes/Command";
import Bot from "../../base/classes/Bot";

export default class Ping extends Command {
	constructor(bot: Bot) {
		super(bot, {
			name: "ping",
			description: "Ping the bot.",
			category: Category.Debug,

			enabled: true,
			cooldown: 5,
			nsfw: false,

			default_member_permission: PermissionFlagsBits.SendMessages,
			contexts: [Contexts.Guild, Contexts.DirectMessage, Contexts.PriaveChannel],
			options: []
		});
	}

	async Execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const now = Date.now();
		const ping = Math.floor(now - interaction.createdTimestamp);

		await interaction.editReply(`🏓 Pong! \`${ping}ms\``);
	}
}
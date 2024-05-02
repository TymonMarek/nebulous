import { PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";
import { CommandCategory } from "../../base/enums/commands/CommandCategory.js";
import { CommandContexts } from "../../base/enums/commands/CommandContexts.js";
import Command from "../../base/classes/commands/Command.js";
import Bot from "../../base/classes/core/Bot.js";

export default class Ping extends Command {
	constructor(bot: Bot) {
		super(bot, {
			name: "ping",
			description: "Ping the bot.",
			category: CommandCategory.Debug,

			enabled: true,
			cooldown: 5,
			nsfw: false,

			default_member_permission: PermissionFlagsBits.SendMessages,
			contexts: [CommandContexts.Guild, CommandContexts.DirectMessage, CommandContexts.PriaveChannel],
			options: []
		});
	}

	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const now = Date.now();
		const ping = Math.floor(now - interaction.createdTimestamp);

		await interaction.editReply(`🏓 Pong! \`${ping}ms\``);
	}
}

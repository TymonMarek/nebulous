import {
	PermissionFlagsBits,
	ChatInputCommandInteraction,
	EmbedBuilder,
	Colors,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder
} from "discord.js";
import { CommandCategory } from "../../base/enums/commands/CommandCategory";
import { CommandContexts } from "../../base/enums/commands/CommandContexts";
import Command from "../../base/classes/commands/Command";
import Bot from "../../base/classes/core/Bot";

export default class Info extends Command {
	constructor(bot: Bot) {
		super(bot, {
			name: "info",
			description: "Get information about the bot.",
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
		const infoEmbed = new EmbedBuilder()
			.setTitle("Bot Information")
			.setDescription(
				`**Bot ID:** ${this.bot.client.user?.id}\n**Bot Tag:** ${this.bot.client.user?.tag}\n**Bot Created At:** ${this.bot.client.user?.createdAt}`
			)
			.setFooter({ text: `Powered by nebulous`, iconURL: this.bot.client.user?.displayAvatarURL() || "" })
			.setThumbnail("https://raw.githubusercontent.com/TymonMarek/nebulous/main/imgs/logo.png")
			.setColor(Colors.Blue)
			.setTimestamp();

		const link = new ButtonBuilder()
			.setURL("https://github.com/TymonMarek/nebulous")
			.setStyle(ButtonStyle.Link)
			.setLabel("Repository");

		const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(link);

		await interaction.reply({ embeds: [infoEmbed], components: [actionRow] });
	}
}

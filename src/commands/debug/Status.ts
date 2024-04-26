import { ChatInputCommandInteraction, Colors, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Category } from "../../base/enums/Category";
import { Contexts } from "../../base/enums/Contexts";
import Command from "../../base/classes/Command";
import Bot from "../../base/classes/Bot";

export default class Status extends Command {
	constructor(bot: Bot) {
		super(bot, {
			name: "status",
			description: "Check the status of the bot.",
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

		const system = process.platform;
		const ping = Date.now() - interaction.createdTimestamp;
		const uptime = this.bot.formatter.formatMilliseconds(this.bot.client.uptime ?? 0);

		const cpu = process.cpuUsage().system / 1024 / 1024;
		const cpuUsage = `${Math.round(cpu * 100) / 100}%`;

		const memory = process.memoryUsage().heapUsed / 1024 / 1024;
		const memoryUsage = `${Math.round(memory * 100) / 100}MB`;

		const systemEmbed = new EmbedBuilder()
			.setTitle("System")
			.setColor(Colors.Green)
			.addFields(
				{
					name: "OS",
					value: system,
					inline: true
				},
				{
					name: "Uptime",
					value: uptime,
					inline: true
				},
				{
					name: "CPU",
					value: cpuUsage,
					inline: true
				},
				{
					name: "RAM",
					value: memoryUsage,
					inline: true
				},
				{
					name: "Ping",
					value: `${ping}ms`,
					inline: true
				}
			)
			.setTimestamp();

		await interaction.editReply({ embeds: [systemEmbed] });
	}
}

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

		const guildCount = this.bot.client.guilds.cache.size;
		const userCount = this.bot.client.users.cache.size;
		const channelCount = this.bot.client.channels.cache.size;

		const system = process.platform;
		const ping = Date.now() - interaction.createdTimestamp;
		const uptime = this.bot.formatter.formatMilliseconds(this.bot.client.uptime ?? 0);

		const cpu = process.cpuUsage().system / 1024 / 1024;
		const cpuUsage = `${Math.round(cpu * 100) / 100}MB`;

		const memory = process.memoryUsage().heapUsed / 1024 / 1024;
		const memoryUsage = `${Math.round(memory * 100) / 100}MB`;

		const systemEmbed = new EmbedBuilder()
			.setTitle("System")
			.setColor(Colors.Green)
			.addFields(
				{
					name: "OS",
					value: system
				},
				{
					name: "Uptime",
					value: uptime
				}
			)
			.addFields(
				{
					name: "CPU",
					value: cpuUsage
				},
				{
					name: "RAM",
					value: memoryUsage
				}
			)
			.setTimestamp();

		const botEmbed = new EmbedBuilder()
			.setTitle("Bot")
			.setColor(Colors.Grey)
			.addFields(
				{
					name: "Guilds",
					value: `${guildCount}`
				},
				{
					name: "Users",
					value: `${userCount}`
				},
				{
					name: "Channels",
					value: `${channelCount}`
				},
				{
					name: "Ping",
					value: `${ping}ms`
				}
			)
			.setTimestamp();

		await interaction.editReply({ embeds: [systemEmbed, botEmbed] });
	}
}

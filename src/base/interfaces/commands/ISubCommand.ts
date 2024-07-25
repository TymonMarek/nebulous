import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../../classes/core/Bot.js";

export default interface ISubcommand {
	readonly bot: Bot;

	readonly name: string;
	readonly enabled: boolean;

	readonly execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

import ISubcommandOptions from "../../interfaces/commands/ISubCommandOptions";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import ISubcommand from "../../interfaces/commands/ISubCommand";
import Bot from "../core/Bot";

export default class SubCommand implements ISubcommand {
	readonly bot: Bot;
	readonly name: string;
	readonly enabled: boolean;

	constructor(bot: Bot, options: ISubcommandOptions) {
		this.bot = bot;
		this.name = options.name;
		this.enabled = options.enabled;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		throw new Error("Method not implemented.");
	}
}

import { ChatInputCommandInteraction, CacheType } from "discord.js";
import ISubcommand from "../interfaces/ISubCommand";
import Bot from "./Bot";
import ISubcommandOptions from "../interfaces/ISubCommandOptions";

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
	async Execute(interaction: ChatInputCommandInteraction<CacheType>) {
		throw new Error("Method not implemented.");
	};
}
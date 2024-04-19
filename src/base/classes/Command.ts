import { AutocompleteInteraction, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import ICommandOptions from "../interfaces/ICommandOptions";
import { Contexts } from "../enums/commands/Contexts";
import { Category } from "../enums/commands/Category";
import ICommand from "../interfaces/ICommand";
import Bot from "./Bot";

export default class Command implements ICommand {
	readonly bot: Bot;

	readonly name: string;
	readonly description: string;
	readonly category: Category;

	readonly enabled: boolean;
	readonly cooldown: number;
	readonly nsfw: boolean;

	readonly default_member_permission: typeof PermissionFlagsBits;
	readonly contexts: Contexts[];

	readonly options: object;

	constructor(bot: Bot, options: ICommandOptions) {
		this.bot = bot;

		this.name = options.name;
		this.description = options.description;
		this.category = options.category;

		this.enabled = options.enabled;
		this.cooldown = options.cooldown;
		this.nsfw = options.nsfw;

		this.default_member_permission = options.default_member_permission;
		this.contexts = options.contexts;

		this.options = options.options;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async Execute(interaction: ChatInputCommandInteraction) {
		throw new Error("Method not implemented.");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async Autocomplete(interaction: AutocompleteInteraction) {
		throw new Error("Method not implemented.");
	}
}
import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import ICommandOptions from "../interfaces/ICommandOptions";
import { Contexts } from "../enums/Contexts";
import { Category } from "../enums/Category";
import ICommand from "../interfaces/ICommand";
import Bot from "./Bot";
import IAPICommand from "../interfaces/IAPICommand";

export default class Command implements ICommand {
	readonly bot: Bot;

	readonly name: string;
	readonly description: string;
	readonly category: Category;

	readonly enabled: boolean;
	readonly cooldown: number;
	readonly nsfw: boolean;

	readonly default_member_permission: bigint;
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

	async toJSON(): Promise<IAPICommand> {
		const data: IAPICommand = {
			options: this.options,

			name: this.name,
			description: this.description,

			default_member_permission: this.default_member_permission.toString(),
			contexts: this.contexts,
			nsfw: this.nsfw
		};

		return data;
	}
}

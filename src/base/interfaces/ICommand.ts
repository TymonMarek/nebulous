import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { Category } from "../enums/Category";
import { Contexts } from "../enums/Contexts";
import Bot from "../classes/Bot";

export default interface ICommand {
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

	/**
	 * What to do when the command is executed.
	 * @name Execute
	 * @param {ChatInputCommandInteraction} interaction
	 * @readonly
	 * @async
	 */
	readonly Execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

	/**
	 * What to do when the command arguments are autocompleted.
	 * @name Autocomplete
	 * @param {AutocompleteInteraction} interaction
	 * @readonly
	 * @async
	 */
	readonly Autocomplete: (interaction: AutocompleteInteraction) => Promise<void>;
}

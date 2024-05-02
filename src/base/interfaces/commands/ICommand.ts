import { ChatInputCommandInteraction, AutocompleteInteraction } from "discord.js";
import { CommandCategory } from "../../enums/commands/CommandCategory.js";
import { CommandContexts } from "../../enums/commands/CommandContexts.js";
import Bot from "../../classes/core/Bot.js";

export default interface ICommand {
	readonly bot: Bot;

	readonly name: string;
	readonly description: string;
	readonly category: CommandCategory;

	readonly enabled: boolean;
	readonly cooldown: number;
	readonly nsfw: boolean;

	readonly default_member_permission: bigint;
	readonly contexts: CommandContexts[];

	readonly options: object;

	/**
	 * What to do when the command is executed.
	 * @name Execute
	 * @param {ChatInputCommandInteraction} interaction
	 * @readonly
	 * @async
	 */
	readonly execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

	/**
	 * What to do when the command arguments are autocompleted.
	 * @name Autocomplete
	 * @param {AutocompleteInteraction} interaction
	 * @readonly
	 * @async
	 */
	readonly autocomplete: (interaction: AutocompleteInteraction) => Promise<void>;
}

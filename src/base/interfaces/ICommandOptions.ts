import { Category } from "../enums/commands/Category";
import { Contexts } from "../enums/commands/Contexts";

export default interface ICommandOptions {
	/**
	 * The name of the command.
	 */
	name: string;

	/**
	 * The description of the command.
	 */
	description: string;

	/**
	 * The category of the command.
	 */
	category: Category;

	/**
	 * Whether the command is enabled or not.
	 */
	enabled: boolean;

	/**
	 * The cooldown of the command.
	 */
	cooldown: number;

	/**
	 * Whether the command is NSFW or not.
	 */
	nsfw: boolean;

	/**
	 * The member permissions required to use the command.
	 *
	 */
	default_member_permission: bigint;

	/**
	 * The contexts the command can be ran in.
	 */
	contexts: Contexts[];

	/**
	 * The options of the command.
	 */
	options: object;
}

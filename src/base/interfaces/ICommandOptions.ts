import { CommandCategory } from "../enums/CommandCategory";
import { CommandContexts } from "../enums/CommandContexts";

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
	category: CommandCategory;

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
	contexts: CommandContexts[];

	/**
	 * The options of the command.
	 */
	options: object;
}

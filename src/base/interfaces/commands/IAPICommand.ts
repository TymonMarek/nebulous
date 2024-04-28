/**
 * @name IAPICommand
 * @description The interface for a command, as seen on the Discord API.
 */
export default interface IAPICommand {
	/**
	 * @name name
	 * @description The name of the command.
	 */
	readonly name: string;

	/**
	 * @name description
	 * @description The description of the command.
	 */
	readonly description: string;

	/**
	 * @name nsfw
	 * @description Whether the command is NSFW (Not Safe For Work).
	 */
	readonly nsfw?: boolean;

	/**
	 * @name default_member_permission
	 * @description The default member permission required to run the command.
	 */
	readonly default_member_permission?: string;

	/**
	 * @name contexts
	 * @description The contexts in which the command can be run.
	 */
	readonly contexts?: number[];

	/**
	 * @name options
	 * @description The options for the command.
	 */
	readonly options: object;
}

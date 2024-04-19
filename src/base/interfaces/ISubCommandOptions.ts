export default interface ISubcommandOptions {
	/**
	 * The name of the subcommand.
	 * @name name
	 * @readonly
	 * @instance
	*/
	readonly name: string;

	/**
	 * If the command is enabled.
	 * @name enabled
	 * @readonly
	*/
	readonly enabled: boolean;
}
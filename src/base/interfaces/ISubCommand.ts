import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../classes/Bot";

export default interface ISubcommand {
	/**
	 * The bot instance.
	 * @name bot
	 * @readonly
	 * @instance
	*/
	readonly bot: Bot;

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
	
	/**
	 * What to do when the subcommand is executed.
	 * @name Execute
	 * @param interaction 
	 * @async
	 */
	readonly Execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
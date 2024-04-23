import Handler from "../classes/Handler";
import Logger from "../classes/Logger";
import { Client, Collection } from "discord.js";
import IProcessArgs from "./IProcessArgs";
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";
import Loader from "../classes/Loader";
import Registrar from "../classes/Registrar";
import Database from "../classes/Database";
import Formatter from "../classes/Formatter";

export default interface IBot {
	/**
	 * @name client
	 * @description The client for the bot.
	 * @public
	 */
	client: Client;

	/**
	 * @name mongodbURI
	 * @description The mongodb database URI for the bot.
	 * @public
	 */
	mongodbURI: string;

	/**
	 * @name token
	 * @description The token for the bot.
	 * @public
	 */
	token: string;

	/**
	 * @name commands
	 * @description The commands for the bot.
	 * @public
	 */
	commands: Collection<string, Command>;

	/**
	 * @name subcommands
	 * @description The subcommands for the bot.
	 * @public
	 */
	subCommands: Collection<string, SubCommand>;

	/**
	 * @name cooldowns
	 * @description The cooldowns for users using commands.
	 * @public
	 */
	cooldowns: Collection<string, Collection<string, number>>;

	/**
	 * @name args
	 * @description The arguments for the bot passed on startup.
	 * @public
	 */
	args: IProcessArgs;

	/**
	 * @name database
	 * @description The database for the bot.
	 * @public
	 */
	database: Database;

	/**
	 * @name formatter
	 * @description The formatter for the bot.
	 * @public
	 */
	formatter: Formatter;

	/**
	 * @name registrar
	 * @description The registrar for the bot.
	 * @public
	 */
	registrar: Registrar;

	/**
	 * @name loader
	 * @description The loader for the bot.
	 * @public
	 */
	loader: Loader;

	/**
	 * @name logger
	 * @description The logger for the bot.
	 * @public
	 */
	logger: Logger;

	/**
	 * @name handler
	 * @description The event and command handler for the bot.
	 * @public
	 */
	handler: Handler;

	/**
	 * @name Initialize
	 * @description Initializes the bot.
	 * @public
	 */
	Initialize(): Promise<void>; // Initialize the bot

	/**
	 * @name ParseProcessArgs
	 * @description Parses the process arguments.
	 * @public
	 */
	ParseProcessArgs(): IProcessArgs; // Parse the process arguments
}

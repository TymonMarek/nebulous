import SubCommand from "../../classes/commands/SubCommand.js";
import Formatter from "../../classes/utility/Formatter.js";
import Command from "../../classes/commands/Command.js";
import Registrar from "../../classes/core/Registrar.js";
import Database from "../../classes/core/Database.js";
import Logger from "../../classes/utility/Logger.js";
import Handler from "../../classes/core/Handler.js";
import IProcessArgs from "../misc/IProcessArgs.js";
import { Client, Collection } from "discord.js";
import Loader from "../../classes/core/Loader.js";

export default interface IBot {
	
	client: Client;

	
	token: string;

	
	commands: Collection<string, Command>;

	
	subCommands: Collection<string, SubCommand>;

	
	cooldowns: Collection<string, Collection<string, number>>;

	
	args: IProcessArgs;

	
	database: Database;

	
	formatter: Formatter;

	
	registrar: Registrar;

	
	loader: Loader;

	
	logger: Logger;

	
	handler: Handler;

	
	initialize(): Promise<void>; // Initialize the bot

	
	parseProcessArgs(): IProcessArgs; // Parse the process arguments
}


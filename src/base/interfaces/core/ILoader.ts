import Bot from "../../classes/core/Bot.js";

export default interface ILoader {
	
	readonly bot: Bot;

	
	loadEvents(): Promise<void>;
	loadCommands(): Promise<void>;
}


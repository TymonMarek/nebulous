import Bot from "../../classes/core/Bot.js";

export default interface IRegistrar {
	readonly bot: Bot;

	registerCommands(): Promise<void>;
}

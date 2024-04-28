import { SGuild } from "../schemas/SGuild";
import { SUser } from "../schemas/SUser";
import { Model } from "mongoose";
import Bot from "../classes/Bot";

export default interface IDatabase {
	/**
	 * @name bot
	 * @description The bot.
	 * @readonly
	 */
	readonly bot: Bot;

	/**
	 * @name guilds
	 * @description The guilds model.
	 * @type {SGuild}
	 * @readonly
	 */
	readonly guilds: Model<SGuild>;

	/**
	 * @name users
	 * @description The users model.
	 * @type {SUsers}
	 * @readonly
	 */
	readonly users: Model<SUser>;

	/**
	 * @name Initialize
	 * @description Initializes the database.
	 * @async
	 */
	initialize(): Promise<void>;

	/**
	 * @name Connect
	 * @description Connects to the database.
	 * @async
	 */
	connect(): Promise<void>;

	/**
	 * @name Disconnect
	 * @description Disconnects from the database.
	 * @async
	 */
	disconnect(): Promise<void>;
}

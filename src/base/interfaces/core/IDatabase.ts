import { SGuild } from "../../schemas/SGuild.js";
import { SUser } from "../../schemas/SUser.js";
import Bot from "../../classes/core/Bot.js";
import { Model } from "mongoose";

export default interface IDatabase {
	
	readonly bot: Bot;

	
	readonly guilds: Model<SGuild>;

	
	readonly users: Model<SUser>;

	
	initialize(): Promise<void>;

	
	connect(): Promise<void>;

	
	disconnect(): Promise<void>;
}


import { CommandCategory } from "../../enums/commands/CommandCategory.js";
import { CommandContexts } from "../../enums/commands/CommandContexts.js";

export default interface ICommandOptions {
	name: string;
	description: string;
	category: CommandCategory;
	contexts: CommandContexts[];
	nsfw: boolean;

	default_member_permission: bigint;

	enabled: boolean;
	cooldown: number;

	options: object;
}

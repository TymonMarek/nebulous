import Bot from "../../classes/core/Bot";

export default interface IFormatter {
	/**
	 * @name bot
	 * @description The bot for the formatter.
	 * @public
	 */
	bot: Bot;

	/**
	 * @name formatMilliseconds
	 * @description Formats milliseconds into a human-readable format.
	 * @param milliseconds The milliseconds to format.
	 * @returns The formatted string.
	 */
	formatMilliseconds(milliseconds: number): string;
}

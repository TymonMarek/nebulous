import Bot from "../../classes/core/Bot";

export default interface IFormatter {
	bot: Bot;

	formatMilliseconds(milliseconds: number): string;
}

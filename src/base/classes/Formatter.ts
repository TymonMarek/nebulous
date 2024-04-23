import IFormatter from "../interfaces/IFormatter";

export default class Formatter implements IFormatter {
	formatMilliseconds(milliseconds: number): string {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		const formattedDays = days > 0 ? `${days} days` : "";
		const formattedHours = hours > 0 ? `${hours % 24} hours` : "";
		const formattedMinutes = minutes > 0 ? `${minutes % 60} minutes` : "";
		const formattedSeconds = seconds > 0 ? `${seconds % 60} seconds` : "";

		return [formattedDays, formattedHours, formattedMinutes, formattedSeconds].filter(Boolean).join(" ");
	}
}

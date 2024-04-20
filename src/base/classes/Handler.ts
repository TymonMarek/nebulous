import IHandler from "../interfaces/IHandler";
import Bot from "./Bot";

import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction
} from "discord.js";

export default class Handler implements IHandler {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async OnApplicationCommand(interaction: ChatInputCommandInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async OnMessageComponent(interaction: MessageComponentInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async OnAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async OnModalSubmit(interaction: ModalSubmitInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

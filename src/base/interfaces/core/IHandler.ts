import {
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction
} from "discord.js";
import Bot from "../../classes/core/Bot.js";

export default interface IHandler {
	
	readonly bot: Bot;

	
	onApplicationCommand(interaction: ChatInputCommandInteraction): Promise<void>;

	
	onAutocomplete(interaction: AutocompleteInteraction): Promise<void>;

	
	onMessageComponent(interaction: MessageComponentInteraction): Promise<void>;

	
	onModalSubmit(interaction: ModalSubmitInteraction): Promise<void>;
}


import {
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction
} from "discord.js";
import Bot from "../../classes/core/Bot.js";

export default interface IHandler {
	/**
	 * @name bot
	 * @description The bot.
	 * @public
	 * @readonly
	 * @instance
	 */
	readonly bot: Bot;

	/**
	 * @name OnApplicationCommand
	 * @description Handles a command.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	onApplicationCommand(interaction: ChatInputCommandInteraction): Promise<void>;

	/**
	 * @name OnAutocomplete
	 * @description Handles an autocomplete interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	onAutocomplete(interaction: AutocompleteInteraction): Promise<void>;

	/**
	 * @name OnMessageComponent
	 * @description Handles a message component interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	onMessageComponent(interaction: MessageComponentInteraction): Promise<void>;

	/**
	 * @name OnModalSubmit
	 * @description Handles a modal submit interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	onModalSubmit(interaction: ModalSubmitInteraction): Promise<void>;
}

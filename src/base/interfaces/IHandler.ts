import { AutocompleteInteraction, ChatInputCommandInteraction, MessageComponentInteraction, ModalSubmitInteraction } from "discord.js";
import Bot from "../classes/Bot";

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
	 * @name LoadCommands
	 * @description Loads the commands.
	 * @public
	 * @async
	 */
	LoadEvents(): Promise<void>;

	/**
	 * @name LoadCommands
	 * @description Loads the commands.
	 * @public
	 * @async
	 */
	LoadCommands(): Promise<void>;

	/**
	 * @name OnApplicationCommand
	 * @description Handles a command.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	OnApplicationCommand(interaction: ChatInputCommandInteraction): Promise<void>;
	
	/**
	 * @name OnAutocomplete
	 * @description Handles an autocomplete interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	OnAutocomplete(interaction: AutocompleteInteraction): Promise<void>;

	/**
	 * @name OnMessageComponent
	 * @description Handles a message component interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	OnMessageComponent(interaction: MessageComponentInteraction): Promise<void>;

	/**
	 * @name OnModalSubmit
	 * @description Handles a modal submit interaction.
	 * @param {ChatInputCommandInteraction} interaction The interaction.
	 * @async
	 */
	OnModalSubmit(interaction: ModalSubmitInteraction): Promise<void>;
}

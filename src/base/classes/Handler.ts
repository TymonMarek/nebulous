import { CommandContexts } from "../enums/CommandContexts";
import IHandler from "../interfaces/IHandler";
import Bot from "./Bot";

import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	Collection,
	MessageComponentInteraction,
	ModalSubmitInteraction
} from "discord.js";

export default class Handler implements IHandler {
	bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	async onApplicationCommand(interaction: ChatInputCommandInteraction): Promise<void> {
		const command = this.bot.commands.get(interaction.commandName);

		if (!command) {
			interaction.reply({ content: "This command doesn't exist!", ephemeral: true });
			this.bot.logger.warn(`A user tried to use ${interaction.commandName} but it doesn't exist!`);
			return;
		}

		if (interaction.guild && !command.contexts.includes(CommandContexts.Guild)) {
			interaction.reply({ content: "This command can't be used in a guild!", ephemeral: true });
			this.bot.logger.warn(
				`A user tried to use ${interaction.commandName} in a guild but it can't be used in a guild!`
			);
			return;
		}

		if (!interaction.guild && !command.contexts.includes(CommandContexts.DirectMessage)) {
			interaction.reply({ content: "This command can't be used in a DM!", ephemeral: true });
			this.bot.logger.warn(
				`A user tried to use ${interaction.commandName} in a DM but it can't be used in a DM!`
			);
			return;
		}

		if (command.cooldown > 0) {
			if (!this.bot.cooldowns.has(command.name)) {
				this.bot.cooldowns.set(command.name, new Collection());
			}

			const now = Date.now();
			const cooldown = command.cooldown * 1000;
			const timestamps = this.bot.cooldowns.get(command.name)!;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id)! + cooldown;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					interaction.reply({
						content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
						ephemeral: true
					});

					setTimeout(() => {
						interaction.deleteReply();
						timestamps.delete(interaction.user.id);
						if (timestamps.size === 0) this.bot.cooldowns.delete(command.name);
					}, expirationTime - now);

					return;
				}
			}

			timestamps.set(interaction.user.id, now);

			setTimeout(() => {
				timestamps.delete(interaction.user.id);
				if (timestamps.size === 0) this.bot.cooldowns.delete(command.name);
			}, cooldown);
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });

			if (error instanceof Error) {
				this.bot.logger.error(error);
			} else {
				this.bot.logger.error(new Error(String(error)));
			}
		}

		this.bot.logger.debug(`${interaction.user.tag} executed ${interaction.commandName}`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async onMessageComponent(interaction: MessageComponentInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async onAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
		const command = this.bot.commands.get(interaction.commandName);
		if (!command) return;

		if (command.autocomplete) {
			command.autocomplete(interaction);
		}

		this.bot.logger.debug(`${interaction.user.tag} autocompleted ${interaction.commandName}`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async onModalSubmit(interaction: ModalSubmitInteraction): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

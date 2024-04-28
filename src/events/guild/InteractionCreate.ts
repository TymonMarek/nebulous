import { ChatInputCommandInteraction, Events, Interaction, InteractionType } from "discord.js";
import Bot from "../../base/classes/Bot";
import Event from "../../base/classes/Event";

export default class InteractionCreate extends Event {
	constructor(bot: Bot) {
		super(bot, {
			name: Events.InteractionCreate,
			description: "Triggered when an interaction is created.",
			enabled: true,
			once: false
		});
	}

	async Execute(interaction: Interaction) {
		this.bot.logger.debug(
			`new Interaction { 
				id: ${interaction.id}, 
				type: ${interaction.type}, 
				user: ${interaction.user.tag}, 
				guild: ${interaction.guild?.id},
				channel: ${interaction.channel?.id},
				createdAt: ${interaction.createdTimestamp}
			}`
		);

		try {
			switch (interaction.type) {
				case InteractionType.ApplicationCommand:
					this.bot.handler.onApplicationCommand(interaction as ChatInputCommandInteraction);
					break;

				case InteractionType.MessageComponent:
					this.bot.handler.onMessageComponent(interaction);
					break;

				case InteractionType.ApplicationCommandAutocomplete:
					this.bot.handler.onAutocomplete(interaction);
					break;

				case InteractionType.ModalSubmit:
					this.bot.handler.onModalSubmit(interaction);
					break;
			}
		} catch (error) {
			return this.bot.logger.error(new Error(`Interaction ${interaction.id} failed to process: ${error}`));
		}

		this.bot.logger.debug(`Interaction ${interaction.id} processed successfully!`);
	}
}

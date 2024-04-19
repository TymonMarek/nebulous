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
		this.bot.logger.Debug(
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
					this.bot.handler.OnApplicationCommand(interaction as ChatInputCommandInteraction);
					break;
	
				case InteractionType.MessageComponent:
					this.bot.handler.OnMessageComponent(interaction);
					break;
	
				case InteractionType.ApplicationCommandAutocomplete:
					this.bot.handler.OnAutocomplete(interaction);
					break;
	
				case InteractionType.ModalSubmit:
					this.bot.handler.OnModalSubmit(interaction);
					break;
			}
		} catch (error) {
			return this.bot.logger.Error(
				new Error(`Interaction ${interaction.id} failed to process: ${error}`)
			);			
		}

		this.bot.logger.Debug(`Interaction ${interaction.id} processed successfully!`);
	}
}

import { ChatInputCommandInteraction, Locale } from "discord.js";
import { SubCommand } from "../Core/Commands/SubCommand";
import { Text } from "../Core/Enums/Text"
import Bot from "../Core/Bot";
import { LocaleToFlag } from "../Core/Utility/Emoji";

export default class LocaleGetCommand extends SubCommand {
    constructor(bot: Bot) {
        super(bot, {
            name: "locale.get"
        })
    }

    async OnExecute(interaction: ChatInputCommandInteraction) {
        const profile = await this.bot.datastore.ensureGet(interaction.user);
        const profileLocale = profile.locale ? await this.bot.localization.stringToLocale(profile.locale) : null;
        const preferedLocale = profileLocale || interaction.locale || interaction.guild?.preferredLocale || Locale.EnglishGB;

        const flag = LocaleToFlag(preferedLocale);
        const name = preferedLocale.valueOf();

        return await interaction.reply({
            content: await this.bot.localization.getLocalizedReply({
                interaction: interaction,
                text: Text.LocaleGetReply,
                isEphemeral: true
            }, name, flag)
        })
    }
}
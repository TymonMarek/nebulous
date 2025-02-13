import { Text } from "../Enums/Text";
import { Language } from "./Language";
import { Interaction, Locale, User } from "discord.js";
import { glob } from "glob";
import Bot from "../Bot";
import path from "path";

export interface ILocalization {
    bot: Bot;
    locales: Map<Locale, Language>;

    LoadLocales(): Promise<void>;
    
    getLocalizedText(locale: Locale, key: Text, ...args: any[]): Promise<string>;
    getPreferedLocale(interaction: Interaction, user: User, isEphemeral: boolean): Promise<Partial<Locale>>;
    getLocalizedReply(options: ILocalizedReplyOptions, ...args: any[]): Promise<string>;
}

export interface ILocalizedReplyOptions {
    interaction: Interaction,
    text: Text,
    isEphemeral: boolean
}

export default class Localization implements ILocalization {
    bot: Bot;
    locales: Map<Locale, Language>;

    constructor(bot: Bot) {
        this.bot = bot;
        this.locales = new Map();
    }

    async LoadLocales() {
        const filePaths = await glob("./out/Locales/**/*.js");
        const trueFilePaths = filePaths.map((filePath) => path.resolve(filePath));

        for (const file of trueFilePaths) {
            const language: Language = new (await import("file://" + file)).default.default(this.bot);

            if (!language.locale) {
                console.warn(`${file} does not have a locale code!`);
                delete require.cache[require.resolve(file)];
                continue;
            }

            if (!language.enabled) {
                delete require.cache[require.resolve(file)];
                continue;
            }

            this.locales.set(language.locale, language);
            delete require.cache[require.resolve(file)];
        }
    }

    async getLocalizedText(locale: Locale, key: Text, ...args: any[]): Promise<string> {
        const defaultLocale = Locale.EnglishGB;
        const language = this.locales.get(locale) || this.locales.get(defaultLocale);

        if (!language) {
            console.warn(`No translation found for locale: ${locale}!`);
            return `${key}`;
        }

        return language.get(key, this.locales.get(defaultLocale)!, ...args);
    }

    async stringToLocale(string: string | null): Promise<Locale | undefined> {
        const normalizedString = string?.replace("-", "_") as Locale;

        if (Object.values(Locale).includes(normalizedString)) {
            return normalizedString;
        }
    }
    
    async getPreferedLocale(interaction: Interaction, user: User, isEphemeral: boolean): Promise<Partial<Locale>> {
        const profile = await this.bot.datastore.ensureGet(user);
        const profileLocale = profile.locale ? await this.stringToLocale(profile.locale) : null;
    
        const userLocale = interaction.locale;
        const guildLocale = interaction.guildLocale || interaction.locale;
        
        if (!isEphemeral) {
            return profileLocale || userLocale || guildLocale;
        }
    
        return guildLocale || profileLocale || userLocale;
    }

    async getLocalizedReply(options: ILocalizedReplyOptions, ...args: any[]): Promise<string> {
        const preferedLocale = await this.getPreferedLocale(options.interaction, options.interaction.user, options.isEphemeral);
        const localizedText = this.getLocalizedText(preferedLocale, options.text, args);

        return localizedText;
    }
}

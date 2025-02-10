import { TranslationTable } from "./TranslationTable";
import { TranslationKey } from "./TranslationKey";
import { Locale } from "discord.js";
import { glob } from "glob";
import Bot from "../Bot";
import path from "path";

export interface ITranslations {
    bot: Bot;
    locales: Map<Locale, TranslationTable>;

    LoadLocales(): Promise<void>;
    get(locale: Locale, key: TranslationKey, ...args: any[]): string;
}

export default class Translation implements ITranslations {
    bot: Bot;
    locales: Map<Locale, TranslationTable>;

    constructor(bot: Bot) {
        this.bot = bot;
        this.locales = new Map();
    }

    async LoadLocales() {
        const filePaths = await glob("./out/Locales/**/*.js");
        const trueFilePaths = filePaths.map((filePath) => path.resolve(filePath));

        for (const file of trueFilePaths) {
            const localeTranslationTable: TranslationTable = new (await import("file://" + file)).default.default(this.bot);

            if (!localeTranslationTable.localeCode) {
                console.warn(`${file} does not have a locale code!`);
                delete require.cache[require.resolve(file)];
                continue;
            }

            if (!localeTranslationTable.enabled) {
                if (localeTranslationTable.languageName != "Template Language") {
                    console.warn(`The locale ${localeTranslationTable.localeCode} is not enabled!`);
                }
                delete require.cache[require.resolve(file)];
                continue;
            }

            this.locales.set(localeTranslationTable.localeCode, localeTranslationTable);
            delete require.cache[require.resolve(file)];
        }
    }

    get(locale: Locale, key: TranslationKey, ...args: any[]): string {
        const defaultLocale = Locale.EnglishGB;

        const translationTable = this.locales.get(locale) || this.locales.get(defaultLocale);

        if (!translationTable) {
            console.warn(`No translation found for locale: ${locale}, falling back to English.`);
            return `${key}`;
        }

        return translationTable.getTranslation(key, this.locales.get(defaultLocale)!, ...args);
    }
}

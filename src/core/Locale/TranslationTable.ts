import { TranslationKey } from "./TranslationKey";
import { Locale } from "discord.js";

export interface ILocaleOptions {
    languageName: string;
    localeCode: Locale;
    enabled?: boolean;

    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;
}

export interface ITranslationTable {
    languageName: string;
    localeCode: Locale;
    enabled: boolean;

    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;

    getTranslation(key: TranslationKey, fallback: TranslationTable): string;
}

export class TranslationTable {
    languageName: string;
    localeCode: Locale;
    enabled: boolean;
    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;

    constructor({ languageName, localeCode, enabled = true, translations }: ILocaleOptions) {
        this.languageName = languageName;
        this.localeCode = localeCode;
        this.enabled = enabled;

        this.translations = translations;
    }

    getTranslation(key: TranslationKey, fallback: TranslationTable, ...args: any[]): string {
        const translation = this.translations[key] ?? fallback.translations[key];

        if (!translation) {
            return key;
        }
        
        return typeof translation === "function" ? translation(...args) : translation; 
    }
}

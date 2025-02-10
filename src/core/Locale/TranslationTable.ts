import { TranslationKey } from "./TranslationKey";
import { Locale } from "discord.js";

/**
 * Represents the options for configuring a locale.
 */
export interface ILocaleOptions {
    /**
     * The display name of the language.
     */
    languageName: string;

    /**
     * The Discord locale code corresponding to this language.
     */
    localeCode: Locale;

    /**
     * Whether this locale is enabled.
     * Defaults to `true` if not specified.
     */
    enabled?: boolean;

    /**
     * A mapping of translation keys to their corresponding translations.
     * Translations can be either a string or a function that generates a string.
     */
    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;
}

/**
 * Represents a table of translations for a specific locale.
 */
export interface ITranslationTable {
    /**
     * The display name of the language.
     */
    languageName: string;

    /**
     * The Discord locale code corresponding to this language.
     */
    localeCode: Locale;

    /**
     * Whether this locale is enabled.
     */
    enabled: boolean;

    /**
     * A mapping of translation keys to their corresponding translations.
     * Translations can be either a string or a function that generates a string.
     */
    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;

    /**
     * Retrieves a translation for the given key.
     * Falls back to another translation table if the key is missing.
     *
     * @param key - The translation key to retrieve.
     * @param fallback - A fallback translation table to use if the key is not found.
     * @returns The translated string.
     */
    get(key: TranslationKey, fallback: TranslationTable): string;
}

/**
 * Implements a translation table for managing localized text.
 */
export class TranslationTable implements ITranslationTable {
    languageName: string;
    localeCode: Locale;
    enabled: boolean;
    translations: Partial<Record<TranslationKey, string | ((...args: any[]) => string)>>;

    /**
     * Creates a new translation table.
     *
     * @param options - The locale options used to configure this table.
     */
    constructor({ languageName, localeCode, enabled = true, translations }: ILocaleOptions) {
        this.languageName = languageName;
        this.localeCode = localeCode;
        this.enabled = enabled;
        this.translations = translations;
    }

    /**
     * Retrieves a translation for the given key.
     * Falls back to another translation table if the key is missing.
     *
     * @param key - The translation key to retrieve.
     * @param fallback - A fallback translation table to use if the key is not found.
     * @param args - Optional arguments for dynamic translations.
     * @returns The translated string.
     */
    get(key: TranslationKey, fallback: TranslationTable, ...args: any[]): string {
        const translation = this.translations[key] ?? fallback.translations[key];

        if (!translation) {
            return key;
        }

        return typeof translation === "function" ? translation(...args) : translation;
    }
}

import { Text } from "../Enums/Text";
import { Locale } from "discord.js";

/**
 * Represents the options for configuring a locale.
 */
export interface ILanguageOptions {
    /**
     * The display name of the language.
     */
    name: string;

    /**
     * The Discord locale code corresponding to this language.
     */
    locale: Locale;

    /**
     * Whether this locale is enabled.
     * Defaults to `true` if not specified.
     */
    enabled?: boolean;

    /**
     * A mapping of translation keys to their corresponding translations.
     * Translations can be either a string or a function that generates a string.
     */
    translations: Partial<Record<Text, string | ((...args: any[]) => string)>>;
}

/**
 * Represents a table of translations for a specific locale.
 */
export interface ILanguage {
    /**
     * The display name of the language.
     */
    name: string;

    /**
     * The Discord locale code corresponding to this language.
     */
    locale: Locale;

    /**
     * Whether this locale is enabled.
     */
    enabled: boolean;

    /**
     * A mapping of translation keys to their corresponding translations.
     * Translations can be either a string or a function that generates a string.
     */
    translations: Partial<Record<Text, string | ((...args: any[]) => string)>>;

    /**
     * Retrieves a translation for the given key.
     * Falls back to another language if the key is missing.
     *
     * @param key - The translation key to retrieve.
     * @param fallback - A fallback language to use if the key is not found.
     * @returns The translated string.
     */
    get(key: Text, fallback: Language): string;
}

/**
 * Implements a language for managing localized text.
 */
export class Language implements ILanguage {
    name: string;
    locale: Locale;
    enabled: boolean;
    translations: Partial<Record<Text, string | ((...args: any[]) => string)>>;

    /**
     * Creates a new translation table.
     *
     * @param options - The options used to configure this language.
     */
    constructor({ name, locale, enabled = true, translations }: ILanguageOptions) {
        this.name = name;
        this.locale = locale;
        this.enabled = enabled;
        this.translations = translations;
    }

    /**
     * Retrieves a translation for the given key.
     * Falls back to another translation table if the key is missing.
     *
     * @param key - The translation key to retrieve.
     * @param fallback - A fallback language to use if the key is not found.
     * @param args - Optional arguments for dynamic translations.
     * @returns The translated string.
     */
    get(key: Text, fallback: Language, ...args: any[]): string {
        const translation = this.translations[key] ?? fallback.translations[key];

        if (!translation) {
            return key;
        }

        return typeof translation === "function" ? translation(...args) : translation;
    }
}

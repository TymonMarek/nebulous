import { TranslationTable } from "../Core/Locale/TranslationTable";
import { TranslationKey } from "../Core/Locale/TranslationKey";
import { Locale } from "discord.js";

/**
 * Template for creating a new locale translation file.
 * Replace `TemplateLocale` with the actual language name (e.g., `FrenchLocale`).
 */
export default class TemplateLocale extends TranslationTable {
    constructor() {
        super({
            /**
             * The full name of the language in English.
             * Example: "Français (France)" for French.
             */
            languageName: "Template Language",

            /**
             * The corresponding Discord.js locale code.
             * Example: Locale.French for French.
             * Full list: https://discord-api-types.dev/api/discord-api-types-v10/enum/Locale
             */
            localeCode: Locale.EnglishGB, // Change this to the correct locale

            /**
             * Determines whether this language is enabled.
             * If set to `false`, it won't be loaded.
             */
            enabled: true,

            /**
             * The translations for this language.
             * Keys should be from the `TranslationKey` enum.
             * Values can be either static strings or functions for dynamic values.
             */
            translations: {
                [TranslationKey.UnknownCommandReply]: "Translation for 'Unknown command!'",

                // Example of a dynamic translation using template strings
                [TranslationKey.PingReply]: (ping: number) => `Pong, ${ping}ms!`,
            },
        });
    }
}

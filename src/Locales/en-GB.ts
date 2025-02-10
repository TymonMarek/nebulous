import { TranslationTable } from "../Core/Locale/TranslationTable";
import { TranslationKey } from "../Core/Locale/TranslationKey";
import { Locale } from "discord.js";

export default class EnglishGB extends TranslationTable {
    constructor() {
        super({
            languageName: "English (United Kingdom)",
            localeCode: Locale.EnglishGB,
            enabled: true,
            
            translations: {
                [TranslationKey.UnknownCommandReply]: "This command does not exist. Please wait a few seconds for Discord to refresh slash commands or restart your Discord client.",
                [TranslationKey.PingReply]: (ping: number) => `Pong! (${ping}ms)`,
            },
        });
    }
}
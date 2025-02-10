import { TranslationTable } from "../Core/Locale/TranslationTable";
import { TranslationKey } from "../Core/Locale/TranslationKey";
import { Locale } from "discord.js";

export default class EnglishGB extends TranslationTable {
    constructor() {
        super({
            languageName: "English (Great Britain)",
            localeCode: Locale.EnglishGB,
            enabled: true,
            
            translations: {
                [TranslationKey.UnknownCommandReply]: "I'm not sure how you got here... This command does not exist!",
                [TranslationKey.PingReply]: (ping: number) => `Pong! (${ping}ms)`,
            },
        });
    }
}
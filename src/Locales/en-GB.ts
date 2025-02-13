import { Language } from "../Core/Locale/Language";
import { Text } from "../Core/Enums/Text";
import { Locale } from "discord.js";

export default class EnglishGB extends Language {
    constructor() {
        super({
            name: "English (United Kingdom)",
            locale: Locale.EnglishGB,
            enabled: true,
            
            translations: {
                [Text.UnknownCommandReply]: "This command does not exist. Please wait a few seconds for Discord to refresh slash commands or restart your Discord client.",
                [Text.PingReply]: (ping: number) => `Pong! (${ping}ms)`,
                [Text.LocaleGetReply]: (locale: string, flag: string) => `Your current locale is ${locale} ${flag}`
            },
        });
    }
}
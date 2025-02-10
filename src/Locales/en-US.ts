import { Language } from "../Core/Locale/Language";
import { Text } from "../Core/Enums/TranslationKey";
import { Locale } from "discord.js";

export default class EnglishUS extends Language {
    constructor() {
        super({
            name: "English (United States)",
            locale: Locale.EnglishUS,
            enabled: true,
            
            translations: {
                [Text.UnknownCommandReply]: "This command does not exist. Please wait a few seconds for Discord to refresh slash commands or restart your Discord client.",
                [Text.PingReply]: (ping: number) => `Pong! (${ping}ms)`,
            },
        });
    }
}
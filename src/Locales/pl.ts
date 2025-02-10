import { TranslationTable } from "../Core/Locale/TranslationTable";
import { TranslationKey } from "../Core/Locale/TranslationKey";
import { Locale } from "discord.js";

export default class Polish extends TranslationTable {
    constructor() {
        super({
            languageName: "Polska",
            localeCode: Locale.Polish,
            enabled: true,

            translations: {
                [TranslationKey.UnknownCommandReply]: "Nie wiem jak to się stało, ale ta funkcja nie istnieje!",
                [TranslationKey.PingReply]: (ping: number) => `Pong, ${ping}ms!`,
            },
        });
    }
}

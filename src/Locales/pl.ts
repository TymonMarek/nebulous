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
                [TranslationKey.UnknownCommandReply]: "To polecenie nie istnieje. Poczekaj kilka sekund, aż Discord odświeży polecenia lub uruchom ponownie klienta Discord.",
                [TranslationKey.PingReply]: (ping: number) => `Pong, ${ping}ms!`,
            },
        });
    }
}

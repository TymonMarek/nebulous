import { Language } from "../Core/Locale/Language";
import { Text } from "../Core/Enums/Text";
import { Locale } from "discord.js";

export default class Polish extends Language {
    constructor() {
        super({
            name: "Polska",
            locale: Locale.Polish,
            enabled: true,

            translations: {
                [Text.UnknownCommandReply]: "To polecenie nie istnieje. Poczekaj kilka sekund, aż Discord odświeży polecenia lub uruchom ponownie klienta Discord.",
                [Text.PingReply]: (ping: number) => `Pong, ${ping}ms!`,
            },
        });
    }
}

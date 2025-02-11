import { Locale } from "discord.js";

export function LocaleToFlag(locale: Locale): string {
    const code = locale.valueOf()

    if (code.length == 2) {
        return `:flag_${code}:` // Looking for locale like "pl" or "br"
    }

    if (code.length == 5) {
        return `:flag_${code.slice(-2).toLowerCase()}` // Looking for locale like "en-US" or "pt-BR"
    }

    return ``
}
import Event from "../core/Event.js";
import { Events } from "discord.js";
import Bot from "../core/Bot.js";

export default class ClientReady extends Event {
    constructor(bot: Bot) {
        super(bot, {
            name: Events.ClientReady,
            description: "Fires when the bot has successfully connected to Discord and logs in.",
            once: true
        })
    }

    OnEvent = async () => {
        console.log(`Successfully logged in as ${this.bot.user?.tag}`)
    }
}
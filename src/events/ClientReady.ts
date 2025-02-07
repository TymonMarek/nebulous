import Event from "../Core/Events/Event.js";
import { Events } from "discord.js";
import Bot from "../Core/Bot.js";

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
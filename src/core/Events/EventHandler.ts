import Event from "./Event";
import { glob } from "glob";
import Bot from "../Bot";
import path from "path";

export interface IEventHandler {
    bot: Bot;

    LoadEvents(): void;
}

export default class EventHandler implements IEventHandler {
    bot: Bot;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    async LoadEvents() {
        const filePaths = await glob("./out/Events/**/*.js");
        const trueFilePaths = filePaths.map(filePath => path.resolve(filePath));
        
        trueFilePaths.forEach(async (file: string) => {
            const event: Event = new(await import("file://" + file)).default.default(this.bot);

            if (!event.name) {
                console.warn(`${file} does not have a name!`);
                
                return delete require.cache[require.resolve(file)];
            }

            if (event.once) {
                this.bot.once(event.name, event.OnEvent);
            } else {
                this.bot.on(event.name, event.OnEvent);
            }

            delete require.cache[require.resolve(file)];
        })
    }
}
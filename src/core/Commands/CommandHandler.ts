import { SubCommand } from "./SubCommand";
import { Command } from "./Command";
import { glob } from "glob";
import Bot from "../Bot";
import path from "path";

export interface ICommandHandler {
    bot: Bot;

    LoadCommands(): void;
}

export default class CommandHandler implements ICommandHandler {
    bot: Bot;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    async LoadCommands() {
        const filePaths = await glob("./out/Commands/**/*.js");
        const trueFilePaths = filePaths.map(filePath => path.resolve(filePath));
        
        trueFilePaths.forEach(async (file: string) => {
            const command: Command | SubCommand = new(await import("file://" + file)).default.default(this.bot);

            if (!command.name) {
                console.warn(`${file} does not have a name!`);
                return delete require.cache[require.resolve(file)];
            }

            if (command instanceof SubCommand) {
                return this.bot.subCommands.set(command.name, command);
            }

            this.bot.commands.set(command.name, command);
            delete require.cache[require.resolve(file)];
        })
    }
}
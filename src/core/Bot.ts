import CommandHandler from "./Commands/CommandHandler";
import Enviroment from "./Configuration/Enviroment";
import { SubCommand } from "./Commands/SubCommand";
import EventHandler from "./Events/EventHandler";
import { Client, Collection } from "discord.js";
import { Command } from "./Commands/Command";

export interface IBot {
    enviroment: Enviroment;
    
    eventHandler: EventHandler; 
    commandHandler: CommandHandler;

    commands: Collection<string, Command>
    subCommands: Collection<string, SubCommand>

    cooldowns: Collection<string, Collection<string, number>>

    LoadHandlers(): void;
}

export default class Bot extends Client implements IBot {
    enviroment: Enviroment;

    eventHandler: EventHandler;
    commandHandler: CommandHandler;

    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        super({intents: []});

        this.enviroment = new Enviroment();

        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new EventHandler(this);

        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();

        this.login(this.enviroment.token);
    }

    Initialize() {
        this.LoadHandlers();
    }

    async LoadHandlers() {
        this.eventHandler.LoadEvents();
        this.commandHandler.LoadCommands();
    }
}
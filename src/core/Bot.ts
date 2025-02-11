import { Client, Collection, Locale } from "discord.js";
import CommandHandler from "./Commands/CommandHandler";
import Environment from "./Configuration/Environment";
import { SubCommand } from "./Commands/SubCommand";
import EventHandler from "./Events/EventHandler";
import Localization from "./Locale/Localization";
import { Language } from "./Locale/Language";
import { Command } from "./Commands/Command";

export interface IBot {
    environment: Environment;
    
    eventHandler: EventHandler; 
    commandHandler: CommandHandler;
    
    commands: Collection<string, Command>
    subCommands: Collection<string, SubCommand>
    
    localization: Localization;    
    cooldowns: Collection<string, Collection<string, number>>

    LoadHandlers(): void;
}

export default class Bot extends Client implements IBot {
    environment: Environment;

    eventHandler: EventHandler;
    commandHandler: CommandHandler;
    
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    
    localization: Localization;

    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        super({intents: []});

        this.environment = new Environment();
                
        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new EventHandler(this);
        
        this.commands = new Collection();
        this.subCommands = new Collection();

        this.localization = new Localization(this);

        this.cooldowns = new Collection();

        this.login(this.environment.token);
    }

    Initialize() {
        this.LoadHandlers();
    }

    async LoadHandlers() {
        this.localization.LoadLocales();
        this.eventHandler.LoadEvents();
        this.commandHandler.LoadCommands();
    }
}
import { Client, Collection, Locale } from "discord.js";
import CommandHandler from "./Commands/CommandHandler";
import Environment from "./Configuration/Environment";
import { SubCommand } from "./Commands/SubCommand";
import EventHandler from "./Events/EventHandler";
import Localization from "./Locale/Localization";
import { Language } from "./Locale/Language";
import { Command } from "./Commands/Command";
import { Datastore } from "./Datastore/Datastore";

export interface IBot {
    environment: Environment;
    datastore: Datastore;
    
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
    datastore: Datastore;

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
        this.datastore = new Datastore(this);

        this.cooldowns = new Collection();

        this.login(this.environment.DISCORD_TOKEN);
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
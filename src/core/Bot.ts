import Enviroment from "./Enviroment.js";
import { Client } from "discord.js";
import Handler from "./Handler.js";

export interface IBot {
    enviroment: Enviroment;
    handler: Handler; 

    LoadHandlers(): void;
}

export default class Bot extends Client implements IBot {
    enviroment: Enviroment;
    handler: Handler;

    constructor() {
        super({intents: []});

        this.enviroment = new Enviroment();
        this.handler = new Handler(this);

        this.login(this.enviroment.token);
    }

    Initialize() {
        this.LoadHandlers();
    }

    async LoadHandlers() {
        this.handler.LoadEvents();
    }
}
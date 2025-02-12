import { config } from "dotenv";

export class MissingEnvironmentVariable extends Error {
    constructor(message?: string) {
        super(message)
    }
}

export interface IEnvironment {
    DISCORD_TOKEN: string;
    DISCORD_CLIENT_ID: string;
}

export default class Environment implements IEnvironment {
    DISCORD_TOKEN: string;
    DISCORD_CLIENT_ID: string;

    constructor() {
        config();

        if (!process.env.DISCORD_TOKEN) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"DISCORD_TOKEN\" enviroment variable!");
        }

        if (!process.env.DISCORD_CLIENT_ID) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"DISCORD_CLIENT_ID\" enviroment variable!");
        }

        this.DISCORD_TOKEN = process.env.DISCORD_TOKEN;
        this.DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    }
}
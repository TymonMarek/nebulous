import { config } from "dotenv";

export class MissingEnvironmentVariable extends Error {
    constructor(message?: string) {
        super(message)
    }
}

export interface IEnvironment {
    token: string;
    clientId: string;

    postgreHost: string;
    postgrePort: number;

    postgreUser: string;
    postgrePassword: string;
    postgreDatabase: string; 
}

export default class Environment implements IEnvironment {
    token: string;
    clientId: string;
    
    postgreHost: string;
    postgrePort: number;

    postgreUser: string;
    postgrePassword: string;
    postgreDatabase: string;

    constructor() {
        config();

        if (!process.env.token) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"token\" enviroment variable!");
        }

        if (!process.env.clientId) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"clientId\" enviroment variable!");
        }

        if (!process.env.postgreHost) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"postgreHost\" enviroment variable!");
        }
        if (!process.env.postgrePort || isNaN(Number(process.env.postgrePort)) || !Number.isInteger(Number(process.env.postgrePort))) {
            throw new MissingEnvironmentVariable("The environment variable \"postgrePort\" must be a valid integer!");
        }        
        
        if (!process.env.postgreUser) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"postgreUser\" enviroment variable!");
        }

        if (!process.env.postgrePassword) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"postgrePassword\" enviroment variable!");
        }

        if (!process.env.postgreDatabase) {
            throw new MissingEnvironmentVariable("This enviroment does not contain a \"postgreDatabase\" enviroment variable!");
        }

        this.token = process.env.token;
        this.clientId = process.env.clientId;

        this.postgreHost = process.env.postgreHost;
        this.postgrePort = Number(process.env.postgrePort);

        this.postgreUser = process.env.postgreUser;
        this.postgrePassword = process.env.postgrePassword;
        this.postgreDatabase = process.env.postgreDatabase;
    }
}
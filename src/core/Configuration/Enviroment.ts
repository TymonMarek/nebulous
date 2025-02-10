import { config } from "dotenv";

export class MissingEnviromentVariable extends Error {
    constructor(message?: string) {
        super(message)
    }
}

export interface IEnviroment {
    token: string;
    clientId: string;
}

export default class Enviroment implements IEnviroment {
    token: string;
    clientId: string;

    constructor() {
        config();

        if (!process.env.token) {
            throw new MissingEnviromentVariable("This enviroment does not contain a \"token\" enviroment variable!");
        }

        if (!process.env.clientId) {
            throw new MissingEnviromentVariable("This enviroment does not contain a \"clientId\" enviroment variable!");
        }

        this.token = process.env.token;
        this.clientId = process.env.clientId;
    }
}
import { config } from "dotenv";

export class MissingEnviromentVariable extends Error {
    constructor(message?: string) {
        super(message)
    }
}

export interface IEnviroment {
    token: string;
}

export default class Enviroment implements IEnviroment {
    token: string;
    
    constructor() {
        config();

        if (!process.env.token) {
            throw new MissingEnviromentVariable("This enviroment does not contain a \"token\" enviroment variable!");
        }

        this.token = process.env.token;
    }
}
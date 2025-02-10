import { Collection, Events, Interaction, REST, Routes } from "discord.js";
import { Command } from "../../Core/Commands/Command";
import Event from "../../Core/Events/Event";
import Bot from "../../Core/Bot";

export interface IJSONCommand {
    name: string;
    description: string;
    options: object;
    default_member_permissions: string;
    dm_permission: boolean;
}

export default class ClientReady extends Event {
    constructor(bot: Bot) {
        super(bot, {
            name: Events.ClientReady,
            description: "Fires when the bot has successfully connected to Discord and logs in.",
            once: true
        })
    }

    OnEvent = async () => {
        console.log(`Logged in as ${this.bot.user?.tag}`)
        const commands: IJSONCommand[] = this.GetJSON(this.bot.commands);

        const rest = new REST()
            .setToken(this.bot.enviroment.token);

        const setCommands = await rest.put(Routes.applicationCommands(this.bot.enviroment.clientId), {
            body: commands
        });

        if (Array.isArray(setCommands)) {
            console.log(`Updated ${setCommands.length} application command(s).`);
        } else {
            console.error("Unexpected response from Discord API:", setCommands);
        }
    }     

    private GetJSON(commands: Collection<string, Command>): Array<IJSONCommand> {
        const data: Array<IJSONCommand> = [];

        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.defaultMemberPermissions.toString(),
                dm_permission: command.enabledInDms
            })
        })

        return data;
    }
}
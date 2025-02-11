import { PrismaClient, Profile } from "@prisma/client";
import { User } from "discord.js";
import Bot from "../Bot";

export interface IDatastore {
    bot: Bot;

    /**
     * Retrieves the profile for a given user from the datastore.
     * @param user The user whose profile should be fetched.
     * @returns The user's profile, or null if no profile exists for that user.
     */
    get(user: User): Promise<Profile | null>;

    /**
     * Saves or updates the given profile in the datastore.
     * @param profile The profile to save.
     * @returns The saved profile, or null if the save operation failed.
     */
    set(user: User, data: Profile): Promise<Profile | null>;

    /**
     * Checks if a profile for a given user exists.
     * @param user The user of the profile.
     * @returns true the profile if it exists, otherwise null.
     */
    exists(user: User): Promise<Profile | null>;

    /**
     * Ensures that a profile exists for the given user. If a profile does not exist, it will be created.
     * @param user The user for whom the profile should be ensured.
     * @returns The profile associated with the user, whether newly created or existing.
     */
    ensureGet(user: User): Promise<Profile>;
}

export class Datastore extends PrismaClient implements IDatastore {
    bot: Bot;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
        this.connectToDatabase()
    }

    private async connectToDatabase() {
        try {
            await this.$connect();
            console.log("Connected to PostgrSQL successfully!");
        } catch (error) {
            console.error("Failed to connect to PostgrSQL:", error);
            process.exit(1);
        }
    }

    async get(user: User): Promise<Profile | null> {
        const profile = await this.profile.findUnique({
            where: {
                discordId: user.id,
            }
        })

        return profile;
    }

    async create(user: User): Promise<Profile> {
        const profile = await this.profile.create({
            data: {
                discordId: user.id,
            }
        })

        return profile;
    }

    async set(user: User, data: Profile): Promise<Profile | null> {
        const updatedProfile = await this.profile.update({
            where: {
                discordId: user.id,
            },
            data: data,
        });

        return updatedProfile;
    }

    async exists(user: User): Promise<Profile | null> {
        const profile = await this.profile.findUnique({
            where: {
                discordId: user.id,
            }
        });

        if (profile) {
            return profile;
        }

        return null;
    }

    async ensureGet(user: User): Promise<Profile> {
        let profile = await this.exists(user);

        if (!profile) {
            profile = await this.create(user)
        }

        return profile;
    }

}
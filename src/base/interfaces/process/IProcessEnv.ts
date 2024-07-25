export default interface IProcessEnv {
	DISCORD_TOKEN: string;
	DATABASE_URI: string;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
	DATABASE_COLLECTION?: string;
}

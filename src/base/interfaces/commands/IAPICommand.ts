export default interface IAPICommand {
	readonly name: string;
	readonly description: string;

	readonly nsfw?: boolean;
	readonly default_member_permission?: string;
	readonly contexts?: number[];

	readonly options: object;
}

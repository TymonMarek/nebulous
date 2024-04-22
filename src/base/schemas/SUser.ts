/**
 * The interface for the user object stored in the bot's database.
 */
export interface SUser {
	/**
	 * The ID of the user.
	 * @type {string}
	 * @required
	 * @unique
	 */
	id: string;
}

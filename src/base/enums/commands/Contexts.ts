/**
 * Enum for the different contexts a command can be executed in.
 * @property Guild (Interaction can be used within servers)
 * @property DM (Interaction can be used within DMs with the app's bot user)
 * @property PM (Interaction can be used within Group DMs and DMs other than the app's bot user)
 * @readonly
 * @enum
 */
export enum Contexts {
	/**
	 * Interaction can be used within servers
	 */
	Guild = 0,

	/**
	 * Interaction can be used within DMs with the app's bot user
	 */
	DirectMessage = 1,

	/**
	 * Interaction can be used within Group DMs and DMs other than the app's bot user
	 */
	PriaveChannel = 2
}

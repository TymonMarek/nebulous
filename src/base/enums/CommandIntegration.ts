/**
 * Enum for Integration of a command
 * @property Guild integration type (App is installable to servers)
 * @property User integration type (App is installable to users)
 * @enum
 */
export enum CommandIntegration {
	/**
	 * Guild integration type (App is installable to servers)
	 */
	Guild = 0,

	/**
	 * User integration type (App is installable to users)
	 */
	User = 1
}

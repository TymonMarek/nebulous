/**
 * Enum for Integration Type
 * @property Guild integration type (App is installable to servers)
 * @property User integration type (App is installable to users)
 * @enum
 */
export enum Integration {
	/**
	 * Guild integration type (App is installable to servers)
	 */
	Guild = 0,

	/**
	 * User integration type (App is installable to users)
	 */
	User = 1
}

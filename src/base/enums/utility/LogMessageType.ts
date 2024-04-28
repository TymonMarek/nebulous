export enum LogMessageType {
	/**
	 * Informational message
	 */
	Info = "INFO",

	/**
	 * Warning message
	 */
	Warn = "WARN",

	/**
	 * Error message
	 */
	Error = "ERROR",

	/**
	 * Debug message (Will only be displayed if the application is started in `--verbose` mode)
	 */
	Debug = "DEBUG"
}

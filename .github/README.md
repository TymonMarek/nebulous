<div align="center">
	<h1>Nebulous</h1>
	<p>A Discord bot made using TypeScript and Discord.JS.</p>
</div>

<div align="center">
  <img alt="The logo of the project" src="https://github.com/TymonMarek/nebulous/assets/117597583/d34826fa-27c2-45f2-b736-838a7f8d594d">
</div>

<h2>
	Introduction
</h2>

<p>
	Discord bots are automated programs that can perform various tasks on Discord servers, such as moderating discussions, providing information, or even playing games.
	This project aims to provide a foundation for developing your own custom Discord bot using modern tools like TypeScript for type safety and Discord.js for interacting with the Discord API.
</p>

<h2>
	Why "nebulous"?
</h2>

<blockquote>
	<p>"There are only two hard things in Computer Science: cache invalidation and <em>naming things.</em>"</p>
</blockquote>

<h2>
	Why TypeScript?
</h2>

<p>
	TypeScript is a superset of JavaScript that adds static typing to the language.
	By using TypeScript, you can catch errors at compile time, write more maintainable code with type annotations, and enjoy features like code navigation and autocompletion in modern code editors.
	This also allows the bot to be very modular, as pretty much everything is a class.
</p>

<h2>
	Why Discord.JS?
</h2>

<p>
	Discord.js is a powerful library for interacting with the Discord API, providing a simple and intuitive interface for building Discord bots in Node.js.
	With Discord.js, you can easily create commands, listen for events, and interact with Discord servers, channels, and users, making it an excellent choice for developing Discord bots.
</p>

<h2>
	Requirements
</h2>

<ul>
	<li><a href="https://nodejs.org/en/download">NodeJS</a> (And <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">NPM</a>, which usually comes with installations of NodeJS.)</li>
	<li><a href="https://git-scm.com/downloads">Git</a></li>
	<li>CMD.exe (<kbd>Win</kbd> + <kbd>R</kbd>, type in <code>cmd</code>, and then press <kbd>Enter</kbd>)</li>
</ul>

<p>
	To check if you have these installed:
</p>

<pre>
	<code>
		node --version &amp;&amp; npm --version &amp;&amp; git --version
	</code>
</pre>

<p>
	If you get any errors, go to the <a href="https://github.com/TymonMarek/nebulous/edit/main/.github/README.md#requirements">requirements</a> section and install the missing software.
</p>

<h2>
	Installation
</h2>

<p>
	First, clone the repository.
</p>

<pre>
	<code>
		git clone https://github.com/TymonMarek/nebulous/
	</code>
</pre>

<p>
	Then, navigate to the project directory.
</p>

<pre>
	<code>
		cd nebulous
	</code>
</pre>

<h2>
	Configuration
</h2>

<p>
	Create a <code>.env</code> file in the root directory of the project and add the following environment variables.
</p>

<pre>
	<code>
		DISCORD_TOKEN=your_discord_bot_token_here
		MONGODB_URL="your-cluster.your-project.mongodb.net"
	</code>
</pre>

<details>
  <summary>How to get a Discord Bot token (5 minutes)</summary>
	<br>
  <p>1. Go to the <a href="https://discord.com/developers/applications">Discord Developer Portal</a>.</p>
  <p>2. Click on "New Application" in the top right corner.</p>
  <p>3. Enter a name for your bot and click "Create".</p>
  <p>4. Go to the "Bot" tab on the left sidebar and click "Add Bot".</p>
  <p>5. Click "Copy" under "Token" to copy your bot's token.</p>
  <p>6. Paste the token into your <code>.env</code> file as <code>DISCORD_TOKEN=your_discord_bot_token_here</code>.</p>
  <p>7. Click "OAuth2" on the left sidebar.</p>	
  <p>8. Under "OAuth2 URL Generator", select "bot" and "applications.commands".</p>
  <p>9. Click "Copy" and paste the URL into your browser.</p>
  <p>10. Select a server to add the bot to and click "Authorize bot".</p>
  <p>11. Complete the CAPTCHA and click "Authorize".</p>
  <p>12. Your bot should now be in the server you selected.</p>

</details>

<details>
  <summary>How to get a MongoDB URL (15 minutes)</summary>
	<br>
  <p>1. Go to the <a href="https://cloud.mongodb.com/">MongoDB Cloud</a>.</p>
  <p>2. Sign in or create an account if you don't have one.</p>
  <p>3. Click on "Create deployment".</p>
  <p>5. Select the free "M0	" cluster tier.</p>
  <p>6. Choose a cloud provider and region.</p>
  <p>7. Click "Create deployment". (By default, only your IP is allowed to access the cluster. [To run the bot on another network, you must add that IP to the "allowed" list](https://www.mongodb.com/docs/atlas/setup-cluster-security/))</p>
  <p>8. Wait for your cluster to spin up.</p>
  <p>9. Select database access on the bottom left.</p>
  <p>10. Click "Add new database user".</p>
  <p>11. Select "certificate" and enter a username.</p>
  <p>12. Tick "Download certificate when user is added".</p>
  <p>13. Select 24 months as the certificate expiration.</p>
  <p>14. Select the "Read and write to any database" built-in role.</p>
  <p>15. Click "Add user".</p>
  <p>16. Copy the certificate you just downloaded</p>
  <p>17. Create a new folder in the root directory of the project called <code>certs</code> and paste the certificate in there. (Make sure to rename it to <code>mongodb.pem</code> !!!)</p>
</details>

<h2>
	Running the bot
</h2>

<p>
	To install the dependencies, run the following command.
</p>

<pre>
	<code>
		npm install
	</code>
</pre>

<p>
	To start the bot, run the following command.
</p>

<pre>
	<code>
		npm run build; npm run start
	</code>
</pre>

<p>
	To stop the bot, press <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal.
</p>


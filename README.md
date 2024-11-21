# ⚠️ **Project Discontinued**

> **⚠️ Important:** This project has been discontinued as of **November 21, 2024**. No further updates or support will be provided.

---

# Nebulous

Nebulous is a powerful and flexible Discord bot built with **TypeScript** and **Discord.js**. It aims to enhance your Discord server experience by providing a range of features, integrations, and customizability.

## Features

- Built with modern JavaScript and TypeScript standards.
- Highly customizable and modular.
- Integrates with various libraries like:
  - **Mongoose** for database management.
  - **dotenv** for secure environment configuration.
  - **Chalk** for styled console output.
- Pre-configured linting and formatting with **ESLint** and **Prettier**.
- Scalable architecture for easy feature additions.

## Getting Started

Follow these steps to set up and run the bot.

### Prerequisites

- **Node.js** (v16.9.0 or later)
- **npm** or **yarn**
- A Discord bot token. [Get one here](https://discord.com/developers/applications).

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/TymonMarek/nebulous.git
   cd nebulous
   ```

3. Install dependencies:
   
   ```
   npm install
   ```

5. Set up your `.env` file:
   Create a `.env` file in the root directory and add your environment variables:

   ```env
   TOKEN=your_discord_bot_token
   MONGO_URI=your_mongodb_connection_string
   ```

7. Build the TypeScript code:
   
   ```bash
   npm run build
   ```

9. Start the bot:
    
   ```bash
   npm start
   ```

### Scripts

- `npm run lint` - Lint the codebase with ESLint.
- `npm run lint:fix` - Fix linting issues.
- `npm run format` - Check formatting with Prettier.
- `npm run format:fix` - Auto-format the code.
- `npm run build` - Compile TypeScript into JavaScript.
- `npm run build:clean` - Clean and rebuild the project.
- `npm start` - Start the bot.
- `npm start:verbose` - Start the bot with verbose logging.

## Project Structure

```bash
nebulous/
├── src/                 # TypeScript source files
├── build/               # Compiled JavaScript files
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests on the [GitHub repository](https://github.com/TymonMarek/nebulous).

### Steps to Contribute

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Links

- **Repository:** [https://github.com/TymonMarek/nebulous](https://github.com/TymonMarek/nebulous)
- **Issues:** [https://github.com/TymonMarek/nebulous/issues](https://github.com/TymonMarek/nebulous/issues)
- **Discord.js Documentation:** [https://discord.js.org](https://discord.js.org)

Happy coding!

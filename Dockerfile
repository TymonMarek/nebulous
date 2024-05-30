# Use the official Node.js image
FROM node:22-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy build artifacts
COPY ./build ./build

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Run the app (use "start:verbose" to see a more detailed output)
CMD ["npm", "run", "start"]

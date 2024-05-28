# Use the official Node.js image
FROM node:22-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose MongoDB port
EXPOSE 27017:27017

# Run the app
CMD ["npm", "start"]

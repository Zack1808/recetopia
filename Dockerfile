# Use Node.js runtime as the base image
FROM node:14

# Set up the wokring directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the React app
RUN npm run Build

# Expose a port for the app to run
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
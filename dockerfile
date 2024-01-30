# Stage 1: Build the Astro project
# Use an official Node runtime as a parent image
FROM node:current-slim AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the project (using Astro build command)
RUN npm run build

# Stage 2: Serve the built project using a Node server like serve
# Use an official Node runtime as a parent image
FROM node:current-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install serve or any other server you prefer
RUN npm install -g serve

# Copy the build directory from the build stage to the current stage
COPY --from=build /usr/src/app/dist ./dist

# Serve the app on port 3000
CMD ["serve", "-s", "dist", "-p", "3000"]

# Inform Docker that the container is listening on port 3000
EXPOSE 3000

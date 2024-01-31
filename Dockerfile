# Build stage
FROM node:current-slim AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Build the project using the Astro build command
RUN npm run build

# Serve stage
FROM node:current-slim AS serve
WORKDIR /usr/src/app

# Copy over the production dependencies from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Copy the build output from the build stage
COPY --from=build /usr/src/app/dist ./dist

# The command to start your app will depend on how your Node server is set up
CMD ["node", "./dist/server/entry.mjs"]

# Inform Docker that the container listens on port 3000
EXPOSE 3000

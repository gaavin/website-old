# Build stage
FROM node:current-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM node:current-slim AS serve
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-p", "3000"]
EXPOSE 3000

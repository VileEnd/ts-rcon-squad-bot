## build runner
FROM node:lts-alpine as build-runner

# Set temp directory
WORKDIR /tmp/app

ENV BOT_TOKEN=MTEyNDM2OTc1MzAyOTQ4NDY0NQ.G8AzIb.sib3CRlxk6npO3s5aN3nHbk9eu5PTlCi9WMmtc

# Move package.json
COPY package.json .

# Install dependencies
RUN npm install

# Move source files
COPY src ./src
COPY tsconfig.json   .

# Build project
RUN npm run build

## production runner
FROM node:lts-alpine as prod-runner

# Set work directory
WORKDIR /app


# Copy package.json from build-runner
COPY --from=build-runner /tmp/app/package.json /app/package.json

# Install dependencies
RUN npm install --omit=dev

# Move build files
COPY --from=build-runner /tmp/app/build /app/build

# Start bot
CMD [ "npm", "run", "start" ]

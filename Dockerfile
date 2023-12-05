ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-buster-slim as base


ARG WAIT_VERSION=2.12.1

RUN <<EOF
set -ex
apt-get update
apt-get upgrade -y
apt-get install -y openssl
apt-get autoremove -y
apt-get clean -y
rm -rf /var/lib/apt/lists/*
npm install -g pm2
npm cache clean --force
EOF

FROM base AS builder

# Create app directory
WORKDIR /usr/src/api

# Install app dependencies
COPY package*.json ./

RUN <<EOF
npm ci --omit=optional
npm cache clean --force
EOF

# Bundle app source
COPY --link . .

## Build for development / staging / production
ARG APP_ENV
RUN echo ">> Current stage: $APP_ENV"
RUN if [ "$APP_ENV" != "local" ] ; then npm run build; else echo 'Nothing to build'; fi

# STEP 2
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/api

RUN apk --no-cache add bash postgresql
RUN apk --no-cache add --virtual builds-deps build-base python

# Add NODE_OPTIONS
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy source from builder
COPY --from=builder /usr/src/api .

RUN npm rebuild bcrypt --build-from-source

RUN chmod +x ./wait-for-postgres.sh

EXPOSE 4000

CMD npm run prisma:generate && npm run build && npm run prod

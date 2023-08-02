FROM node:16-alpine

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

# Checking env values
RUN echo "POSTGRES_USER = $POSTGRES_USER"
RUN echo "POSTGRES_PASSWORD = $POSTGRES_PASSWORD"
RUN echo "POSTGRES_DB = $POSTGRES_DB"

# Copy the code excluding file and folders in .dockerignore (node_modules, dist)
COPY . /usr/src

WORKDIR /usr/src/app

# Sets up database connection string in the environment
COPY ./app/.env.template /usr/src/app/.env

RUN sed -i "s|POSTGRES_USER|$POSTGRES_USER|g" ./.env
RUN sed -i "s|POSTGRES_PASSWORD|$POSTGRES_PASSWORD|g" ./.env
RUN sed -i "s|POSTGRES_DB|$POSTGRES_DB|g" ./.env

# Install npm packages
RUN npm install

# Runs all the Prisma migration scripts
# RUN npm run prisma migrate deploy

# Build the application
RUN npm run build

# run server
EXPOSE 3000

# CMD export PORT=3000 && node main
CMD export PORT=3000 && npm run start:prod
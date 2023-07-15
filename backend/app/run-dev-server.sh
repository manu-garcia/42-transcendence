#!/bin/sh

export PORT=3000

# Initializes Prisma client for development purposes
echo "npx prisma generate ..."
npx prisma generate

# Applies all the already existing migration scripts
echo "npx prisma migrate reset ..."
npx prisma migrate reset --force

echo "npx prisma migrate dev..."
npx prisma migrate dev

# Inserts all the necesary data into DB tables
npx prisma db seed

# RUN npm run prisma generate
npm run start:debug

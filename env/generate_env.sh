#!/bin/sh

# Generate secure random passwords
POSTGRES_PASSWORD=$(openssl rand -base64 20)

# Duplicate the template file
cp .env.template .env

echo "POSTGRES_PASSWORD_SECRET = $POSTGRES_PASSWORD"

# Replace the marker with the generated password in the .env file
sed -i '' "s;POSTGRES_PASSWORD_SECRET;$POSTGRES_PASSWORD;g" .env

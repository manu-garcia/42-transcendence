#!/bin/sh

# Generate secure random passwords
POSTGRES_PASSWORD=$(openssl rand -base64 20)
PGADMIN_DEFAULT_PASSWORD=$(openssl rand -base64 20)

# Duplicate the template file
cp .env.template .env

echo "POSTGRES_PASSWORD_SECRET = $POSTGRES_PASSWORD"
echo "PGADMIN_DEFAULT_PASSWORD_SECRET = $PGADMIN_DEFAULT_PASSWORD"

# Replace the marker with the generated password in the .env file
sed -i '' "s;POSTGRES_PASSWORD_SECRET;$POSTGRES_PASSWORD;g" .env
sed -i '' "s;PGADMIN_DEFAULT_PASSWORD_SECRET;$PGADMIN_DEFAULT_PASSWORD;g" .env

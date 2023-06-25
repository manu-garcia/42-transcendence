# Use the official PostgreSQL image as the base image
FROM postgres:13.3

# Makes this env variables available in the container
ARG POSTGRES_PASSWORD
ARG POSTGRES_USER
ARG POSTGRES_DB

# Checking env values
RUN echo "POSTGRES_PASSWORD = $POSTGRES_PASSWORD"
RUN echo "POSTGRES_USER = $POSTGRES_USER"
RUN echo "POSTGRES_DB = $POSTGRES_DB"

# Copy initialization scripts
COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

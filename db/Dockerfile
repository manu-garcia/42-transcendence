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

# Makes this env variables available in the container
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_DB=$POSTGRES_DB

ENV POSTGRES_INITDB_ARGS --encoding=UTF-8 --lc-collate=C --lc-ctype=C

# Copy initialization scripts
# COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

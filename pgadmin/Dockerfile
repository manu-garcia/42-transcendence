# Base image
FROM dpage/pgadmin4

# Makes this env variables available in the container
ARG POSTGRES_PASSWORD
ARG POSTGRES_USER
ARG POSTGRES_DB
ARG PGADMIN_DEFAULT_EMAIL
ARG PGADMIN_DEFAULT_PASSWORD

# Checking env values
RUN echo "POSTGRES_PASSWORD = $POSTGRES_PASSWORD"
RUN echo "POSTGRES_USER = $POSTGRES_USER"
RUN echo "POSTGRES_DB = $POSTGRES_DB"
RUN echo "PGADMIN_DEFAULT_EMAIL = $PGADMIN_DEFAULT_EMAIL"
RUN echo "PGADMIN_DEFAULT_PASSWORD = $PGADMIN_DEFAULT_PASSWORD"

# Makes this env variables available in the container
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_DB=$POSTGRES_DB
ENV PGADMIN_DEFAULT_EMAIL=$PGADMIN_DEFAULT_EMAIL
ENV PGADMIN_DEFAULT_PASSWORD=$PGADMIN_DEFAULT_PASSWORD

# pgadmin setup
ENV PGADMIN_DEFAULT_EMAIL=$PGADMIN_DEFAULT_EMAIL
ENV PGADMIN_DEFAULT_PASSWORD=$PGADMIN_DEFAULT_PASSWORD

# Currently docker build user is pgadmin, and we need it to be root in
# order for sed to be able to create temporary files in /pgadmin4
USER root

# Sets up database server in pgadmin
COPY --chown=pgadmin:root ./servers.json .

# At the time of replacing, sed is creating temp files in current direcory
RUN sed -i "s|POSTGRES_USER|$POSTGRES_USER|g" ./servers.json
RUN sed -i "s|POSTGRES_PASSWORD|$POSTGRES_PASSWORD|g" ./servers.json
RUN sed -i "s|POSTGRES_DB|postgres|g" ./servers.json

# pgadmin server should run with this user
USER pgadmin

# Expose the pgAdmin port
EXPOSE 80

# Start the pgAdmin server
CMD ["/usr/local/bin/docker-entrypoint.sh"]

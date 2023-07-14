# 42-transcendence

### Create the hosts entries
Edit /etc/hosts and add:

```sh
127.0.0.1 transcendence.42.fr
127.0.0.1 www.transcendence.42.fr
```

### Build the application

```sh
make
```

Or:

```sh
make up
```

### Tear application down

```sh
make down
```

### Fully clean the build pipeline

```sh
make fclean
```

### Open a browser at:

https://transcendence.42.fr/

### Considerations developing locally 

## To investigate how to improve workflow while developing with docker

When working with a multi-service application in Docker Compose during development, there are several approaches you can take to improve your workflow and make it less tedious. Here are a few suggestions:

Utilize Docker Compose profiles: Docker Compose profiles allow you to define different sets of services for different development scenarios. For example, you can create a profile that excludes the production-ready services like Nginx and Postgres and includes only the services relevant for local development. This way, you can spin up a smaller set of services tailored to your current development needs.

Leverage Docker Compose override files: Docker Compose supports the use of override files (docker-compose.override.yml) that can override or extend the services defined in your base docker-compose.yml file. This allows you to keep a base configuration for your entire application and define overrides specific to your development environment. For example, you can override the command to start the Angular frontend container with a command that enables hot-reloading during development.

Mount local volumes for code and configuration: Rather than copying your code into the container every time you make changes, you can mount local volumes into your containers. This enables live-reloading, allowing you to see the changes you make to your code immediately without rebuilding the container. You can mount volumes for both the frontend and backend services, ensuring that any code changes you make are reflected in the running containers.

Utilize development-specific Docker images: During development, you can use Docker images that are optimized for development workflows. For example, you can use an image that includes tools like nodemon or webpack-dev-server, which enable automatic restarts or live-reloading. These images can enhance your development experience by reducing the need to manually rebuild and restart containers for every code change.

Automate development tasks with scripts: Create scripts that automate common development tasks, such as spinning up the development environment, running tests, or resetting the database. These scripts can encapsulate the necessary Docker Compose commands and any additional steps required to set up the development environment.

By implementing these strategies, you can streamline your development workflow and make it more efficient when working with a multi-service application in Docker Compose.

## Install nodejs 16

## Install Angular CLI
From: https://angular.io/cli

```sh
npm install -g @angular/cli
```

## Install NestJS CLI

https://docs.nestjs.com/

```sh
npm install -g @nestjs/cli
```


# Developing the application

Run the make task to build up the application in development mode.

```sh
make updev
```

## Developing the backend

# Working with prisma

Prisma developer advocate tutorial:
https://www.youtube.com/watch?v=LMjj1_EK4y8

1. SH/BASH into your 'backend' container to run npm commands

```sh
docker run --rm -it --entrypoint sh container-id
```

2. Prisma CLI should be already installed. Test it with:

```sh
npx prisma
```

3. Add a model/entity with prisma. Edit the prima schema at:

backend/app/prisma/schema.prisma

by adding a user for instance:

```Typescript
model User {
    id      Int @id @default(autoincrement())
    name    String
}
```

4. Create a migration so that prisma creates the table in the DB. Migrations will be created in the backend/app/prisma/migrations/ folder.

```sh
npx prisma migrate dev --name "Adds User entity"
```

At this point a new table User should have been created in the database.

5. Seeding the database
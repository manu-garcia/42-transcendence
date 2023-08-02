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

https://www.prisma.io/docs/guides/migrate/seed-database#how-to-seed-your-database-in-prisma

This es just an example, code needs to be simplified. But for the sake of showing how it works, create a new file in:

backend/app/prisma/seed.ts

with this content in it:

```Typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// define the main seeding function
async function main() {

    // This is adding a Test user to the table User as an example
    // If the script does get ran multiple TimeRanges, upsert usage will 
    // avoid data duplicatio
    const user1 = await prisma.user.upsert({
        // properties in the where clause must be @unique prisma model properties
        where: { id: 1 },
        update: {},
        create: {
            name: 'User test 1',
        },
    });

    // Prints the just-added user for demostration purposes only. Remove
    console.log(user1);
}

// Run the main seeding function
main()
    // if catch errors
    .catch((e) => {
        console.error(e);
        process.exit();
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```

This script will create a new user in the table User. If the script gets ran multiple times, upsert will guarantee no duplicates.

Now we can run the script:

```sh
npx prisma db seed
```

At this moment there should be a record for 'User test 1' in the User table.

6. Add a NestJS module for user related endpoints

To create a new module in NestJS related to user endpoints and retrieve a list of users using the existing Prisma client, you can follow these steps:

You can find nest CLI info by running:

   ```
   $ npx nest
   ```

6.1. Generate a new module using the NestJS CLI:
   ```
   $ npx nest generate module users
   ```

   A module is a logic unit of grouped functionality around users, in this case. All related code to user should be here.

6.2. Inside the generated `users` module folder, create a new controller using the NestJS CLI:
   ```
   $ npx nest generate controller users
   ```

   A controller is grouping a set of related enpoints. All endpoints related to users should be here.

6.3. In the generated `users.controller.ts` file, import the necessary dependencies:
   ```typescript
   import { Controller, Get } from '@nestjs/common';
   import { PrismaClient } from '@prisma/client';
   ```

6.4. Inject the `PrismaClient` into the controller's constructor:
   ```typescript
   constructor(private readonly prismaClient: PrismaClient) {}
   ```

6.5. Define a GET endpoint for retrieving a list of users:
   ```typescript
   @Get()
   async getUsers() {
     return this.prismaClient.user.findMany();
   }
   ```

6.6. Change the endpoint URL the controller will handle. In this case '/api/users'
   ```typescript
    @Controller('api/users')
   ```

6.7. Update the module's `providers` array in the `users.module.ts` file to include the `PrismaClient`:
   ```typescript
   import { Module } from '@nestjs/common';

   import { PrismaClient } from '@prisma/client';

   import { UsersController } from './users.controller';

   @Module({
     controllers: [UsersController],
     providers: [PrismaClient], // Add the PrismaClient to the providers
   })
   export class UsersModule {}
   ```

6.8 Test it in development browsing this URL http://localhost:3000/api/users
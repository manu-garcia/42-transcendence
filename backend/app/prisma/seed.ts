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

import { DBClient } from './db-client';

const dbClient = new DBClient();

// define the main seeding function
async function createDBInitialData() {

    // Example on how to add multiple users
    await dbClient.addUser(1, { name: 'User test 1' });
    await dbClient.addUser(2, { name: 'User test 2' });
}

// Run the main seeding function
createDBInitialData()
    // if catch errors
    .catch((e) => {
        console.error(e);
        process.exit();
    })
    .finally(async () => {
        await dbClient.disconnect();
    });
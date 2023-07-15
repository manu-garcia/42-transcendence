import { Prisma, PrismaClient } from '@prisma/client';

export class DBClient {

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Member properties ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    private prisma;

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////// Constructor //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    constructor () {
        this.prisma = new PrismaClient();
    }

    ///////////////////////////////////////////////////////////////////////////
    ////////////////////////// Public functions ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    public async disconnect() {
        await this.prisma.$disconnect();
    }

    /**
     * 
     * @param id: user ID
     * @param user: Note that Prisma.UserCreateInput is an automatically generated
     *  type defined by prisma at the time of generating the new DB Schema.
     * 
     * For more information on that, check the docs:
     * 
     * https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety#what-are-generated-types
     * 
     * They get by default generated in:
     * 
     * node_modules/.prisma/client/index.d.ts
     * 
     */
    public async addUser(id: number, user: Prisma.UserCreateInput) {
        // This is adding a Test user to the table User as an example
        // If the script does get ran multiple TimeRanges, upsert usage will 
        // avoid data duplicatio
        const user1 = await this.prisma.user.upsert({
            // properties in the where clause must be @unique prisma model properties
            where: { id },
            update: {},
            create: user,
        });

        // Prints the just-added user for demostration purposes only. Remove
        console.log(user1);
    }

    ///////////////////////////////////////////////////////////////////////////
    ////////////////////////// Private functions //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedPermissions() {
    // console.log('Seed Permission Seed ', seedPermissions)

    await prisma.permission.upsert({
        where: {
            key: "ngo-read"
        },
        update: {},
        create: {
            module: "ngo",
            name: "read",
            key: "ngo-read"
        },

    });


    await prisma.permission.upsert({
        where: {
            key: "ngo-update"
        },
        update: {},
        create: {
            module: "ngo",
            name: "update",
            key: "ngo-update"
        },

    });

    await prisma.permission.upsert({
        where: {
            key: "ngo-delete"
        },
        update: {},
        create: {
            module: "ngo",
            name: "delete",
            key: "ngo-delete"
        },

    });

    console.log("Permission seeded executed :");
}
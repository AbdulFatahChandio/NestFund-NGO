import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPermissions() {
    // console.log('Seed Permission Seed ', seedPermissions)
    const permissions = [
        {
            module: "ngo",
            name: "read",
            key: "ngo-read"
        },
        {
            module: "ngo",
            name: "update",
            key: "ngo-update"
        },
        {
            module: "ngo",
            name: "delete",
            key: "ngo-delete"
        }
    ]
    console.log('permission', permissions)
    for (const Perm of permissions) {
        await prisma.permission.upsert({
            where: {
                key: Perm.key
            },
            update: {},
            create: Perm
        });
    }
    console.log("Permission seeded executed :");
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPermissions() {
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
        },
        {
            module: "campaign",
            name: "create",
            key: "campaign-create"
        },
        {
            module: "campaign",
            name: "read",
            key: "campaign-read"
        },
        {
            module: "campaign",
            name: "update",
            key: "campaign-update"
        },
        {
            module: "campaign",
            name: "delete",
            key: "campaign-delete"
        },
        {
            module: "permission",
            name: "delete",
            key: "delete-permission"
        },
        {
            module: "donation",
            name: "read",
            key: "read-donation"
        },
        {
            module: "donation",
            name: "create",
            key: "create-donation"
        },
        {
            module: "donation",
            name: "update",
            key: "update-donation"
        },
        {
            module: "donation",
            name: "delete",
            key: "delete-donation"
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

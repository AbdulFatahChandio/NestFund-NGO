import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRolePermission() {
    await prisma.rolePermission.create({
        data: {
            roleId: 1,
            permissionId: 1
        }
    })

    await prisma.rolePermission.create({
        data: {
            roleId: 1,
            permissionId: 2
        }
    })

    await prisma.rolePermission.create({
        data: {
            roleId: 1,
            permissionId: 3
        }
    })

    console.log("Role Permission seeded executed :");
}
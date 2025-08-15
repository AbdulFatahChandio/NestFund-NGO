import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRolePermission() {
    await prisma.rolePermission.upsert({
        where: {
            roleId_permissionId: { 
                roleId: 1,
                permissionId: 1
            }
        },
        update: {}, 
        create: {
            roleId: 1,
            permissionId: 1
        }
    });

    await prisma.rolePermission.upsert({
        where: {
            roleId_permissionId: { 
                roleId: 1,
                permissionId: 2
            }
        },
        update: {}, 
        create: {
            roleId: 1,
            permissionId: 2
        }
    });


    await prisma.rolePermission.upsert({
        where: {
            roleId_permissionId: { 
                roleId: 1,
                permissionId: 3
            }
        },
        update: {}, 
        create: {
            roleId: 1,
            permissionId: 3
        }
    });


    console.log("Role Permission seeded executed :");
}
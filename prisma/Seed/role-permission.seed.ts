import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRolePermission() {
    const rolePerm = [
        {
            roleId: 1,
            permissionId: [1, 2, 3],
        },
        {
            roleId: 2,
            permissionId: [1, 3],
        },
    ];

    for (const roleP of rolePerm) {
        for (const perm of roleP.permissionId) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: roleP.roleId,
                        permissionId: perm,
                    },
                },
                update: {}, // nothing to update if it exists
                create: {
                    roleId: roleP.roleId,
                    permissionId: perm,
                },
            });
        }
    }
}


    // await prisma.rolePermission.upsert({
    //     where: {
    //         roleId_permissionId: { 
    //             roleId: 1,
    //             permissionId: 1
    //         }
    //     },
    //     update: {}, 
    //     create: {
    //         roleId: 1,
    //         permissionId: 1
    //     }
    // });

    // await prisma.rolePermission.upsert({
    //     where: {
    //         roleId_permissionId: { 
    //             roleId: 1,
    //             permissionId: 2
    //         }
    //     },
    //     update: {}, 
    //     create: {
    //         roleId: 1,
    //         permissionId: 2
    //     }
    // });

    // await prisma.rolePermission.upsert({
    //     where: {
    //         roleId_permissionId: { 
    //             roleId: 1,
    //             permissionId: 3
    //         }
    //     },
    //     update: {}, 
    //     create: {
    //         roleId: 1,
    //         permissionId: 3
    //     }
    // });


    // console.log("Role Permission seeded executed :");

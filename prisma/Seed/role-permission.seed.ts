import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRolePermission() {
    const rolePerm = [
        {
            roleId: 1,
            permissionId: [1, 2, 3, 5, 6, 7,8,10,12,13],
        },
        {
            roleId: 2,
            permissionId: [1, 5,10,11],
        },
        {
            roleId: 3,
            permissionId: [4, 5, 7,10,12,13]

        }
    ];
    console.log('rolePerm', rolePerm)

    for (const roleP of rolePerm) {
        for (const perm of roleP.permissionId) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: roleP.roleId,
                        permissionId: perm,
                    },
                },
                update: {},
                create: {
                    roleId: roleP.roleId,
                    permissionId: perm,
                },
            });
        }
    }
    console.log("Role Permission seeded executed :")
}
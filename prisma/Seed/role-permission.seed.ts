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
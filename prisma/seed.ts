import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const role = await prisma.role.upsert({
        where: { name: "admin" },
        update: {},
        create: {
            name: "admin"
        }
    });
    console.log("Role:", role);
    
    const hashedPassword = await bcrypt.hash('Ad123456@7890', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin123@gmail.com' },
        update: {},
        create: {
            email: 'admin123@gmail.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'Fatah',
            userName: 'admin',
            roleId: role.id
        }
    });

    console.log("Admin user:", admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

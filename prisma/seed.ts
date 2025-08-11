import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('Ad123456@7890', 10);
    const admin = await prisma.user.upsert({
        where: {
            email: 'admin123@gmail.com'
        },
        update: {},
        create: {
            email: 'admin123@gmail.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'Fatah',
            userName: 'admin',
            roleId: 1
        }
    })
    console.log(admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
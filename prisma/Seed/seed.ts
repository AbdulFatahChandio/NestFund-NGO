import { seedRoles } from "./role.seed";
import { seedUsers } from "./user.seed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedRoles(); 
  await seedUsers(); 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


import { PrismaClient } from "@prisma/client";
import { seedRoles } from "./role.seed";
import { seedPermissions } from "./permission.seed";
import { seedRolePermission } from "./role-permission.seed";
import { seedUsers } from "./user.seed";


const prisma = new PrismaClient();

async function main() {

  
  await seedPermissions();
  await seedRoles();
  await seedRolePermission();
  await seedUsers();
 

  console.log("All seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

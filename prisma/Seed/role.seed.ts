import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
  
  await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" }
  });

  await prisma.role.upsert({
    where: { name: "donor" },
    update: {},
    create: { name: "donor" }
  });

   await prisma.role.upsert({
    where: { name: "NGO" },
    update: {},
    create: { name: "NGO" }
  });

  console.log("Roles seeded executed :");
}

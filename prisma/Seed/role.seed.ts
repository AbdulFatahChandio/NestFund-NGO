import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = ["admin", "donor", "NGO"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
  }

  console.log("Roles seeded successfully");
}


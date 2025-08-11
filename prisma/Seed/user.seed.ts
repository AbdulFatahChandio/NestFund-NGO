import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedUsers() {
  const adminRole = await prisma.role.findUnique({
    where: { name: "admin" }
  });

  if (!adminRole) {
    throw new Error("Admin role not found! Run role seed first.");
  }

  const hashedPassword = await bcrypt.hash("Ad123456@7890", 10);

  const seededUser = await prisma.user.upsert({
    where: { email: "admin123@gmail.com" },
    update: {},
    create: {
      email: "admin123@gmail.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "Fatah",
      userName: "admin",
      roleId: adminRole.id
    }
  });

  console.log("Users seeded", seededUser);
}

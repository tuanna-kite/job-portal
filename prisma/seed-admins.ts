import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import type { Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const saltRounds = 10;

const adminData: Prisma.AdminCreateInput[] = [
  {
    email: "admin@gmail.com",
    fullName: "Super Admin",
    role: "super_admin",
    password: bcrypt.hashSync("admin1234", saltRounds),
  },
  {
    email: "staff@gmail.com",
    fullName: "Staff",
    password: bcrypt.hashSync("staff1234", saltRounds),
  },
];

export async function main() {
  for (const u of adminData) {
    await prisma.admin.upsert({
      where: { email: u.email },
      update: {
        fullName: u.fullName,
        password: u.password,
        role: u.role,
      },
      create: u,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

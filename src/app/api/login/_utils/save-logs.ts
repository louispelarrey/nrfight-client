import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function saveLogs(email: string, plainPassword: string): Promise<void> {

  const hashedPassword = await hashPassword(plainPassword);

  prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}
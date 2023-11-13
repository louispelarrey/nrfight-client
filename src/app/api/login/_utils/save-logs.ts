import prisma from "@/lib/prisma";
import { encryptPassword } from "./encrypt-password";

export default async function saveLogs(
  email: string,
  plainPassword: string
): Promise<void> {
  const hashedPassword = await encryptPassword(plainPassword);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });
}



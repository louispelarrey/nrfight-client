import { decryptPassword } from "../../../login/_utils/encrypt-password";
import sportigoLogin from "../../../login/_utils/sportigo-login";
import { reserveCourses } from "../../../reservation/_utils/reserve-courses";
import prisma from "@/lib/prisma";

export default async function cronTaskReserve() {
  const users = await prisma.user.findMany({
    include: {
      reservedCourses: true,
      excludedDates: true,
    },
  });

  const dataPromises = users.map(async (user) => {
    const decryptedPassword = await decryptPassword(user.password);
    const sportigoUser = sportigoLogin(user.email, decryptedPassword);
    const token = (await sportigoUser).member.appToken;
  
    const reservedCourses = reserveCourses(
      user.excludedDates,
      user.reservedCourses,
      token
    );
  
    return {
      email: user.email,
      nbReservedCourses: (await reservedCourses).length,
    };
  });
  
  return await Promise.all(dataPromises);
}
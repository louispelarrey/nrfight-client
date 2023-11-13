import { decryptPassword } from "../../login/_utils/encrypt-password";
import sportigoLogin from "../../login/_utils/sportigo-login";
import { reserveCourses } from "../../reservation/_utils/reserve-courses";
import prisma from "@/lib/prisma";

type Data = {
  email: string;
  nbReservedCourses: number;
}[]

export async function GET(): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservedCourses: true,
        excludedDates: true,
      },
    });

    let data: Data = [];
    for (const user of users) {
      const decryptedPassword = await decryptPassword(user.password);
      const sportigoUser = await sportigoLogin(user.email, decryptedPassword);
      const token = sportigoUser.member.appToken;

      const reservedCourses = await reserveCourses(
        user.excludedDates,
        user.reservedCourses,
        token
      );
      data.push({ email: user.email, nbReservedCourses: reservedCourses.length });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("API ERROR /cron/reserve", error);

    return new Response("error" + error, { status: 500 });
  }
}

import { decryptPassword } from "../../login/_utils/encrypt-password";
import sportigoLogin from "../../login/_utils/sportigo-login";
import { reserveCourses } from "../../reservation/_utils/reserve-courses";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservedCourses: true,
        excludedDates: true,
      },
    });

    const dataPromises = users.map(async (user) => {
      const decryptedPassword = await decryptPassword(user.password);
      
      const sportigoUser = await sportigoLogin(user.email, decryptedPassword);
      const token = sportigoUser.member.appToken;
      const sportigoUserId = sportigoUser.member.id;

      const nbReservedCourses = await reserveCourses({
        token,
        sportigoUserId: String(sportigoUserId),
        excludedDates: user.excludedDates,
        reservedCourses: user.reservedCourses,
        email: user.email
      });

      return {
        email: user.email,
        nbReservedCourses,
      };
    });

    const data = await Promise.all(dataPromises);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        //disable vercel cache
        "Surrogate-Control": "no-store",
        cache: "no-cache",
      },
    });
  } catch (error) {
    console.log("API ERROR /cron/reserve", error);

    return new Response("error" + error, { status: 500 });
  }
}

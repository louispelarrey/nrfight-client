import { decryptPassword } from "../../login/_utils/encrypt-password";
import sportigoLogin from "../../login/_utils/sportigo-login";
import { reserveCourses } from "../../reservation/_utils/reserve-courses";
import prisma from "@/lib/prisma";

type Data = {
  email: string;
  nbReservedCourses: number;
}[];

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const users = await prisma.user.findMany({
          include: {
            reservedCourses: true,
            excludedDates: true,
          },
        });

        for (const user of users) {
          const decryptedPassword = await decryptPassword(user.password);
          const sportigoUser = await sportigoLogin(user.email, decryptedPassword);
          const token = sportigoUser.member.appToken;

          const reservedCourses = await reserveCourses(
            user.excludedDates,
            user.reservedCourses,
            token
          );

          const data: Data = [{
            email: user.email,
            nbReservedCourses: reservedCourses.length,
          }];

          controller.enqueue(new TextEncoder().encode(JSON.stringify(data)));
        }

        controller.close();
      } catch (error) {
        console.error("API ERROR /cron/reserve", error);
        controller.error("Error: " + error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      //disable vercel cache
      "Surrogate-Control": "no-store",
      cache: "no-cache",
    },
  });
}

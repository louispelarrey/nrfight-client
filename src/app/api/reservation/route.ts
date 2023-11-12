import prisma from "@/lib/prisma";
import getUserByToken from "../member/_get-user/get-user-by-token";
import { DateRange, IReservedCourse, reserveCourses } from "./_utils/reserve-courses";

interface IRequestBody {
  excludedDates: Array<DateRange>;
  reservedCourses: Array<IReservedCourse>;
  token: string;
}

// http://localhost:3000/api/reservation?token=7cc1086f46437f738c254c3632e1b9bf4bce26f4=
export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if(!token) throw new Error('Token not found');

    const sportigoUser = await getUserByToken(token);

    if (!sportigoUser) {
      throw new Error('User not found');
    }

    const userEmail = sportigoUser.member.email;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        reservedCourses: {
          select: {
            sportigoId: true,
          },
        },
        excludedDates: {
          select: {
            from: true,
            to: true,
          },
        }
      },
    });

    if (!user) {
      throw new Error('User not found in database');
    }

    return new Response(
      JSON.stringify({
        reservedCourses: user.reservedCourses,
        excludedDates: user.excludedDates,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { excludedDates, reservedCourses, token }: IRequestBody =
      await request.json();

    const settledPromises = await reserveCourses(
      excludedDates,
      reservedCourses,
      token
    );

    for (const settledPromise of settledPromises) {
      if (settledPromise.status === "rejected") {
        throw settledPromise.reason;
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}


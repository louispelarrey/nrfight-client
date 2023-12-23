import prisma from "@/lib/prisma";
import getUserByToken from "../member/_get-user/get-user-by-token";
import {
  reserveCourses,
} from "./_utils/reserve-courses";
import { ReservedCoursesPerSportigoRoom } from "@/providers/filter-provider";
import { SportigoRoom } from "@/enums/sportigo-room";
import { DateRange, IReservedCourse } from "./_utils/save-reservation/save-reservation-to-db";

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
    if (!token) throw new Error("Token not found");

    const sportigoUser = await getUserByToken(token);

    if (!sportigoUser) {
      throw new Error("User not found");
    }

    const userEmail = sportigoUser.member.email;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        reservedCourses: {
          select: {
            sportigoId: true,
            room: true,
            dayNumber: true,
            hour: true,
          },
        },
        excludedDates: {
          select: {
            from: true,
            to: true,
          },
          where: {
            to: {
              gte: new Date(),
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    const transformedReservedCourses: ReservedCoursesPerSportigoRoom = {
      [SportigoRoom.REPUBLIQUE]: [],
      [SportigoRoom.TOLBIAC]: [],
      [SportigoRoom.OLYMPIADES]: [],
      [SportigoRoom.REPUBLIQUE_COACHING]: [],
    };

    user.reservedCourses.forEach((course) => {
      // Assuming course.room is of type SportigoRoom
      transformedReservedCourses[course.room as SportigoRoom].push({
        sportigoId: course.sportigoId,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + (course.dayNumber - new Date().getDay()),
          Number(course.hour.split(":")[0]),
          Number(course.hour.split(":")[1])
        ).toISOString(),
      });
    });

    return new Response(
      JSON.stringify({
        reservedCourses: transformedReservedCourses,
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

    const sportigoUser = await getUserByToken(token);

    const numberReservedCourses = await reserveCourses({
      token,
      sportigoUserId: String(sportigoUser.member.id),
      excludedDates,
      reservedCourses,
      email: sportigoUser.member.email
    });

    if(numberReservedCourses === 0) {
      throw new Error("No course reserved");
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

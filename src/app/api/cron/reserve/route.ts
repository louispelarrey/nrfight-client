import sportigoLogin from "../../login/_utils/sportigo-login";
import { reserveCourses } from "../../reservation/_utils/reserve-courses";

export async function GET(request: Request): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservedCourses: true,
        excludedDates: true,
      },
    });

    let data: unknown = [];
    for(const user of users) {
      const {email, password} = user;
      const sportigoUser = await sportigoLogin(email, password);
      const token = sportigoUser.member.appToken

      data = await reserveCourses(token, user.reservedCourses, user.excludedDates);
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}
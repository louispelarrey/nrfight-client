import prisma from "@/lib/prisma";
import getUserByToken from "../member/_get-user/get-user-by-token";

interface DateRange {
  from: string;
  to: string;
}

interface IReservedCourse {
  id: number;
  dayNumber: number;
  hour: string;
}

interface IRequestBody {
  excludedDates: Array<DateRange>;
  reservedCourses: Array<IReservedCourse>;
  token: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { excludedDates, reservedCourses, token }: IRequestBody =
      await request.json();


    const promises = [];

    promises.push(saveReservationToDb(token, reservedCourses, excludedDates));
    for (const reservedCourse of reservedCourses) {
      const reservedDays = getAllReservedDaysPerDayNumber(
        reservedCourse.dayNumber,
        excludedDates
      );
      for (const reservedDay of reservedDays) {
        promises.push(reserveDate(token, reservedCourse, reservedDay));
      }
    }

    const settledPromises = await Promise.allSettled(promises);

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

async function saveReservationToDb(
  token: string,
  reservedCourses: Array<IReservedCourse>,
  excludedDates: Array<DateRange>
): Promise<void> {
  const sportigoUser = await getUserByToken(token);
  const userEmail = sportigoUser.member.email;

  if (!sportigoUser) {
    throw new Error('User not found');
  }

  let upsertQuery = {
    reservedCourses: {
      create: reservedCourses.map((course) => ({
        dayNumber: course.dayNumber,
        hour: course.hour,
        // Add other relevant fields here
      })),
    },
  };

  const validExcludedDates = excludedDates.filter(dateRange => 
    isValidDate(dateRange.from) && isValidDate(dateRange.to)
  );

  if (validExcludedDates.length > 0) {
    upsertQuery = {
      ...upsertQuery,
      excludedDates: {
        create: validExcludedDates.map((dateRange) => ({
          from: new Date(dateRange.from),
          to: new Date(dateRange.to),
        })),
      }
    } as any
  }

  console.log('upsertQuery', upsertQuery)
    
  await prisma.user.upsert({
    where: {
      email: userEmail,
    },
    update: upsertQuery,
    create: {
      email: userEmail,
      reservedCourses: {
        create: reservedCourses.map((course) => ({
          dayNumber: course.dayNumber,
          hour: course.hour,
        })),
      },
      // Here, ensure that excludedDates is also handled correctly in the create block
      excludedDates: validExcludedDates ? {
        create: validExcludedDates.map((dateRange) => ({
          from: new Date(dateRange.from),
          to: new Date(dateRange.to),
        })),
      } : undefined,
    },
  });
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

async function reserveDate(
  token: string,
  reservedCourse: IReservedCourse,
  reservedDay: Date
): Promise<void> {
  const response = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/reservation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Sportigo-Token": token,
      },
      body: JSON.stringify({
        eventId: `_generated:${reservedCourse.id}:${reservedDay.getFullYear()}${
          reservedDay.getMonth() + 1
        }${reservedDay.getDate()}`,
        date: `${reservedDay.getFullYear()}-${
          reservedDay.getMonth() + 1
        }-${reservedDay.getDate()} ${reservedCourse.hour}`,
        members: ["549336"],
        coaching: false,
        discipline: null,
        nbFriends: null,
      }),
    }
  );

  if (!response.ok) {
    // Handle error
    const errorMessage = `Error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

function isDateWithinRange(date: Date, range: DateRange): boolean {
  const fromDate = new Date(range.from);
  const toDate = new Date(range.to);
  toDate.setDate(toDate.getDate() + 1);
  return date >= fromDate && date <= toDate;
}

function isDateExcluded(date: Date, excludedDates: Array<DateRange>): boolean {
  for (const range of excludedDates) {
    if (isDateWithinRange(date, range)) {
      return true;
    }
  }
  return false;
}

function getAllReservedDaysPerDayNumber(
  dayNumber: number,
  excludedDates: Array<DateRange>
): Array<Date> {
  const reservedDays = [];
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 3);

  for (let d = today; d <= nextMonth; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === dayNumber && !isDateExcluded(d, excludedDates)) {
      reservedDays.push(new Date(d));
    }
  }
  return reservedDays;
}

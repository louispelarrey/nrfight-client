import prisma from "@/lib/prisma";
import getUserByToken from "../../member/_get-user/get-user-by-token";

export interface DateRange {
  from: string;
  to: string;
}

export interface IReservedCourse {
  id: number;
  dayNumber: number;
  hour: string;
}

export async function reserveCourses(excludedDates: Array<DateRange>, reservedCourses: Array<IReservedCourse>, token: string): Promise<Array<PromiseSettledResult<void>>> {
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

  return Promise.allSettled(promises)
}

async function saveReservationToDb(
  token: string,
  reservedCourses: Array<IReservedCourse>,
  excludedDates: Array<DateRange>
): Promise<void> {
  const sportigoUser = await getUserByToken(token);

  if (!sportigoUser) {
    throw new Error('User not found');
  }

  const userEmail = sportigoUser.member.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true }
  });

  if (!user) {
    throw new Error('User not found in database');
  }

  const userId = user.id;

  // Filter valid excluded dates
  const validExcludedDates = excludedDates.filter(dateRange => 
    isValidDate(dateRange.from) && isValidDate(dateRange.to)
  );

  // Start a transaction
  const transaction = [];

  // First, delete existing reserved courses and excluded dates
  transaction.push(prisma.reservedCourses.deleteMany({ where: { userId } }));
  transaction.push(prisma.excludedDates.deleteMany({ where: { userId } }));

  // Then, create new reserved courses and excluded dates
  if (reservedCourses.length > 0) {
    transaction.push(
      prisma.user.update({
        where: { id: userId },
        data: {
          reservedCourses: {
            create: reservedCourses.map((course) => ({
              sportigoId: course.id,
              // Add other fields here
            }) as any),
          },
        },
      }),
    );
  }

  if (validExcludedDates.length > 0) {
    transaction.push(
      prisma.user.update({
        where: { id: userId },
        data: {
          excludedDates: {
            create: validExcludedDates.map((dateRange) => ({
              from: new Date(dateRange.from),
              to: new Date(dateRange.to),
            })),
          },
        },
      }),
    );
  }

  // Execute the transaction
  await prisma.$transaction(transaction);
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

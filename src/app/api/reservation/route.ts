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
    const { excludedDates, reservedCourses, token }: IRequestBody = await request.json();

    const promises = [];
    for (const reservedCourse of reservedCourses) {
      const reservedDays = getAllReservedDaysPerDayNumber(reservedCourse.dayNumber, excludedDates);
      for (const reservedDay of reservedDays) {
        promises.push(reserveDate(token, reservedCourse, reservedDay));
      }
    }

    await Promise.allSettled(promises);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
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
        eventId: `_generated:${reservedCourse.id}:${reservedDay.getFullYear()}${reservedDay.getMonth() + 1}${reservedDay.getDate()}`,
        date: `${reservedDay.getFullYear()}-${reservedDay.getMonth() + 1}-${reservedDay.getDate()} ${reservedCourse.hour}`,
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

function getAllReservedDaysPerDayNumber(dayNumber: number, excludedDates: Array<DateRange>): Array<Date> {
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

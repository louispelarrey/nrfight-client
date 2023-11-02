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

// const RESERVED_DAYS = [
//   {
//     //Can be found https://nrfight.app.sportigo.fr/member/planning with inspect element
//     // on data-row-id="_generated:312838:20231002"
//     id: 312838,
//     // name: "Monday - Lucha Libre",
//     dayNumber: 1,
//     // hour: "18:00",
//   },
//   {
//     id: 326221,
//     name: "Thursday - Lucha Libre",
//     dayNumber: 4,
//     hour: "16:30",
//   },
//   {
//     id: 312843,
//     name: "Saturday - Lucha Libre",
//     dayNumber: 6,
//     hour: "15:30",
//   },
// ];

export async function POST(request: Request): Promise<Response> {
  try {
    const { excludedDates, reservedCourses, token }: IRequestBody =
      await request.json();

    try {
      const promises = [];
      for (const reservedCourse of reservedCourses) {
        const reservedDays = getAllReservedDaysPerDayNumber(
          reservedCourse.dayNumber
        );
        for (const reservedDay of reservedDays) {
          promises.push(reserveDate(token, reservedCourse, reservedDay));
        }
      }

      await Promise.allSettled(promises);

      return new Response("OK", { status: 200 });
    } catch (e) {
      console.error(e);

      return new Response("error", { status: 500 });
    }
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
  const eventId = `_generated:${
    reservedCourse.id
  }:${reservedDay.getFullYear()}${
    reservedDay.getMonth() + 1
  }${reservedDay.getDate()}`;
  const date = `${reservedDay.getFullYear()}-${
    reservedDay.getMonth() + 1
  }-${reservedDay.getDate()} ${reservedCourse.hour}`;

  const response = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/reservation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Sportigo-Token": token,
      },
      body: JSON.stringify({
        eventId: eventId,
        date: date,
        members: ["549336"],
        coaching: false,
        discipline: 38,
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

function getAllReservedDaysPerDayNumber(dayNumber: number): Array<Date> {
  const reservedDays = [];
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 3);
  for (let d = today; d <= nextMonth; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === dayNumber) {
      reservedDays.push(new Date(d));
    }
  }
  return reservedDays;
}

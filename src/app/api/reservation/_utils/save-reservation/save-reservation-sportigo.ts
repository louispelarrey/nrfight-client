import { DateRange, IReservedCourse } from "./save-reservation-to-db";

export default async function saveReservationSportigo(
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
        "Cache-Control": "no-cache",
        //disable vercel cache
        "Surrogate-Control": "no-store",
        cache: "no-cache",
      },
      body: JSON.stringify({
        eventId: `_generated:${reservedCourse.sportigoId}:${reservedDay.getFullYear()}${
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






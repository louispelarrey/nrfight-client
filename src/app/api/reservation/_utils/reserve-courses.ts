import getAllNotExcludedDaysPerDayNumber from "./formater/get-all-not-excluded-days-per-day-number";
import saveReservationSportigo from "./save-reservation/save-reservation-sportigo";
import reserveDate from "./save-reservation/save-reservation-sportigo";
import saveReservationToDb, {
  DateRange,
  IReservedCourse,
} from "./save-reservation/save-reservation-to-db";

// export interface IReservedCourse {
//   sportigoId: string;
//   room: string;
//   dayNumber: number;
//   hour: string;
// }

interface NotExcludedDatesToReserve {
  sportigoId: string;
  room: string;
  dayNumber: number;
  hour: string;
  notExcludedDate: Date[];
}

interface IReserveCourse {
  token: string;
  sportigoUserId: string;
  excludedDates: Array<DateRange>;
  reservedCourses: Array<IReservedCourse>;
  email: string;
}

export async function reserveCourses({
  token,
  sportigoUserId,
  excludedDates,
  reservedCourses,
  email,
}: IReserveCourse): Promise<number> {
  await saveReservationToDb(email, reservedCourses, excludedDates);

  let notExcludedDatesToReserve: NotExcludedDatesToReserve[] = [];
  for (const reservedCourse of reservedCourses) {
    const notExcludedDate = getAllNotExcludedDaysPerDayNumber(
      reservedCourse.dayNumber,
      excludedDates
    );

    notExcludedDatesToReserve.push({
      sportigoId: reservedCourse.sportigoId,
      room: reservedCourse.room,
      dayNumber: reservedCourse.dayNumber,
      hour: reservedCourse.hour,
      notExcludedDate,
    });
  }

  const flattedNotExcludedDatesToReserve = notExcludedDatesToReserve.flat();

  const reservePromises = flattedNotExcludedDatesToReserve.map(
    (notExcludedDateToReserve) =>
      notExcludedDateToReserve.notExcludedDate.map(
        async (notExcludedDate) =>
          reserveDate(
            token,
            sportigoUserId,
            notExcludedDateToReserve,
            notExcludedDate
          )
      )
  );

  await Promise.all(reservePromises);

  return reservePromises.length;
}

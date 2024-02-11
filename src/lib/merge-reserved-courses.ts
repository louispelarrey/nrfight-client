import { IReservedCourse } from "@/app/api/reservation/_utils/save-reservation/save-reservation-to-db";
import {
  ReservedCoursesPerSportigoRoom,
  ReservedCourse,
} from "@/providers/filter-provider";

export function mergeReservedCourses(
  reservedCoursesPerSportigoRoom: ReservedCoursesPerSportigoRoom
): IReservedCourse[] {
  const reservedCourses = Object.entries(reservedCoursesPerSportigoRoom).map(
    ([room, reservedCourses]) => {
      return reservedCourses.map((reservedCourse: ReservedCourse) => {
        if (!reservedCourse.sportigoId) return undefined;

        // Create a date object for the startDate
        const startDate = new Date(reservedCourse.startDate);

        // Adjust the date for the Paris time zone before extracting the day and hour
        const adjustedStartDate = new Date(
          startDate.getTime() + getParisTimezoneOffset(startDate)
        );

        return {
          sportigoId: reservedCourse.sportigoId,
          room: room,
          dayNumber: adjustedStartDate.getDay(),
          hour: adjustedStartDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Paris",
          }),
        };
      });
    }
  );

  return reservedCourses
    .flat()
    .filter((course) => course !== undefined) as IReservedCourse[];
}

// Helper function to get the timezone offset for Paris, correctly considering daylight saving time
function getParisTimezoneOffset(date: Date) {
  // Determine if the date is during daylight saving time in Paris
  const isDST = isDaylightSavingTimeInParis(date);

  // Paris is UTC+1 in standard time, and UTC+2 in daylight saving time
  const parisOffset = isDST ? 2 * 60 * 60000 : 1 * 60 * 60000; // Offset in milliseconds

  // Calculate the difference between UTC time and Paris time, considering DST
  // No need to adjust for 'development' or 'production' as the offset should always reflect Paris time
  return parisOffset - date.getTimezoneOffset() * 60000;
}

// Adjusted function to determine DST in Paris more accurately
function isDaylightSavingTimeInParis(date: Date) {
  // DST starts on the last Sunday of March and ends on the last Sunday of October
  const march = new Date(date.getFullYear(), 2, 31);
  const october = new Date(date.getFullYear(), 9, 31);
  const lastSundayMarch = new Date(march.setDate(31 - march.getDay()));
  const lastSundayOctober = new Date(october.setDate(31 - october.getDay()));

  // Corrected to compare against the exact DST transition times
  lastSundayMarch.setHours(2, 0, 0, 0); // DST starts at 02:00 CET
  lastSundayOctober.setHours(3, 0, 0, 0); // DST ends at 03:00 CEST

  return date >= lastSundayMarch && date < lastSundayOctober;
}

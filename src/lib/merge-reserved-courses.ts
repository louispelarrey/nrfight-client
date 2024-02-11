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

// Helper function to get the timezone offset for Paris, considering daylight saving time
function getParisTimezoneOffset(date: Date) {
  // Check if we're in development environment
  const isDevelopment = process.env.NODE_ENV === "development";

  // Get the current time zone offset for Paris
  const parisOffset = isDaylightSavingTimeInParis(date) ? 2 * 60 : 1 * 60; // Offset in minutes

  // Get the local time zone offset in minutes
  const localOffset = date.getTimezoneOffset();

  // In development, adjust only if local time zone is not Paris
  // Otherwise, always apply Paris offset
  const offset = isDevelopment
    ? localOffset === -parisOffset
      ? 0
      : parisOffset - localOffset
    : parisOffset;

  // Return the offset in milliseconds, adjusting for whether we're adding or subtracting time
  return -offset * 60000; // Convert minutes to milliseconds and return negative for subtraction
}

// Determine if the given date is in daylight saving time for Paris
function isDaylightSavingTimeInParis(date: Date) {
  // This is a simplified way to check DST. For a robust solution, consider using a library like moment-timezone
  const march = new Date(date.getFullYear(), 2, 31); // March 31st
  const october = new Date(date.getFullYear(), 9, 31); // October 31st
  const lastSundayMarch = new Date(
    march.setDate(31 - ((march.getDay() + 1) % 7))
  );
  const lastSundayOctober = new Date(
    october.setDate(31 - ((october.getDay() + 1) % 7))
  );

  return date >= lastSundayMarch && date < lastSundayOctober;
}

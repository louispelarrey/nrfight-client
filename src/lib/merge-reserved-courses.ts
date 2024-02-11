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

function getParisTimezoneOffset(date: Date) {
  // Paris is UTC+1 in standard time, and UTC+2 during daylight saving time
  const parisDSTOffset = isDaylightSavingTimeInParis(date) ? 120 : 60; // Offset in minutes for Paris

  // Current local time zone offset in minutes
  const localOffset = date.getTimezoneOffset();

  // Determine the correct offset to apply to adjust to Paris time
  // This calculation will convert the local date to the equivalent Paris time
  const offsetToApply = parisDSTOffset - -localOffset;

  // Convert the offset to milliseconds to adjust the date
  return offsetToApply * 60000;
}

// This function should remain the same as it was properly designed to determine DST
function isDaylightSavingTimeInParis(date: Date) {
  const march = new Date(date.getFullYear(), 2, 31);
  const october = new Date(date.getFullYear(), 9, 31);
  const lastSundayMarch = new Date(march.setDate(31 - march.getDay()));
  const lastSundayOctober = new Date(october.setDate(31 - october.getDay()));

  lastSundayMarch.setHours(2, 0, 0, 0); // DST starts at 02:00 CET
  lastSundayOctober.setHours(3, 0, 0, 0); // DST ends at 03:00 CEST

  return date >= lastSundayMarch && date < lastSundayOctober;
}

// Usage example
const date = new Date(); // This would be your `startDate`
const adjustedDate = new Date(date.getTime() + getParisTimezoneOffset(date));

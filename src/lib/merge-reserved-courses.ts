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

        // Create a new Date object from the startDate
        const startDate = new Date(reservedCourse.startDate);
        // Retire one hour
        startDate.setHours(startDate.getHours() - 1);

        return {
          sportigoId: reservedCourse.sportigoId,
          room: room,
          dayNumber: startDate.getDay(),
          hour: startDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
    }
  );

  return reservedCourses
    .flat()
    .filter((course) => course !== undefined) as IReservedCourse[];
}

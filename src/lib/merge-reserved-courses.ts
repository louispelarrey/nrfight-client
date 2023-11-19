import { IReservedCourse } from "@/app/api/reservation/_utils/reserve-courses";
import { ReservedCoursesPerSportigoRoom, ReservedCourse } from "@/providers/FilterProvider";

export function mergeReservedCourses(reservedCoursesPerSportigoRoom: ReservedCoursesPerSportigoRoom): IReservedCourse[] {
  const reservedCourses = Object.entries(reservedCoursesPerSportigoRoom).map(([room, reservedCourses]) => {
    return reservedCourses.map((reservedCourse: ReservedCourse) => {
      if (!reservedCourse.sportigoId) return undefined;

      return {
        sportigoId: reservedCourse.sportigoId,
        room: room,
        dayNumber: new Date(reservedCourse.startDate).getDay(),
        hour: new Date(reservedCourse.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
    });
  })

  return reservedCourses.flat().filter(course => course !== undefined) as IReservedCourse[];
}
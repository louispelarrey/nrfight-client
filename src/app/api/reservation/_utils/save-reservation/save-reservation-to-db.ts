import prisma from "@/lib/prisma";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface IReservedCourse {
  sportigoId: string;
  room: string;
  dayNumber: number;
  hour: string;
}

export default async function saveReservationToDb(
  email: string,
  reservedCourses: Array<IReservedCourse>,
  excludedDates: Array<DateRange>
): Promise<void> {

  const validExcludedDates = excludedDates.filter(
    (dateRange) =>
      dateRange.from && 
      dateRange.to &&
      isValidDate(dateRange.from.toString()) &&
      isValidDate(dateRange.to.toString())
  );

  // Transaction optimization
  await prisma.$transaction(async (prisma) => {
    await prisma.reservedCourses.deleteMany({ where: { user : { email } } });
    await prisma.excludedDates.deleteMany({ where: { user : { email } } });

    if (reservedCourses.length > 0) {
      await prisma.user.update({
        where: { email },
        data: {
          reservedCourses: {
            create: reservedCourses.map((course) => ({
              sportigoId: course.sportigoId,
              room: course.room,
              dayNumber: course.dayNumber,
              hour: course.hour,
            })),
          },
        },
      });
    }

    if (validExcludedDates.length > 0) {
      await prisma.user.update({
        where: { email },
        data: {
          excludedDates: {
            create: validExcludedDates.map((dateRange) => ({
              from: new Date(dateRange.from),
              to: new Date(dateRange.to),
            })),
          },
        },
      });
    }
  });
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
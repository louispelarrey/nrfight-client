import { DateRange } from "../save-reservation/save-reservation-to-db";

export default function getAllNotExcludedDaysPerDayNumber(
  dayNumber: number,
  excludedDates: Array<DateRange>
): Array<Date> {
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

function isDateExcluded(date: Date, excludedDates: Array<DateRange>): boolean {
  for (const range of excludedDates) {
    if (isDateWithinRange(date, range)) {
      return true;
    }
  }
  return false;
}

function isDateWithinRange(date: Date, range: DateRange): boolean {
  const fromDate = new Date(range.from);
  const toDate = new Date(range.to);
  toDate.setDate(toDate.getDate() + 1);
  return date >= fromDate && date <= toDate;
}
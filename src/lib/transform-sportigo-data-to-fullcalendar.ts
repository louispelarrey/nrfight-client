import { SportigoPlanningData } from "@/hooks/use-sportigo-data";
import { rrulestr } from "rrule"; // Ensure you have the rrule library installed

export default function transformSportigoDataToFullCalendar(
  sportigoData?: SportigoPlanningData
) {
  if (!sportigoData || !sportigoData.data.success) {
    return [];
  }

  const toUTCDate = (localDate: any) => {
    const date = new Date(localDate);
    return Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  };

  return sportigoData.data.events.rows.map((event) => {
    const recurrenceRule = event.recurrenceRule;
    const rruleOptions = recurrenceRule
      ? rrulestr(recurrenceRule).options
      : null;
    const utcStartDate = toUTCDate(event.startDate);

    return {
      groupId: String(event.id),
      title: event.name,
      start: event.startDate,
      // end: event.endDate,
      allDay: false,
      rrule: recurrenceRule
        ? {
            freq: rruleOptions?.freq,
            dtstart: new Date(utcStartDate),
            until: rruleOptions?.until
              ? new Date(rruleOptions.until.toISOString())
              : undefined,
            byweekday: new Date(utcStartDate).getDay(),
          }
        : undefined,
    };
  });
}

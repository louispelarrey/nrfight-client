import { addDays, format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DateRange } from "react-day-picker";
import { SportigoPlanningData } from "@/hooks/useSportigoData";
import transformSportigoDataToFullCalendar from "@/lib/transformSportigoDataToFullCalendar";
import { useEffect } from "react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";

interface ReservationResultsProps {
  sportigoData?: SportigoPlanningData;
  excludedDates: DateRange[];
}

export default function ReservationResults({
  sportigoData,
  excludedDates,
}: ReservationResultsProps) {
  const sportigoDataToFullCalendar = transformSportigoDataToFullCalendar(sportigoData);

  return (
    <div className="flex flex-col gap-3 h-full">
      <h2>Resultat</h2>
      <FullCalendar
        timeZone="Europe/Paris"
        plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin]}
        locale={"fr"}
        allDaySlot={false}
        slotMinTime={"05:00:00"}
        initialView="dayGridDay"
        weekends={true}
        titleFormat={{ year: "numeric", month: "numeric", day: "numeric" }}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridDay,dayGridMonth",
        }}
        eventClick={(info) => {
          console.log(info.event._def.groupId);
        }}
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          list: "Liste",
        }}
        events={[
          ...sportigoDataToFullCalendar,
          ...excludedDates.flatMap((dateRange) =>
            dateRange.from && dateRange.to
              ? [
                  {
                    start: format(dateRange.from, "yyyy-MM-dd"),
                    end: format(addDays(dateRange.to, 1), "yyyy-MM-dd"),
                    display: "background",
                    color: "red",
                    rrule: undefined,
                  },
                ]
              : []
          ),
        ]}
      />
    </div>
  );
}

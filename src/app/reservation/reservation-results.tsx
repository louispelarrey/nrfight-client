"use client"

import { addDays, format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import transformSportigoDataToFullCalendar from "@/lib/transform-sportigo-data-to-fullcalendar";
import { useContext } from "react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FilterContext } from "@/providers/filter-provider";
import { SportigoContext } from "@/providers/sportigo-data-provider";

export default function ReservationResults() {

  const { sportigoData, isFetching, error } = useContext(SportigoContext);
  const sportigoDataToFullCalendar = transformSportigoDataToFullCalendar(sportigoData);

  const { excludedDates } = useContext(FilterContext);

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
          console.log(info.event.groupId);
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

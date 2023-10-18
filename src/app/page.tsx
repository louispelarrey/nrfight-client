"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function Home() {
  const [excludedDates, setExcludedDates] = useState<DateRange[]>([]);

  const handleDateChange = (index: number, dateRange: DateRange) => {
    const updatedDates = [...excludedDates];
    updatedDates[index] = dateRange;
    setExcludedDates(updatedDates);
  };

  const [excludedDaysPickers, setExcludedDaysPickers] = useState<ReactNode[]>([
    <CalendarDateRangePicker
      key={0}
      index={0}
      handleDateChange={handleDateChange}
    />,
  ]);

  const addExcludedDayPicker = () => {
    setExcludedDaysPickers([
      ...excludedDaysPickers,
      <CalendarDateRangePicker
        key={excludedDaysPickers.length}
        index={excludedDaysPickers.length}
        handleDateChange={handleDateChange}
      />,
    ]);
  };

  const [courseInputs, setCourseInputs] = useState<ReactNode[]>([
    <Input placeholder="ID Cours" className="w-1/3" key={0} />,
  ]);

  const addCourseInput = () => {
    setCourseInputs([
      ...courseInputs,
      <Input
        placeholder="ID Cours"
        className="w-1/3"
        key={courseInputs.length}
      />,
    ]);
  };

  return (
    <>
      <h1 className="text-5xl font-bold tracking-tight m-10 text-center">
        NRFight Better Reservation
      </h1>

      <div className="flex flex-col gap-8 m-8">
        <div className="flex flex-col gap-3">
          <h2>ID des cours à réserver</h2>
          <div className="flex flex-row gap-3 flex-wrap">
            {courseInputs}
            <Button
              variant="secondary"
              className="w-1/3"
              onClick={addCourseInput}
            >
              Ajouter des cours
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <h2>Jours à exclure</h2>
          {excludedDaysPickers}
          <Button
            variant="secondary"
            className="w-1/3"
            onClick={addExcludedDayPicker}
          >
            Ajouter des jours à exclure
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <h2>Resultat</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={"fr"}
            initialView="dayGridMonth"
            weekends={true}
            events={[
              { title: "event 1", date: "2023-10-18" },
              { title: "event 2", date: "2023-10-22" },
              ...excludedDates.flatMap((dateRange) =>
                dateRange.from && dateRange.to
                  ? [
                      {
                        start: format(dateRange.from, "yyyy-MM-dd"),
                        end: format(dateRange.to, "yyyy-MM-dd"),
                        display: "background",
                        color: "red",
                      },
                    ]
                  : []
              ),
            ]}
          />
        </div>

        <Separator />

        <Button>Envoyer</Button>
      </div>
    </>
  );
}

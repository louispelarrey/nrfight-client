"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";
import useSportigoData from "@/hooks/useSportigoData";
import useDateExcluder from "@/hooks/useDateExcluder";
import useCourseInputs from "@/hooks/useCourseInputs";
import ReservationIDCourse from "./ReservationIDCourse";
import ReservationExcludeDays from "./ReservationExcludeDays";
import ReservationResults from "./ReservationResults";
import { Protected } from "@/security/protected";

export default function Reservation() {
  const { data: sportigoData } = useSportigoData();
  const { excludedDates, excludedDaysPickers, addExcludedDayPicker } =
    useDateExcluder();
  const { courseInputs, addCourseInput } = useCourseInputs(sportigoData);

  return (
    <Protected>
      <>
        <h1 className="text-5xl font-bold tracking-tight p-2 m-6 text-center">
          NRFight Better Reservation
        </h1>

        <div className="flex flex-col gap-8 m-8">
          <ReservationIDCourse
            courseInputs={courseInputs}
            addCourseInput={addCourseInput}
          />
        <Separator />
          <ReservationExcludeDays
            excludedDaysPickers={excludedDaysPickers}
            addExcludedDayPicker={addExcludedDayPicker}
          />
          <Separator />
          <ReservationResults
            sportigoData={sportigoData}
            excludedDates={excludedDates}
          />
          <Separator />
          <Button>Envoyer</Button>
        </div>
      </>
    </Protected>
  );
}

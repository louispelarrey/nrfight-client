"use client";

import React, { useContext, useState } from "react";
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
import { FilterContext } from "@/providers/FilterProvider";

export default function Reservation() {
  
  const { data: sportigoData } = useSportigoData();
  const { excludedDates } = useContext(FilterContext);

  return (
    <Protected>
      <>
        <h1 className="text-5xl font-bold tracking-tight p-2 m-6 text-center">
          NRFight Better Reservation
        </h1>

        <div className="flex flex-col gap-8 m-8">
          <ReservationIDCourse
            sportigoData={sportigoData}
          />
          <Separator />
          <ReservationExcludeDays />
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

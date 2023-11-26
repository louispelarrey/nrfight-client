"use client";

import { Separator } from "@/components/ui/separator";
import ReservationIDCourse from "./reservation-id-course";
import ReservationExcludeDays from "./reservation-exclude-days";
import ReservationResults from "./reservation-results";
import { Protected } from "@/security/protected";
import ReservationSave from "./reservation-save";
import { Toaster } from "sonner";
import AppHeader from "@/components/ui/app-header";

export default function Reservation() {

  return (
    <Protected>
      <>
        <AppHeader />

        <div className="flex flex-col gap-4 m-6">
          <Toaster />
          <ReservationIDCourse />
          <Separator />
          <ReservationExcludeDays />
          {/* <Separator />
          <ReservationResults /> */}
          <Separator />
          <ReservationSave />
        </div>
      </>
    </Protected>
  );
}

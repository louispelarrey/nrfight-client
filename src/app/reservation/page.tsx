"use client";

import { Separator } from "@/components/ui/separator";
import ReservationIDCourse from "./ReservationIDCourse";
import ReservationExcludeDays from "./ReservationExcludeDays";
import ReservationResults from "./ReservationResults";
import { Protected } from "@/security/protected";
import ReservationSave from "./ReservationSave";
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
          <Separator />
          <ReservationResults />
          <Separator />
          <ReservationSave />
        </div>
      </>
    </Protected>
  );
}

"use client";

import { FilterProvider } from "@/providers/FilterProvider";
import { RetreivedReservationsProvider } from "@/providers/RetreivedReservationsProvider";
import { SportigoProvider } from "@/providers/SportigoDataProvider";
import { PropsWithChildren } from "react";

export default function ReservationLayout({ children }: PropsWithChildren) {
  return (
    <RetreivedReservationsProvider>
      <SportigoProvider>
        <FilterProvider>{children}</FilterProvider>
      </SportigoProvider>
    </RetreivedReservationsProvider>
  );
}

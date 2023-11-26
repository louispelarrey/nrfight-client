"use client";

import { FilterProvider } from "@/providers/filter-provider";
import { RetreivedReservationsProvider } from "@/providers/retreived-reservations-provider";
import { SportigoProvider } from "@/providers/sportigo-data-provider";
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

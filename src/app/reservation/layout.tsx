"use client";

import { FilterProvider } from "@/providers/FilterProvider";
import { SportigoProvider } from "@/providers/SportigoDataProvider";
import { PropsWithChildren } from "react";

export default function ReservationLayout({ children }: PropsWithChildren) {
  return (
    <SportigoProvider>
      <FilterProvider>{children}</FilterProvider>
    </SportigoProvider>
  );
}

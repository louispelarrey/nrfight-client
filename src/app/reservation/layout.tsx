"use client";

import { FilterProvider } from "@/providers/FilterProvider";
import { PropsWithChildren } from "react";

export default function ReservationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <FilterProvider>{children}</FilterProvider>
    </>
  );
}

"use client";

import useRetreiveReservations, {
  IReservations,
} from "@/hooks/useRetreiveReservations";
import { PropsWithChildren, createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface RetreivedReservationsContext {
  reservations: IReservations | undefined;
  isFetching: boolean;
  error: Error | null;
}

export const RetreivedReservationsContext = createContext({
  reservations: undefined as IReservations | undefined,
  isFetching: false,
  error: null as Error | null,
});

export const RetreivedReservationsProvider = ({ children }: PropsWithChildren) => {
  const { data: reservations, isFetching, error } = useRetreiveReservations();

  return (
    <RetreivedReservationsContext.Provider
      value={{ reservations, isFetching, error }}
    >
      {children}
    </RetreivedReservationsContext.Provider>
  );
};

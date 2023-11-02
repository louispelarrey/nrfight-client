"use client";

import useSportigoData, { SportigoPlanningData } from "@/hooks/useSportigoData";
import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface SportigoContext {
  sportigoData: SportigoPlanningData | undefined;
  isFetching: boolean;
  error: Error | null;
}

export const SportigoContext = createContext({
  sportigoData: undefined as SportigoPlanningData | undefined,
  isFetching: false,
  error: null as Error | null,
});

export const SportigoProvider = ({ children }: any) => {
  const { data: sportigoData, isFetching, error } = useSportigoData();

  return (
    <SportigoContext.Provider value={{ sportigoData, isFetching, error }}>
      {children}
    </SportigoContext.Provider>
  );
};

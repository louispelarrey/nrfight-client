"use client";

import { PropsWithChildren, createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface ReservedCourses {
  room: string;
  reservedCourses: string[];
}

export interface FilterContext {
  // reservedCourses.republique.reservedCourses
  reservedCourses: ReservedCourses
  setReservedCourses: (reservedCourses: string[]) => void;

  excludedDates: DateRange[];
  setExcludedDates: (excludedDates: DateRange[]) => void;
}

export const FilterContext = createContext({
  reservedCourses: [{}],
  setReservedCourses: (reservedCourses: string[]) => {},

  excludedDates: [
    {
      from: undefined,
      to: undefined,
    } as DateRange,
  ],
  setExcludedDates: (excludedDates: DateRange[]) => {},
});

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [reservedCourses, setReservedCourses] = useState<string[]>([]);
  const [excludedDates, setExcludedDates] = useState<DateRange[]>([]);

  return (
    <FilterContext.Provider
      value={{
        reservedCourses,
        setReservedCourses,
        excludedDates,
        setExcludedDates,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

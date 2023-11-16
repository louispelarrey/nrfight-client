"use client";

import { SportigoRoom } from "@/enums/sportigo-room";
import { PropsWithChildren, createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export type ReservedCourses = {
  [key in SportigoRoom]: string[];
};

const DEFAULT_RESERVED_COURSES: ReservedCourses = {
  [SportigoRoom.REPUBLIQUE]: [""],
  [SportigoRoom.TOLBIAC]: [""],
  [SportigoRoom.OLYMPIADES]: [""],
  [SportigoRoom.REPUBLIQUE_COACHING]: [""],
};

export interface FilterContext {
  // reservedCourses.republique.reservedCourses
  reservedCourses: ReservedCourses
  setReservedCourses: (reservedCourses: ReservedCourses) => void

  excludedDates: DateRange[];
  setExcludedDates: (excludedDates: DateRange[]) => void;
}

export const FilterContext = createContext({
  reservedCourses: DEFAULT_RESERVED_COURSES,
  setReservedCourses: (reservedCourses: ReservedCourses) => {},

  excludedDates: [
    {
      from: undefined,
      to: undefined,
    } as DateRange,
  ],
  setExcludedDates: (excludedDates: DateRange[]) => {},
});

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [reservedCourses, setReservedCourses] = useState<ReservedCourses>(DEFAULT_RESERVED_COURSES);
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

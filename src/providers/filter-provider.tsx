"use client";

import { SportigoRoom } from "@/enums/sportigo-room";
import { PropsWithChildren, createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface ReservedCourse {
  sportigoId: string;
  startDate: string;
}

export type ReservedCoursesPerSportigoRoom = {
  [key in SportigoRoom]: ReservedCourse[];
};

const DEFAULT_RESERVED_COURSES: ReservedCoursesPerSportigoRoom = {
  [SportigoRoom.REPUBLIQUE]: [{
    sportigoId: "",
    startDate: ""
  }],
  [SportigoRoom.TOLBIAC]: [{
    sportigoId: "",
    startDate: ""
  }],
  [SportigoRoom.OLYMPIADES]: [{
    sportigoId: "",
    startDate: ""
  }],
  [SportigoRoom.REPUBLIQUE_COACHING]: [{
    sportigoId: "",
    startDate: ""
  }],
};

export interface FilterContext {
  reservedCourses: ReservedCoursesPerSportigoRoom
  setReservedCourses: (reservedCourses: ReservedCoursesPerSportigoRoom) => void

  excludedDates: DateRange[];
  setExcludedDates: (excludedDates: DateRange[]) => void;
}

export const FilterContext = createContext({
  reservedCourses: DEFAULT_RESERVED_COURSES,
  setReservedCourses: (reservedCourses: ReservedCoursesPerSportigoRoom) => {},

  excludedDates: [
    {
      from: undefined,
      to: undefined,
    } as DateRange,
  ],
  setExcludedDates: (excludedDates: DateRange[]) => {},
});

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [reservedCourses, setReservedCourses] = useState<ReservedCoursesPerSportigoRoom>(DEFAULT_RESERVED_COURSES);
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

import { createContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

export interface FilterContext {
  reservedCourses: string[];
  setReservedCourses: (reservedCourses: string[]) => void;
  
  excludedDates: DateRange[];
  setExcludedDates: (excludedDates: DateRange[]) => void;
}

export const FilterContext = createContext({
  reservedCourses: [""],
  setReservedCourses: (reservedCourses: string[]) => {},

  excludedDates: [{
    from: undefined,
    to: undefined,
  } as DateRange],
  setExcludedDates: (excludedDates: DateRange[]) => {},
});

export const FilterProvider = ({ children }: any) => {
  const [reservedCourses, setReservedCourses] = useState<string[]>([]);
  const [excludedDates, setExcludedDates] = useState<DateRange[]>([]);

  return (
    <FilterContext.Provider value={{ reservedCourses, setReservedCourses, excludedDates, setExcludedDates }}>
      {children}
    </FilterContext.Provider>
  );
};
import { useState, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';
import { CalendarDateRangePicker } from '@/components/ui/calendar-date-range-picker';

export default function useDateExcluder () {

    const [excludedDates, setExcludedDates] = useState<DateRange[]>([]);

    const handleDateChange = (index: number, dateRange: DateRange) => {
      const updatedDates = [...excludedDates];
      updatedDates[index] = dateRange;
      setExcludedDates(updatedDates);
    };
  
    const [excludedDaysPickers, setExcludedDaysPickers] = useState<ReactNode[]>([
      <CalendarDateRangePicker
        key={0}
        index={0}
        handleDateChange={handleDateChange}
      />,
    ]);
  
    const addExcludedDayPicker = () => {
      setExcludedDaysPickers([
        ...excludedDaysPickers,
        <CalendarDateRangePicker
          key={excludedDaysPickers.length}
          index={excludedDaysPickers.length}
          handleDateChange={handleDateChange}
        />,
      ]);
    };

    return { excludedDates, excludedDaysPickers, addExcludedDayPicker };
}
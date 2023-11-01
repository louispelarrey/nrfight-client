import { useState, ReactNode, useCallback, useEffect, useContext } from "react";
import { DateRange } from "react-day-picker";
import ExcludedDayPicker from "@/components/ui/excluded-day-picker";
import { FilterContext } from "@/providers/FilterProvider";

// This hook manages the exclusion of specific date ranges.
export default function useDateExcluder() {
  const {excludedDates, setExcludedDates} = useContext(FilterContext);
  const [excludedDaysPickers, setExcludedDaysPickers] = useState<ReactNode[]>([]);

  // Updates the date range for a specific ExcludedDayPicker.
  const handleDateChange = (index: number, dateRange: DateRange) => {
    const updatedDates = [...excludedDates];
    updatedDates[index] = dateRange;
    setExcludedDates(updatedDates);
  };

  // Removes an ExcludedDayPicker and its corresponding date range.
  const removeExcludedDayPicker = (index: number) => {
    const updatedDates = excludedDates.filter((_, idx) => idx !== index);
    setExcludedDates(updatedDates);

    const updatedPickers = excludedDaysPickers.filter((_, idx) => idx !== index);
    setExcludedDaysPickers(updatedPickers);
  };

  // Adds a new ExcludedDayPicker with a default date range.
  const addExcludedDayPicker = () => {
    const pickerIndex = excludedDaysPickers.length;
    const newPicker = (
      <ExcludedDayPicker
        key={pickerIndex}
        index={pickerIndex}
        handleDateChange={handleDateChange}
        removeExcludedDayPicker={() => removeExcludedDayPicker(pickerIndex)}
      />
    );

    setExcludedDaysPickers([...excludedDaysPickers, newPicker]);

    const defaultDateRange = { from: undefined, to: undefined };
    setExcludedDates([...excludedDates, defaultDateRange]);
  };

  // Initialize with a default ExcludedDayPicker.
  useEffect(() => {
    addExcludedDayPicker();

    return () => {
      setExcludedDates([]);
      setExcludedDaysPickers([]);
    };
  }, []);

  return { excludedDates, excludedDaysPickers, addExcludedDayPicker };
}

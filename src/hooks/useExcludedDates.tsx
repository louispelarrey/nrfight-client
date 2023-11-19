import { useEffect, useContext } from "react";
import { DateRange } from "react-day-picker";
import { FilterContext } from "@/providers/FilterProvider";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";

export default function useExcludedDates() {
  const { retreivedReservations } = useContext(RetreivedReservationsContext);
  const { excludedDates, setExcludedDates } = useContext(FilterContext);

  const handleDateChange = (index: number, dateRange: DateRange) => {
    const updatedDates = [...excludedDates];
    updatedDates[index] = dateRange;
    setExcludedDates(updatedDates);
  };

  const addDate = () => {
    const defaultDateRange = { from: undefined, to: undefined };
    setExcludedDates([...excludedDates, defaultDateRange]);
  };

  const removeDate = (index: number) => {
    const updatedDates = [...excludedDates];
    updatedDates.splice(index, 1);
    setExcludedDates(updatedDates);
  }

  useEffect(() => {
    if (!retreivedReservations?.excludedDates || retreivedReservations?.excludedDates.length === 0) return;

    const excludedDates = retreivedReservations.excludedDates.map((date) => ({
      from: new Date(date.from),
      to: new Date(date.to),
    }));
    setExcludedDates(excludedDates);
  }, [retreivedReservations?.excludedDates]);

  return { excludedDates, handleDateChange, addDate, removeDate };
}

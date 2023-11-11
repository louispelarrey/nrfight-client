import React, { useContext } from 'react'; // Ensure useContext is imported from React
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "./calendar-date-range-picker";
import { Button } from "./button";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";

interface ExcludedDayPickerProps {
  index: number;
  handleDateChange: (index: number, dateRange: DateRange) => void;
  removeExcludedDayPicker: () => void;
}

export default function ExcludedDayPicker({
  index,
  handleDateChange,
  removeExcludedDayPicker,
}: ExcludedDayPickerProps) {
  const {reservations} = useContext(RetreivedReservationsContext)

  const dateRange = {
    from: reservations?.excludedDates[index]?.from ? new Date(reservations?.excludedDates[index].from || "") : undefined,
    to: reservations?.excludedDates[index]?.to ? new Date(reservations?.excludedDates[index].to || "") : undefined,
  };

  return (
    <div className="flex flex-row gap-3 w-100" key={index}>
      <div className="flex-grow">
        <CalendarDateRangePicker
          defaultValue={dateRange}
          index={index}
          handleDateChange={handleDateChange}
        />
      </div>
      <Button variant="destructive" onClick={removeExcludedDayPicker}>
        Supprimer
      </Button>
    </div>
  );
}
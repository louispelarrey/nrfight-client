import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "./calendar-date-range-picker";
import { Button } from "./button";
import useRetreiveReservations from "@/hooks/useRetreiveReservations";

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
  const { data: reservation } = useRetreiveReservations();

  const dateRange = {
    from: reservation?.excludedDates[index]?.from ? new Date(reservation?.excludedDates[index].from || "") : undefined,
    to: reservation?.excludedDates[index]?.to ? new Date(reservation?.excludedDates[index].to || "") : undefined,
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

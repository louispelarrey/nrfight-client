import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "./calendar-date-range-picker";
import { Button } from "./button";

interface ExcludedDayPickerProps {
  index: number;
  handleDateChange: (index: number, dateRange: DateRange) => void;
  removeExcludedDayPicker: () => void;
}

export default function ExcludedDayPicker({ index, handleDateChange, removeExcludedDayPicker }: ExcludedDayPickerProps) {
  return (
    <div className="flex flex-row gap-3 w-100" key={index}>
      <div className="flex-grow">
        <CalendarDateRangePicker
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

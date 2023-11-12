import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "./calendar-date-range-picker";
import { Button } from "./button";

interface ExcludedDayPickerProps {
  value: DateRange;
  index: number;
  handleDateChange: (index: number, range: DateRange) => void;
  removeDate: (index: number) => void;
}

export default function ExcludedDayPicker({
  value,
  index,
  handleDateChange,
  removeDate,
}: ExcludedDayPickerProps) {

  return (
    <div className="flex flex-row gap-3 w-100" key={index}>
      <div className="flex-grow">
        <CalendarDateRangePicker
          value={value}
          index={index}
          handleDateChange={handleDateChange}
        />
      </div>
      <Button variant="destructive" onClick={() => removeDate(index)}>
        Supprimer
      </Button>
    </div>
  );
}
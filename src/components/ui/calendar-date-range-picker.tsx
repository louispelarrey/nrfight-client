import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fr } from "date-fns/locale";

export function CalendarDateRangePicker({
  value,
  handleDateChange,
  index,
}: {
  value?: DateRange;
  handleDateChange: (index: number, dateRange: DateRange) => void;
  index: number;
}) {

  function handleSelect(range: DateRange | undefined, selectedDay: Date) {
    // Check if only one date is selected (start or end)
    if (range && (!range.from || !range.to)) {
      // If only one date is selected, set both from and to as the same date
      const updatedRange = { from: selectedDay, to: selectedDay };
      handleDateChange(index, updatedRange);
      return;
    }
  
    // Proceed as usual if both dates are selected
    if (range) {
      handleDateChange(index, range);
    }
  }
  

  return (
    <div className="grid gap-2 w-100 grow">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Sélectionner une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={handleSelect}
            numberOfMonths={1}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

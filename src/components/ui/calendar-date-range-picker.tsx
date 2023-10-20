import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fr } from "date-fns/locale";
import { useEffect } from "react";

export function CalendarDateRangePicker({
  handleDateChange,
  index,
}: {
  handleDateChange: (index: number, dateRange: DateRange) => void;
  index: number;
}) {
  
  const [date, setDate] = React.useState<DateRange | undefined>();

  const handleSelect = (dateRange?: DateRange) => {
    if (!dateRange) return;
    setDate(dateRange);
    handleDateChange(index, dateRange);
  };

  return (
    <div>
      <div className="grid gap-2" id="calendar">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
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
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={1}
              locale={fr}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

import React from "react";
import { Check } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Event, SportigoPlanningData } from "@/hooks/use-sportigo-data";
import getEventLabel from "@/lib/get-event-label";

interface ISelectCourseOptions {
  event: Event;
  handleSelect: (value: string, startDate: string) => void;
  value: string;
}

export default function SelectCourseOption({
  event,
  handleSelect,
  value,
}: ISelectCourseOptions) {

  const label = getEventLabel(event);

  return (
    <CommandItem
      key={event.id}
      value={`${String(event.id)}-${label}`}
      onSelect={(value) => handleSelect(value, event.startDate)}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          value === `${String(event.id)}` ? "opacity-100" : "opacity-0"
        )}
      />
      {label}
    </CommandItem>
  );
}

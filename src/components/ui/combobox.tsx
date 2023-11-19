import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ICourse } from "./course-input";
import SelectCourseOption from "./select-course-option";
import { SportigoPlanningData } from "@/hooks/useSportigoData";
import getEventLabel from "@/lib/get-event-label";

interface IComboboxProps {
  value: string;
  handleValueChange: (value: string, startDate: string) => void;
  sportigoData?: SportigoPlanningData;
}

export default function Combobox({
  value,
  handleValueChange,
  sportigoData,
}: IComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string, startDate: string) => {
    const id = currentValue.split("-")[0];
    handleValueChange(id, startDate);
    setOpen(false);
  };

  const searchClass = (() => {
    if (!sportigoData) return;

    const course = sportigoData.data.events.rows.find((event) => String(event.id) === value);
    return course ? getEventLabel(course): "Rechercher un cours";
  })();

  const displayCourses = (() => {
    return (
      sportigoData &&
      sportigoData.data.events.rows.map((event) => (
        <SelectCourseOption
          key={String(event.id)}
          event={event}
          handleSelect={handleSelect}
          value={value}
        />
      ))
    );
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left lg:h-24 h-16"
        >
          {searchClass}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px] h-[225px]" align="start">
        <Command>
          <CommandInput placeholder="Rechercher un cours..." />
          <CommandEmpty>Pas de cours trouvé.</CommandEmpty>
          <CommandGroup>{displayCourses}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

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

interface IComboboxProps {
  value: string;
  handleValueChange: (value: string, index: number) => void;
  courses?: ICourse[];
  index: number;
}

export default function Combobox({
  value,
  handleValueChange,
  courses,
  index,
}: IComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    const id = currentValue.split("-")[0];
    handleValueChange(id, index);
    setOpen(false);
  };

  const searchClass = (() => {
    if (!courses) return;

    const course = courses.find((course) => course.value === value);
    return course ? course.label : "Rechercher un cours";
  })();

  const displayCourses = (() => {
    return (
      courses &&
      courses.map((course) => (
        <CommandItem
          key={course.value}
          value={`${course.value}-${course.label}`}
          onSelect={handleSelect}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === course.value ? "opacity-100" : "opacity-0"
            )}
          />
          {course.label}
        </CommandItem>
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
          className="w-full justify-between text-left h-full"
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

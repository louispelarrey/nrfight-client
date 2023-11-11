"use client";

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
import { Skeleton } from "./skeleton";
import { FilterContext } from "@/providers/FilterProvider";
import { useContext, useEffect, useState } from "react";
import useRetreiveReservations from "@/hooks/useRetreiveReservations";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";

interface ICourse {
  value: string;
  label: string;
}

interface IComboboxProps {
  courses?: ICourse[];
  index: number;
}

export default function Combobox({ courses, index }: IComboboxProps) {
  const {reservations} = useContext(RetreivedReservationsContext)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const {reservedCourses, setReservedCourses} = useContext(FilterContext);

  useEffect(() => {
    if (!value || value === "") return;

    const updatedReservedCourses = [...reservedCourses];
    updatedReservedCourses[index] = value;
    setReservedCourses(updatedReservedCourses);
  }, [value, reservedCourses, setReservedCourses, index]);

  useEffect(() => {
    if (!reservations || reservations.reservedCourses.length === 0 || !reservations.reservedCourses[index]) return;

    setValue(reservations.reservedCourses[index].sportigoId);
  }, [reservations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && courses
            ? courses.find((course) => course.value === value)?.label
            : "Rechercher un cours"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px] h-[225px]" align="start">
        <Command>
          <CommandInput placeholder="Rechercher un cours..." />
          <CommandEmpty>Pas de cours trouvé.</CommandEmpty>
          <CommandGroup>
            {courses && courses.map((course) => (
              <CommandItem
                key={course.value}
                value={`${course.value}-${course.label}`}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue === value.split("-")[0]
                      ? ""
                      : currentValue.split("-")[0]
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === course.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

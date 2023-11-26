import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SportigoPlanningData } from "@/hooks/use-sportigo-data";
import { useComboboxSearch } from "@/hooks/use-combobox-search";

interface IComboboxProps {
  value: string;
  handleValueChange: (value: string, startDate: string) => void;
  sportigoData: SportigoPlanningData;
}

export default function Combobox({
  value,
  handleValueChange,
  sportigoData,
}: IComboboxProps) {
  const { open, setOpen, handleSearch, searchClass, displayCourses } =
    useComboboxSearch({
      sportigoData,
      handleValueChange,
      value,
    });

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
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Rechercher un cours..."
            onValueChange={(value) => handleSearch(value)}
          />
          <CommandEmpty>Pas de cours trouvé.</CommandEmpty>
          <CommandGroup>{displayCourses}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

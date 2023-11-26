import { useState, useCallback } from "react";
import Fuse from "fuse.js";
import { SportigoPlanningData } from "./useSportigoData";
import SelectCourseOption from "@/components/ui/select-course-option";
import { Event } from "@/hooks/useSportigoData";

interface IComboboxSearchProps {
  sportigoData: SportigoPlanningData;
  handleValueChange: (value: string, startDate: string) => void;
  value: string;
}

export function useComboboxSearch({
  sportigoData,
  handleValueChange,
  value,
}: IComboboxSearchProps) {
  const sportigoDataSlice = sportigoData.data.events.rows.slice(0, 5);

  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Event[]>(
    sportigoDataSlice
  );

  const fuse = new Fuse(sportigoData.data.events.rows, {
    keys: ["label"],
    useExtendedSearch: true,
  });

  const handleSearch = useCallback((searchValue: string) => {
    if (!searchValue) {
      setSearchResults(sportigoDataSlice);
      return;
    }

    const results = fuse.search(`${searchValue}`);
    const limitedResults = results.slice(0, 5).map((result) => result.item);
    setSearchResults(limitedResults);
  }, []);

  const handleSelect = (currentValue: string, startDate: string) => {
    const id = currentValue.split("-")[0];
    handleValueChange(id, startDate);
    setOpen(false);
  };

  const searchClass = (() => {
    if (!sportigoData) return;

    const course = sportigoData.data.events.rows.find(
      (event) => String(event.id) === value
    );
    return course?.label ?? "Rechercher un cours";
  })();

  const displayCourses = (() => {
    return searchResults.map((event) => (
      <SelectCourseOption
        key={String(event.id)}
        event={event}
        handleSelect={handleSelect}
        value={value}
      />
    ));
  })();

  return {
    open,
    setOpen,
    handleSearch,
    searchClass,
    displayCourses,
  };
}

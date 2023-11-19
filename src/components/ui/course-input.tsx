import { SportigoPlanningData } from "@/hooks/useSportigoData";
import Combobox from "./combobox";
import DeleteButton from "./delete-button";

export interface ICourse {
  value: string;
  name: string;
  startDate: string;
  label: string;
}

interface CoursesInputProps {
  value: string;
  sportigoData: SportigoPlanningData;
  handleValueChange: (value: string, startDate: string) => void;
  removeComboboxValue: () => void;
}

export default function CourseInput({
  value,
  sportigoData,
  handleValueChange,
  removeComboboxValue,
}: CoursesInputProps) {

  return (
    <div className="flex flex-row gap-3 w-full">
      <Combobox
        value={value}
        handleValueChange={handleValueChange}
        sportigoData={sportigoData}
      />
      <DeleteButton removeFunction={removeComboboxValue} />
    </div>
  );
}

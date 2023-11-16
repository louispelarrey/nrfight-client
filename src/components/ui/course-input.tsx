import Combobox from "./combobox";
import { Button } from "./button";
import { Trash2Icon } from "lucide-react";
import DeleteButton from "./delete-button";

export interface ICourse {
  value: string;
  label: string;
}

interface CoursesInputProps {
  value: string;
  courses?: ICourse[];
  index: number;
  handleValueChange: (value: string, index: number) => void;
  removeComboboxValue: () => void;

}

export default function CourseInput({
  value,
  courses,
  index,
  handleValueChange,
  removeComboboxValue,
}: CoursesInputProps) {

  return (
    <div className="flex flex-row gap-3 w-full">
      <Combobox
        value={value}
        handleValueChange={handleValueChange}
        courses={courses}
        index={index}
      />
      <DeleteButton removeFunction={removeComboboxValue} />
    </div>
  );
}

import { useState, ReactNode, useCallback, useEffect, useContext } from "react";
import CoursesInput from "@/components/ui/courses-input";
import { SportigoPlanningData } from "./useSportigoData";

export default function useCourseInputs(
  sportigoData: SportigoPlanningData | undefined
) {
  const [courseInputs, setCourseInputs] = useState<ReactNode[]>([]);

  const removeCourseInput = (index: number) => {
    const updatedInputs = courseInputs.filter((_, idx) => idx !== index);
    setCourseInputs(updatedInputs);
  };

  const addCourseInput = () => {
    const inputIndex = courseInputs.length;
    const newInput = (
      <CoursesInput
        sportigoData={sportigoData}
        key={inputIndex}
        removeCourseInput={() => removeCourseInput(inputIndex)}
        index={inputIndex}
      />
    );

    setCourseInputs([...courseInputs, newInput]);
  };

  useEffect(() => {
    if(courseInputs.length > 0 || !sportigoData ) return;

    addCourseInput();
  }, [sportigoData]);

  return { courseInputs, addCourseInput, removeCourseInput };
}

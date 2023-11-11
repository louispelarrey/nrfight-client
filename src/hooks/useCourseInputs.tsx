"use client"

import { useState, ReactNode, useCallback, useEffect, useContext } from "react";
import CoursesInput from "@/components/ui/courses-input";
import { SportigoPlanningData } from "./useSportigoData";
import { FilterContext } from "@/providers/FilterProvider";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";

export default function useCourseInputs(
  sportigoData: SportigoPlanningData | undefined
) {

  const { reservations } = useContext(RetreivedReservationsContext);  
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
    if (!sportigoData) return;
  
    const numberOfCourses = reservations?.reservedCourses.length || 1;
    if (courseInputs.length < numberOfCourses) {
      for (let i = courseInputs.length; i < numberOfCourses; i++) {
        addCourseInput();
      }
    }
  }, [sportigoData, reservations?.reservedCourses.length]);
  

  return { courseInputs, addCourseInput, removeCourseInput };
}

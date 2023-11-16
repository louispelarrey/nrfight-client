import React from "react";
import { Button } from "./button";
import CourseInput, { ICourse } from "./course-input";

interface ICoursesInputs {
  reservedCourses: string[];
  handleReservationChange: (value: string, index: number) => void;
  deleteReservation: (index: number) => void;
  addReservation: () => void;
  courses?: ICourse[];
}

export default function CoursesInputs({
  reservedCourses,
  handleReservationChange,
  deleteReservation,
  addReservation,
  courses,
}: ICoursesInputs) {
  return (
    <>
      {reservedCourses.map((reservedCourses, index) => (
        <CourseInput
          value={reservedCourses}
          handleValueChange={handleReservationChange}
          courses={courses}
          key={index}
          removeComboboxValue={() => deleteReservation(index)}
          index={index}
        />
      ))}
      <Button variant="secondary" className="w-full" onClick={addReservation}>
        Ajouter des cours
      </Button>
    </>
  );
}
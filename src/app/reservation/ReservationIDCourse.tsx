import { Button } from "@/components/ui/button";
import useCourseInputs from "@/hooks/useComboboxValues";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext, useMemo } from "react";
import CoursesInput from "@/components/ui/courses-input";
import transformSportigoDataToEvent from "@/lib/transform-sportigo-data-to-event";

export default function ReservationIDCourse() {
  const { reservedCourses, handleReservationChange, deleteReservation, addReservation } =
    useCourseInputs();
  const { sportigoData } = useContext(SportigoContext);

  const courses = useMemo(() => {
    if (!sportigoData) return;
    return transformSportigoDataToEvent(sportigoData);
  }, [sportigoData]);

  return (
    <div className="flex flex-col gap-3">
      <h2>Cours à réserver</h2>
      <div className="flex flex-row gap-3 flex-wrap">
        {reservedCourses.map((reservedCourses, index) => (
          <CoursesInput
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
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import useCourseInputs from "@/hooks/useCourseInputs";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext } from "react";
import CoursesInput from "@/components/ui/courses-input";
import transformSportigoDataToEvent from "@/lib/transform-sportigo-data-to-event";

export default function ReservationIDCourse() {
  const { comboboxValues, addComboboxValue, handleComboboxValueChange, removeComboboxValue } =
    useCourseInputs();

  const { sportigoData } = useContext(SportigoContext);
  const courses = transformSportigoDataToEvent(sportigoData);

  return (
    <div className="flex flex-col gap-3">
      <h2>Cours à réserver</h2>
      <div className="flex flex-row gap-3 flex-wrap">
        {comboboxValues.map((comboboxValue, index) => (
          <CoursesInput
            value={comboboxValue}
            handleValueChange={handleComboboxValueChange}
            courses={courses}
            key={index}
            removeComboboxValue={() => removeComboboxValue(index)}
            index={index}
          />
        ))}
        <Button variant="secondary" className="w-full" onClick={addComboboxValue}>
          Ajouter des cours
        </Button>
      </div>
    </div>
  );
}

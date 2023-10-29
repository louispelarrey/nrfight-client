import { Button } from "@/components/ui/button";
import { ReactNode, useEffect } from "react";

interface ReservationIDCourseProps {
  courseInputs: ReactNode[];
  addCourseInput: () => void;
}

export default function ReservationIDCourse({
  courseInputs,
  addCourseInput,
}: ReservationIDCourseProps) {

  useEffect(() => {
    addCourseInput();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h2>Cours à réserver</h2>
      <div className="flex flex-row gap-3 flex-wrap">
        {courseInputs}
        <Button variant="secondary" className="w-full" onClick={addCourseInput}>
          Ajouter des cours
        </Button>
      </div>
    </div>
  );
}

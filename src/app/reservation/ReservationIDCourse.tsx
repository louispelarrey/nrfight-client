import { Button } from "@/components/ui/button";
import { SportigoPlanningData } from "@/hooks/useSportigoData";
import useCourseInputs from "@/hooks/useCourseInputs";

interface ReservationIDCourseProps {
  sportigoData: SportigoPlanningData | undefined;
}

export default function ReservationIDCourse({
  sportigoData,
}: ReservationIDCourseProps) {
  const { courseInputs, addCourseInput } = useCourseInputs(sportigoData);

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

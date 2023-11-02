import { SportigoPlanningData } from "@/hooks/useSportigoData";
import Combobox from "./combobox";
import { Button } from "./button";

interface CoursesInputProps {
  sportigoData: SportigoPlanningData | undefined;
  removeCourseInput: () => void;
  index: number;
}

export default function CoursesInput({
  sportigoData,
  removeCourseInput,
  index
}: CoursesInputProps) {
  return (
    <div className="flex flex-row gap-3 w-full">
      <Combobox
        courses={sportigoData?.data.events.rows.map((course) => ({
          value: String(course.id),

          label: `
          ${course.name} | Tous les ${new Date(
            course.startDate
          ).toLocaleDateString("fr-FR", { weekday: "long" })} à ${new Date(
            course.startDate
          ).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
        }))}
        index={index}
      />
      <Button variant="destructive" onClick={removeCourseInput}>
        Supprimer
      </Button>
    </div>
  );
}

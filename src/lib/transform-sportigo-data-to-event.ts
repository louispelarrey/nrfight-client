import { ICourse } from "@/components/ui/courses-input";
import { SportigoPlanningData } from "@/hooks/useSportigoData";

export default function transformSportigoDataToEvent(sportigoData?: SportigoPlanningData) {
  return sportigoData?.data.events.rows.map((course) => ({
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
  } as ICourse));
}
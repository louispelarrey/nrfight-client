import { SportigoPlanningData } from "@/hooks/useSportigoData";

export default function getInfosFromSportigoData(
  sportigoData: SportigoPlanningData,
  reservedCourses: string[]
) {
  const info: {
    dayNumber: number;
    hour: string;
    sportigoId: string;
  }[] = [];

  // Iterate through the events in SportigoPlanningData
  sportigoData.data.events.rows.forEach((event) => {
    // Convert startDate and endDate strings to Date objects
    const startDate = new Date(event.startDate);

    // Get day number (1-7) and hour (e.g., "16:30")
    const dayNumber = startDate.getDay()
    const hour = startDate.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check if event ID is present in reservedCourses array
    if (reservedCourses.includes(event.id.toString())) {
      info.push({
        dayNumber,
        hour,
        sportigoId: String(event.id),
      });
    }
  });

  return info;
}

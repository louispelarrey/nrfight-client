import { SportigoPlanningData } from "@/hooks/useSportigoData";

export default function getInfosFromSportigoData(
  sportigoData: SportigoPlanningData,
  reservedCourses: string[]
) {
  const info: {
    dayNumber: number;
    hour: string;
    eventId: string;
  }[] = [];

  // Iterate through the events in SportigoPlanningData
  sportigoData.data.events.rows.forEach((event) => {
    // Convert startDate and endDate strings to Date objects
    const startDate = new Date(event.startDate);

    // Get day number (1-7) and hour (e.g., "16:30")
    const dayNumber = startDate.getDay() || 7; // Convert Sunday from 0 to 7
    const hour = startDate.toISOString().substring(11, 16);

    // Check if event ID is present in reservedCourses array
    if (reservedCourses.includes(event.id.toString())) {
      info.push({
        dayNumber,
        hour,
        eventId: String(event.id),
      });
    }
  });

  return info;
}

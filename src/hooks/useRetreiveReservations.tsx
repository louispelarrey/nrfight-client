import { ReservedCourse } from "@/providers/FilterProvider";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export interface IReservations {
  reservedCourses: ReservedCourse[];
  excludedDates: DateRange[];
}

export default function useRetreiveReservations() {
  const { isFetching, error, data } = useQuery<IReservations>({
    queryKey: ["retreive-reservations"],
    queryFn: () =>
      fetch(
        "api/reservation?" +
          new URLSearchParams({
            token: localStorage.getItem("token") || "no-token-found",
          }).toString()
      ).then((res) => res.json()),
    retry: false,
  });

  return { isFetching, error, data };
}

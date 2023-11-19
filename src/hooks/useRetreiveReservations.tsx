import { SportigoRoom } from "@/enums/sportigo-room";
import { ReservedCoursesPerSportigoRoom } from "@/providers/FilterProvider";
import { useQuery } from "@tanstack/react-query";

export interface IRetreivedReservations {
  reservedCourses: ReservedCoursesPerSportigoRoom[];
  excludedDates: {
    from: string;
    to: string;
  }[];
}

export default function useRetreiveReservations() {
  const { isFetching, error, data } = useQuery<IRetreivedReservations>({
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

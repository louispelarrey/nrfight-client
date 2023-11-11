import { useQuery } from "@tanstack/react-query";
import useToken from "./useToken";

interface IReservations {
  reservedCourses: string[];
  excludedDates: string[];
}

export default function useRetreiveReservations() {
  const { token } = useToken();

  const { isFetching, error, data } = useQuery<IReservations>({
    queryKey: ["retreive-reservations"],
    queryFn: () =>
      fetch(
        "api/reservation?" +
          new URLSearchParams({ token: localStorage.getItem("token") || "no-token-found" }).toString(),
      ).then((res) => res.json()),
  });

  return { isFetching, error, data };
}

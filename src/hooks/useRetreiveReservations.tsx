import { useQuery } from "@tanstack/react-query";
import useToken from "./useToken";
import { DateRange } from "react-day-picker";

export interface IReservations {
  reservedCourses: {
    sportigoId: string;
  }[];
  excludedDates: {
    from: string;
    to: string;
  }[];
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

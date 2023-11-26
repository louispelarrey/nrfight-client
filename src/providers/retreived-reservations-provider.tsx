import useRetreiveReservations, {
  IRetreivedReservations,
} from "@/hooks/use-retreive-reservations";
import { PropsWithChildren, createContext } from "react";

export interface RetreivedReservationsContext {
  retreivedReservations: IRetreivedReservations | undefined;
  isFetching: boolean;
  error: Error | null;
}

export const RetreivedReservationsContext = createContext({
  retreivedReservations: undefined as IRetreivedReservations | undefined,
  isFetching: false,
  error: null as Error | null,
});

export const RetreivedReservationsProvider = ({ children }: PropsWithChildren) => {
  const { data: retreivedReservations, isFetching, error } = useRetreiveReservations();

  return (
    <RetreivedReservationsContext.Provider
      value={{ retreivedReservations, isFetching, error }}
    >
      {children}
    </RetreivedReservationsContext.Provider>
  );
};

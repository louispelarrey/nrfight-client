"use client";

import { SportigoRoom } from "@/enums/sportigo-room";
import useSportigoData, { SportigoPlanningData } from "@/hooks/use-sportigo-data";
import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export interface SportigoContext {
  sportigoData: SportigoPlanningData | undefined;
  isFetching: boolean;
  error: Error | null;
  room: SportigoRoom;
  setRoom: (room: SportigoRoom) => void;
}

export const SportigoContext = createContext({
  sportigoData: undefined as SportigoPlanningData | undefined,
  isFetching: false,
  error: null as Error | null,
  room: SportigoRoom.REPUBLIQUE,
  setRoom: (room: SportigoRoom) => {},
});

export const SportigoProvider = ({ children }: any) => {
  const [room, setRoom] = useState<SportigoRoom>(SportigoRoom.REPUBLIQUE);
  const { data: sportigoData, isFetching, error } = useSportigoData(room);

  return (
    <SportigoContext.Provider value={{ sportigoData, isFetching, error, room, setRoom }}>
      {children}
    </SportigoContext.Provider>
  );
};

"use client"

import { useQuery } from "@tanstack/react-query";

export interface Event {
  id: number;
  startDate: string;
  room: string;
  roomName: string;
  endDate: string;
  duration: string;
  realDuration: string;
  splitDuration: string | null;
  startInterval: string | null;
  lessonType: string | null;
  note: string;
  private: boolean;
  onlyOneActivityAtTime: boolean | null;
  durationUnit: string;
  blocked: boolean;
  cancelId: number | null;
  activities: string | null;
  cls: string;
  name: string;
  recurrenceRule: string | null;
  exceptionDates: string[];
  resourceId: number;
  coachId: number;
  allDay: boolean;
  credit: string;
  creditType: string | null;
  inscription: number;
  reservation: number[];
  parite: string | null;
}

interface Events {
  rows: Event[];
}

export interface SportigoPlanningData {
  data: {
    status: string;
    success: boolean;
    events: Events;
    resources: {
      rows: {
        id: number;
        name: string;
        eventColor: string;
      }[];
    };
  };
}

export default function useSportigoData(room: string) {
  const { isFetching, error, data } = useQuery<SportigoPlanningData>({
    queryKey: ["sportigoPlanningData", room],
    queryFn: () => fetch(`/api/planning?room=${room}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { isFetching, error, data };
}

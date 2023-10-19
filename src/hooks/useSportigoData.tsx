import { useQuery } from "@tanstack/react-query";

interface Event {
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
  };
}

export default function useSportigoData() {
  const { isFetching, error, data } = useQuery<SportigoPlanningData>({
    queryKey: ["sportigoPlanningData"],
    queryFn: () => fetch("api/planning/republique").then((res) => res.json()),
  });

  return { isFetching, error, data };
}

"use client";

import { Separator } from "@/components/ui/separator";
import ReservationIDCourse from "./ReservationIDCourse";
import ReservationExcludeDays from "./ReservationExcludeDays";
import ReservationResults from "./ReservationResults";
import { Protected } from "@/security/protected";
import ReservationSave from "./ReservationSave";
import useToken from "@/hooks/useToken";
import { useQuery } from "@tanstack/react-query";

export default function Reservation() {

  const { token, logout } = useToken();
  
  useQuery({
    queryKey: ['member'],
    queryFn: async () => {
    
      const res = await fetch("/api/member", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) logout();

      return res.json();
    },
    enabled: !!token,
  })
  

  return (
    <Protected>
      <>
        <h1 className="text-5xl font-bold tracking-tight p-2 m-6 text-center">
          NRFight Better Reservation
        </h1>

        <div className="flex flex-col gap-8 m-8">
          <ReservationIDCourse />
          <Separator />
          <ReservationExcludeDays />
          <Separator />
          <ReservationResults />
          <Separator />
          <ReservationSave />
        </div>
      </>
    </Protected>
  );
}

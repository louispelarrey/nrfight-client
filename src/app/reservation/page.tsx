"use client";

import { Separator } from "@/components/ui/separator";
import ReservationIDCourse from "./ReservationIDCourse";
import ReservationExcludeDays from "./ReservationExcludeDays";
import ReservationResults from "./ReservationResults";
import { Protected } from "@/security/protected";
import ReservationSave from "./ReservationSave";
import useToken from "@/hooks/useToken";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppHeader from "@/components/ui/app-header";

export default function Reservation() {
  const { token, logout } = useToken();

  useQuery({
    queryKey: ["member"],
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
    retry: false,
  });

  return (
    <Protected>
      <>
        <AppHeader logout={logout} />

        <div className="flex flex-col gap-4 m-6">
          <Toaster />
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

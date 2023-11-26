"use client";

import { mergeReservedCourses } from "@/lib/merge-reserved-courses";
import { FilterContext } from "@/providers/filter-provider";
import { SportigoContext } from "@/providers/sportigo-data-provider";
import { UserContext } from "@/providers/user-provider";
import { useContext, useState } from "react";
import { toast } from 'sonner'

export default function useSendFiltersToServer() {
  const { token } = useContext(UserContext);
  const { reservedCourses, excludedDates } = useContext(FilterContext);
  const { sportigoData, isFetching, error } = useContext(SportigoContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendToServer = async () => {
    setIsLoading(true);

    try {
      if (!sportigoData) throw new Error("No sportigo data");

      const res = await fetch("/api/reservation", {
        method: "POST",
        body: JSON.stringify({
          reservedCourses: mergeReservedCourses(reservedCourses),
          excludedDates,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error while sending data to server");

      toast.success("Données sauvegardées avec succès");
    } catch (error) {
      console.error("Error while sending data to server");

      toast.error("Erreur lors de la sauvegarde des données");
    } finally {
      setIsLoading(false);
    }
  };

  return { sendToServer, isLoading };
}

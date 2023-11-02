"use client";

import getInfosFromSportigoData from "@/lib/get-infos-from-sportigo-data";
import { FilterContext } from "@/providers/FilterProvider";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import { UserContext } from "@/providers/UserProvider";
import { useContext, useState } from "react";

export default function useSendFiltersToServer() {
  const { token } = useContext(UserContext);
  const { reservedCourses, excludedDates } = useContext(FilterContext);
  const { sportigoData, isFetching, error } = useContext(SportigoContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendToServer = async () => {
    setIsLoading(true);

    try {
      if (!sportigoData) throw new Error("No sportigo data");
      const fullEventInfo = getInfosFromSportigoData(
        sportigoData,
        reservedCourses
      );

      const res = await fetch("/api/reservation", {
        method: "POST",
        body: JSON.stringify({
          reservedCourses: fullEventInfo,
          excludedDates,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error while sending data to server");
    } catch (error) {
      console.error("Error while sending data to server", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendToServer, isLoading };
}

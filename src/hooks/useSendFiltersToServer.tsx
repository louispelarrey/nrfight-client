"use client";

import getInfosFromSportigoData from "@/lib/get-infos-from-sportigo-data";
import { FilterContext } from "@/providers/FilterProvider";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import { useContext, useState } from "react";

export default function useSendFiltersToServer() {
  const { reservedCourses, excludedDates } = useContext(FilterContext);
  const { sportigoData, isFetching, error } = useContext(SportigoContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendToServer = () => {
    setIsLoading(true);

    try {
      if (!sportigoData) throw new Error("No sportigo data");
      const fullEventInfo = getInfosFromSportigoData(
        sportigoData,
        reservedCourses
      );

      fetch("/api/reservation", {
        method: "POST",
        body: JSON.stringify({
          fullEventInfo,
          excludedDates,
          token: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error while sending data to server", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendToServer, isLoading };
}

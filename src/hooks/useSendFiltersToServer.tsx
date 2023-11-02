"use client"

import { FilterContext } from "@/providers/FilterProvider";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import { useContext } from "react";

export default function useSendFiltersToServer() {
  const { reservedCourses, excludedDates } = useContext(FilterContext);
  const { sportigoData, setSportigoData } = useContext(SportigoContext);

  const sendToServer = () => {
    const res = fetch("/api/reservation", {
      method: "POST",
      body: JSON.stringify({
        reservedCourses,
        excludedDates,
        token: localStorage.getItem("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  };

  return sendToServer;
}

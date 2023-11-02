"use client"

import { Button } from "@/components/ui/button";
import { SportigoPlanningData } from "@/hooks/useSportigoData";
import useCourseInputs from "@/hooks/useCourseInputs";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReservationIDCourse() {

  const { sportigoData, isFetching, error } = useContext(SportigoContext);
  const { courseInputs, addCourseInput } = useCourseInputs(sportigoData);

  if (isFetching) return <Skeleton className="w-full h-12" />;

  if (error) return <p>Une erreur est survenue</p>;

  return (
    <div className="flex flex-col gap-3">
      <h2>Cours à réserver</h2>
      <div className="flex flex-row gap-3 flex-wrap">
        {courseInputs}
        <Button variant="secondary" className="w-full" onClick={addCourseInput}>
          Ajouter des cours
        </Button>
      </div>
    </div>
  );
}

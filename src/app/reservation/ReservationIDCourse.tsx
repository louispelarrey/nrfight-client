import useCourseInputs from "@/hooks/useComboboxValues";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext, useMemo } from "react";
import transformSportigoDataToEvent from "@/lib/transform-sportigo-data-to-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesInput from "@/components/ui/courses-input";
import { Button } from "@/components/ui/button";
import { SportigoRoom } from "@/enums/sportigo-room";

export default function ReservationIDCourse() {
  const {
    reservedCourses,
    handleReservationChange,
    deleteReservation,
    addReservation,
  } = useCourseInputs();

  const { sportigoData, setRoom } = useContext(SportigoContext);

  const courses = useMemo(() => {
    if (!sportigoData) return;
    return transformSportigoDataToEvent(sportigoData);
  }, [sportigoData]);

  return (
    <div className="flex flex-col gap-3">
      <h2>Cours à réserver</h2>
      <Tabs defaultValue="republique">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="republique"
            onClick={() => setRoom(SportigoRoom.REPUBLIQUE)}
          >
            République
          </TabsTrigger>
          <TabsTrigger
            value="tolbiac"
            onClick={() => setRoom(SportigoRoom.TOLBIAC)}
          >
            Tolbiac
          </TabsTrigger>
          <TabsTrigger
            value="olympiades"
            onClick={() => setRoom(SportigoRoom.OLYMPIADES)}
          >
            Olympiades
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="republique"
          className="flex flex-row gap-3 flex-wrap"
        >
          {reservedCourses.map((reservedCourses, index) => (
            <CoursesInput
              value={reservedCourses}
              handleValueChange={handleReservationChange}
              courses={courses}
              key={index}
              removeComboboxValue={() => deleteReservation(index)}
              index={index}
            />
          ))}
          <Button
            variant="secondary"
            className="w-full"
            onClick={addReservation}
          >
            Ajouter des cours
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import useCourseInputs from "@/hooks/useComboboxValues";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext, useMemo } from "react";
import transformSportigoDataToEvent from "@/lib/transform-sportigo-data-to-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseInput, { ICourse } from "@/components/ui/course-input";
import { Button } from "@/components/ui/button";
import { SportigoRoom } from "@/enums/sportigo-room";
import CoursesInputs from "@/components/ui/courses-input";

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
    <div className="flex flex-col">
      <h2 className="text-md mb-4">Cours à réserver</h2>
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
          <CoursesInputs
            reservedCourses={reservedCourses}
            handleReservationChange={handleReservationChange}
            deleteReservation={deleteReservation}
            addReservation={addReservation}
            courses={courses}
          />
        </TabsContent>
        <TabsContent value="tolbiac" className="flex flex-row gap-3 flex-wrap">
          <CoursesInputs
            reservedCourses={reservedCourses}
            handleReservationChange={handleReservationChange}
            deleteReservation={deleteReservation}
            addReservation={addReservation}
            courses={courses}
          />
        </TabsContent>
        <TabsContent
          value="olympiades"
          className="flex flex-row gap-3 flex-wrap"
        >
          <CoursesInputs
            reservedCourses={reservedCourses}
            handleReservationChange={handleReservationChange}
            deleteReservation={deleteReservation}
            addReservation={addReservation}
            courses={courses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

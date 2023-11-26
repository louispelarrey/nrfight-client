import useCourseInputs from "@/hooks/use-combobox-values";
import { SportigoContext } from "@/providers/sportigo-data-provider";
import React, { useContext, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseInput, { ICourse } from "@/components/ui/course-input";
import { Button } from "@/components/ui/button";
import { SportigoRoom } from "@/enums/sportigo-room";
import { ReservedCourse } from "@/providers/filter-provider";
import { SportigoPlanningData } from "@/hooks/use-sportigo-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReservationIDCourse() {

  const {
    reservedCourses,
    handleReservationChange,
    deleteReservation,
    addReservation,
  } = useCourseInputs();
  const { sportigoData, setRoom } = useContext(SportigoContext);

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
        {Object.entries(SportigoRoom).map(([key, value]) => (
          <TabsContent
            key={key}
            value={key.toLowerCase()}
            className="flex flex-row gap-3 flex-wrap"
          >
            <CoursesInputs
              sportigoData={sportigoData}
              room={value}
              reservedCourses={reservedCourses[value]}
              handleReservationChange={handleReservationChange}
              deleteReservation={deleteReservation}
              addReservation={addReservation}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ICoursesInputs {
  sportigoData?: SportigoPlanningData;
  room: SportigoRoom;
  reservedCourses: ReservedCourse[];
  handleReservationChange: (location: SportigoRoom, value: string, startDate: string, index: number) => void;
  deleteReservation: (location: SportigoRoom, index: number) => void;
  addReservation: (location: SportigoRoom) => void;
}

function CoursesInputs({
  sportigoData,
  room,
  reservedCourses,
  handleReservationChange,
  deleteReservation,
  addReservation,
}: ICoursesInputs) {

  if(!sportigoData) return <Skeleton className="w-full md:h-12 h-20" />

  return (
    <>
      {reservedCourses.map((reservedCourse, index) => (
        <CourseInput
          value={reservedCourse.sportigoId}
          handleValueChange={(value, startDate) => handleReservationChange(room, value, startDate, index)}
          sportigoData={sportigoData}
          key={index}
          removeComboboxValue={() => deleteReservation(room, index)}
        />
      ))}
      <Button variant="secondary" className="w-full" onClick={() => addReservation(room)}>
        Ajouter des cours
      </Button>
    </>
  );
}

import useCourseInputs from "@/hooks/useComboboxValues";
import { SportigoContext } from "@/providers/SportigoDataProvider";
import React, { useContext, useMemo } from "react";
import transformSportigoDataToEvent from "@/lib/transform-sportigo-data-to-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseInput, { ICourse } from "@/components/ui/course-input";
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
            value={key.toLowerCase()}
            className="flex flex-row gap-3 flex-wrap"
          >
            <CoursesInputs
              reservedCourses={reservedCourses[value]}
              handleReservationChange={handleReservationChange}
              deleteReservation={deleteReservation}
              addReservation={addReservation}
              courses={courses}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ICoursesInputs {
  courses?: ICourse[];
  reservedCourses: string[];
  handleReservationChange: (location: SportigoRoom, value: string, index: number) => void;
  deleteReservation: (location: SportigoRoom, index: number) => void;
  addReservation: (location: SportigoRoom) => void;
}

function CoursesInputs({
  courses,
  reservedCourses,
  handleReservationChange,
  deleteReservation,
  addReservation,
}: ICoursesInputs) {
  const { room } = useContext(SportigoContext);

  return (
    <>
      {reservedCourses.map((reservedCourses, index) => (
        <CourseInput
          value={reservedCourses}
          handleValueChange={(value) => handleReservationChange(room, value, index)}
          courses={courses}
          key={index}
          removeComboboxValue={() => deleteReservation(room, index)}
          index={index}
        />
      ))}
      <Button variant="secondary" className="w-full" onClick={() => addReservation(room)}>
        Ajouter des cours
      </Button>
    </>
  );
}

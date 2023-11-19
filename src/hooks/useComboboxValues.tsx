import { SportigoRoom } from "@/enums/sportigo-room";
import { FilterContext } from "@/providers/FilterProvider";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";
import { useContext, useEffect, useState } from "react";

export default function useComboboxValues() {

  const {reservations} = useContext(RetreivedReservationsContext);
  const {reservedCourses, setReservedCourses} = useContext(FilterContext);

  const handleReservationChange = (location: SportigoRoom, value: string, startDate: string, index: number) => {
    const updatedCourses = { ...reservedCourses };
    updatedCourses[location] = [...updatedCourses[location]];
    updatedCourses[location][index].sportigoId = value;
    updatedCourses[location][index].startDate = startDate;
    setReservedCourses(updatedCourses);
  };

  const deleteReservation = (location: SportigoRoom, index: number) => {
    const updatedCourses = { ...reservedCourses };
    updatedCourses[location] = [...updatedCourses[location]];
    updatedCourses[location].splice(index, 1);
    setReservedCourses(updatedCourses);
  };

  const addReservation = (location: SportigoRoom) => { 
    const updatedCourses = { ...reservedCourses };
    updatedCourses[location] = [...updatedCourses[location], {sportigoId: "", startDate: ""}];
    setReservedCourses(updatedCourses);
  };


  useEffect(() => {
    if (!reservations?.reservedCourses || reservations?.reservedCourses.length === 0) return;
    setReservedCourses({ ...reservedCourses, [SportigoRoom.REPUBLIQUE]: reservations.reservedCourses });
  }, [reservations?.reservedCourses]);

  return { reservedCourses, handleReservationChange, deleteReservation, addReservation };
}

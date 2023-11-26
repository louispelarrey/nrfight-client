import { SportigoRoom } from "@/enums/sportigo-room";
import { FilterContext } from "@/providers/filter-provider";
import { RetreivedReservationsContext } from "@/providers/retreived-reservations-provider";
import { useContext, useEffect, useState } from "react";

export default function useComboboxValues() {

  const {retreivedReservations} = useContext(RetreivedReservationsContext);
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
    if (!retreivedReservations?.reservedCourses || retreivedReservations?.reservedCourses.length === 0) return;
    setReservedCourses({ ...reservedCourses, ...retreivedReservations.reservedCourses });
  }, [retreivedReservations?.reservedCourses]);

  return { reservedCourses, handleReservationChange, deleteReservation, addReservation };
}

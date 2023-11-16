import { SportigoRoom } from "@/enums/sportigo-room";
import { FilterContext } from "@/providers/FilterProvider";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";
import { useContext, useEffect, useState } from "react";

export default function useComboboxValues() {

  const {reservations} = useContext(RetreivedReservationsContext);
  const {reservedCourses, setReservedCourses} = useContext(FilterContext);

  const handleReservationChange = (location: SportigoRoom, value: string, index: number) => {
    const updatedCourses = { ...reservedCourses };
    updatedCourses[location] = [...updatedCourses[location]];
    updatedCourses[location][index] = value;
    console.log(location, value, index);
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
    updatedCourses[location] = [...updatedCourses[location], ""];
    setReservedCourses(updatedCourses);
  };


  useEffect(() => {
    if (!reservations?.reservedCourses || reservations?.reservedCourses.length === 0) return;

    // You'll need to adjust this to correctly update the appropriate location's reservations
    // For example, if `reservations.reservedCourses` contains data for multiple locations
    // you'll need to segregate and set them appropriately.
    const reservationsIds = reservations.reservedCourses.map((reservation) => reservation.sportigoId);
    // Example for one location - you'll need to extend this for all locations
    setReservedCourses({ ...reservedCourses, [SportigoRoom.REPUBLIQUE]: reservationsIds });
  }, [reservations?.reservedCourses]);


  return { reservedCourses, handleReservationChange, deleteReservation, addReservation };
}

import { FilterContext } from "@/providers/FilterProvider";
import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";
import { useContext, useEffect, useState } from "react";

export default function useComboboxValues() {

  const {reservations} = useContext(RetreivedReservationsContext);
  const {reservedCourses, setReservedCourses} = useContext(FilterContext);

  const handleReservationChange = (value: string, index: number) => {
    const updatedValues = [...reservedCourses];
    updatedValues[index] = value;
    setReservedCourses(updatedValues);
  };

  const deleteReservation = (index: number) => {
    const updatedValues = [...reservedCourses];
    updatedValues.splice(index, 1);
    setReservedCourses(updatedValues);
  };

  const addReservation = () => { 
    const newValues = reservedCourses.length === 0 ? [""] : [...reservedCourses, ""];
    setReservedCourses(newValues);
  };

  useEffect(() => {
    if (!reservations?.reservedCourses || reservations?.reservedCourses.length === 0) return;

    const reservationsIds = reservations.reservedCourses.map((reservation) => reservation.sportigoId);
    setReservedCourses(reservationsIds);
  }, [reservations?.reservedCourses]);

  return { reservedCourses, handleReservationChange, deleteReservation, addReservation };
}

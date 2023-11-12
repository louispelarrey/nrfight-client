"use client";

import { RetreivedReservationsContext } from "@/providers/RetreivedReservationsProvider";
import { useContext, useEffect, useState } from "react";
export default function useComboboxValues() {

  const [comboboxValues, setComboboxValues] = useState<string[]>([]);
  const {reservations} = useContext(RetreivedReservationsContext);

  const handleComboboxValueChange = (value: string, index: number) => {
    const updatedValues = [...comboboxValues];
    updatedValues[index] = value;
    setComboboxValues(updatedValues);
  };

  const removeComboboxValue = (index: number) => {
    const updatedValues = [...comboboxValues];
    updatedValues.splice(index, 1);
    setComboboxValues(updatedValues);
  };

  const addComboboxValue = () => { 
    const newValues = comboboxValues.length === 0 ? [""] : [...comboboxValues, ""];
    setComboboxValues(newValues);
  };

  useEffect(() => {
    if (!reservations) return;
    const reservationsIds = reservations.reservedCourses.map((reservation) => reservation.sportigoId);
    setComboboxValues(reservationsIds);
  }, [reservations]);

  return { comboboxValues, addComboboxValue, handleComboboxValueChange, removeComboboxValue };
}

"use client"

import { Button } from "@/components/ui/button";
import useDateExcluder from "@/hooks/useDateExcluder";

export default function ReservationExcludeDays() {

  const { excludedDaysPickers, addExcludedDayPicker } = useDateExcluder();
    
  return (
    <div className="flex flex-col gap-3">
      <h2>Prendre des vacances (jours où aucune réservation ne compte)</h2>
      {excludedDaysPickers}
      <Button variant="secondary" onClick={addExcludedDayPicker}>
        Ajouter des jours à exclure
      </Button>
    </div>
  );
}

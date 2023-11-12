import { Button } from "@/components/ui/button";
import ExcludedDayPicker from "@/components/ui/excluded-day-picker";
import useDateExcluder from "@/hooks/useExcludedDates";

export default function ReservationExcludeDays() {

  const { excludedDates, handleDateChange, addDate, removeDate } = useDateExcluder();
  
  return (
    <div className="flex flex-col gap-3">
      <h2>Prendre des vacances (jours où aucune réservation ne compte)</h2>
      {excludedDates.map((dateRange, index) => (
        <ExcludedDayPicker
          key={index}
          value={dateRange}
          index={index}
          handleDateChange={handleDateChange}
          removeDate={removeDate}
        />
      ))}
      <Button variant="secondary" onClick={addDate}>
        Ajouter des jours à exclure
      </Button>
    </div>
  );
}

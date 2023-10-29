import { Button } from "@/components/ui/button";

interface ReservationExcludeDaysProps {
  excludedDaysPickers: React.ReactNode[];
  addExcludedDayPicker: () => void;
}
export default function ReservationExcludeDays({
  excludedDaysPickers,
  addExcludedDayPicker,
}: ReservationExcludeDaysProps) {
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

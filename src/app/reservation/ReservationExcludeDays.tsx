import { Button } from '@/components/ui/button';

interface ReservationExcludeDaysProps {
    excludedDaysPickers: React.ReactNode[];
    addExcludedDayPicker: () => void;
}
export default function ReservationExcludeDays({ excludedDaysPickers, addExcludedDayPicker }: ReservationExcludeDaysProps) {
    return (
        <div className="flex flex-col gap-3">
          <h2>Jours à exclure</h2>
          {excludedDaysPickers}
          <Button
            variant="secondary"
            className="w-1/3"
            onClick={addExcludedDayPicker}
          >
            Ajouter des jours à exclure
          </Button>
        </div>
    )
}
import { Separator } from "@/components/ui/separator";
import ReservationIDCourse from "./ReservationIDCourse";
import ReservationExcludeDays from "./ReservationExcludeDays";
import ReservationResults from "./ReservationResults";
import { Protected } from "@/security/protected";
import ReservationSave from "./ReservationSave";

export default function Reservation() {

  return (
    <Protected>
      <>
        <h1 className="text-5xl font-bold tracking-tight p-2 m-6 text-center">
          NRFight Better Reservation
        </h1>

        <div className="flex flex-col gap-8 m-8">
          <ReservationIDCourse />
          <Separator />
          <ReservationExcludeDays />
          <Separator />
          <ReservationResults />
          <Separator />
          <ReservationSave />
        </div>
      </>
    </Protected>
  );
}

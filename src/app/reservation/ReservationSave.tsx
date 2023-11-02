"use client"

import { Button } from "@/components/ui/button";
import useSendFiltersToServer from "@/hooks/useSendFiltersToServer";

export default function ReservationSave() {
  const sendToServer = useSendFiltersToServer();
  

  return (
    <Button variant="secondary" onClick={sendToServer}>
      Sauvegarder
    </Button>
  );
}

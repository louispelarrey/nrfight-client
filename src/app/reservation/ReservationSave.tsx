"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import useSendFiltersToServer from "@/hooks/useSendFiltersToServer";

export default function ReservationSave() {
  const { sendToServer, isLoading } = useSendFiltersToServer();

  return (
    <Button disabled={isLoading} variant="secondary" onClick={sendToServer}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Sauvegarder
    </Button>
  );
}

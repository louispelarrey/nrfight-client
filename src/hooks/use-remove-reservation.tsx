import { UserContext } from "@/providers/user-provider";
import { useContext } from "react";
import useToken from "./use-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRemoveReservation() {
  const { token, logout } = useToken();
  const { sportigoUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const removeReservation = useMutation({
    mutationFn: ({ idActivity }: { idActivity: number }) => {
      return fetch(`/api/reservation/${idActivity}`, {
        method: "DELETE",
        body: JSON.stringify(sportigoUser),
        headers: {
          "Content-Type": "application/json",
          "Sportigo-Token": token || "",
        },
      });
    },
    onSuccess: (data) => {
      switch (data.status) {
        case 200:
          queryClient.invalidateQueries({ queryKey: ["member"] });
          toast.success("Réservation supprimée");
          break;
        case 401:
          logout();
          break;
        default:
          toast.error("Erreur lors de la suppression de la réservation");
      }
    },
    onError: () => {
      toast.error("Erreur lors de la sauvegarde des données");
    },
  });

  return removeReservation;
}

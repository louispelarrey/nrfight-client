import { useContext } from "react";
import { UserContext } from "@/providers/user-provider";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import DeleteButton from "@/components/ui/delete-button";
import useRemoveReservation from "@/hooks/use-remove-reservation";

export default function ReservationFuture() {
  const { sportigoUser } = useContext(UserContext);
  const removeReservation = useRemoveReservation();

  return (
    <>
      <h2>Cours actuellement réservés</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cours</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Supprimer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sportigoUser?.member.reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.roomName} | {reservation.description}
              </TableCell>
              <TableCell>
                {new Date(reservation.dateStart).toLocaleDateString()} {""}
                {new Date(reservation.dateStart).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                <DeleteButton
                  removeFunction={
                    () => removeReservation.mutate({ idActivity: reservation.id })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

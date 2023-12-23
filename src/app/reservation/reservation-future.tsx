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

export default function ReservationFuture() {
  const { sportigoUser } = useContext(UserContext);

  return (
    <>
      <h2>Cours actuellement réservés</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Salle</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sportigoUser?.member.reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.roomName}</TableCell>
              <TableCell>{reservation.description}</TableCell>
              <TableCell>
                {new Date(reservation.dateStart).toLocaleDateString()} {""}
                {new Date(reservation.dateStart).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

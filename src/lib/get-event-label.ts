import { Event } from "@/hooks/useSportigoData";

export default function getEventLabel(event: Event) {
  const date = new Date(event.startDate);
  const day = date.toLocaleDateString("fr-FR", { weekday: "long" });
  let time = date.toLocaleTimeString("fr-FR", {
    hour: '2-digit',
    minute: '2-digit',
  });
  time = time.replace(":", "h");

  return `${event.name} | Tous les ${day} à ${time}`;
}

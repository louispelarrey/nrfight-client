import { SportigoPlanningData } from "@/hooks/useSportigoData"

export async function GET() {
  const res = await fetch("https://nrfight.app.sportigo.fr/api/sportigo/planning?room=160", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SPORTIGO_TOKEN}`,
    },
  })
  const data: any = await res.json()

  data.events.rows.map((event: any) => {
    event.name = data.resources.rows.find((resource: any) => resource.id === event.resourceId)?.name + " " + event.name
  })    

  return Response.json({ data })
}

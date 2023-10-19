// export default async function getPlanningFromApi() {
//   return fetch("https://nrfight.app.sportigo.fr/api/sportigo/planning?room=160", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPORTIGO_TOKEN}`,
//     },
//     body: JSON.stringify({
//       type: "load",
//       requestId: 16961044964550,
//       date: "2023-10-02",
//       stores: ["events", "resources", "assignments", "dependencies"],
//     }),
//   }).then((res) => res.json());
// }

export async function GET() {
  const res = await fetch("https://nrfight.app.sportigo.fr/api/sportigo/planning?room=160", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SPORTIGO_TOKEN}`,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}

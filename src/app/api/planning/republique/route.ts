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

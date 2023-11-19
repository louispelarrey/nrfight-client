export async function GET(request: Request): Promise<Response> {
  const roomParam = new URL(request.url).searchParams.get("room");
  const res = await fetch(
    `https://nrfight.app.sportigo.fr/api/sportigo/planning?room=${roomParam}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPORTIGO_TOKEN}`,
      },
    }
  );
  const data = await res.json();

  data.events.rows.map((event: any) => {
    event.name =
      data.resources.rows.find(
        (resource: any) => resource.id === event.resourceId
      )?.name +
      " " +
      event.name;
  });

  return Response.json({ data });
}

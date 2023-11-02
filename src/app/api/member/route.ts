export async function POST(request: Request): Promise<Response> {
  try {
    const {token}: {token: string} = await request.json();

    const res = await fetch(
      "https://nrfight.app.sportigo.fr/api/sportigo/member",
      {
        method: "GET",
        headers: { "Sportigo-Token": token },
      }
    );

    const data = await res.json();

    if(data.code === 4003) return new Response('Not Connected', {status: 401})

    return new Response('Connected', {status: 200})
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

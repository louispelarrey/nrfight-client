export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    const res = await fetch(
      "https://nrfight.app.sportigo.fr/api/sportigo/member/auth/generic",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

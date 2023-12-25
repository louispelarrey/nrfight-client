export async function DELETE(request: Request, {params}: {params: {slug: string}}): Promise<Response> {
  try {
    const res = await fetch(`https://nrfight.app.sportigo.fr/api/sportigo/reservation/${params.slug}`, {
      body: JSON.stringify(request.body),
      headers: {
        "Content-Type": "application/json",
        "Sportigo-Token": `${request.headers.get("Sportigo-Token")}`,
      },
      method: "DELETE",
    });
    return new Response(JSON.stringify(await res.json()), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}
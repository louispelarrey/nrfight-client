import getUserByToken from "./_get-user/get-user-by-token";

export async function POST(request: Request): Promise<Response> {
  try {
    const {token}: {token: string} = await request.json();

    const data = await getUserByToken(token);

    if(data.code === 4003) return new Response('Not Connected', {status: 401})

    return new Response('Connected', {status: 200})
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

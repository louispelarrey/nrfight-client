import cronTaskReserve from "./_utils/cron-task-reserve";

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  try {
    const data = await cronTaskReserve();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Surrogate-Control": "no-store",
        cache: "no-cache",
      },
    });
  } catch (error) {
    console.log("API ERROR /cron/reserve", error);

    return new Response("error" + error, { status: 500 });
  }
}

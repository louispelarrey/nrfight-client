export default async function sportigoLogin(email: string, password: string) {
  const res = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/member/auth/generic",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json",
      'Vercel-CDN-Cache-Control': 'max-age=0',
      'CDN-Cache-Control': 'max-age=0',
      cache: "no-cache",
      'Cache-Control': 'no-cache',
     },
      cache: "no-cache",
      next: { revalidate: 0 },
    }
  );

  return await res.json();
}

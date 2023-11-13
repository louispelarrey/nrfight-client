export default async function sportigoLogin(email: string, password: string) {
  const res = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/member/auth/generic",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        //generate a random string
        device: Math.random().toString(36).substring(7),
      }),
      cache: "no-cache",
    }
  );

  return await res.json();
}

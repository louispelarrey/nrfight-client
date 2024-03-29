import { SportigoUser } from "../../member/_get-user/get-user-by-token";

export default async function sportigoLogin(email: string, password: string): Promise<SportigoUser> {
  const res = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/member/auth/generic",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  return await res.json();
}

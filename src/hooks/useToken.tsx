import { RedirectType, redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useToken() {
  const [tokenState, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenState || localStorage.getItem("token");
    setTokenState(token);
  }, []);

  const saveToken = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setTokenState(token);
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("token");
    setTokenState("");

    redirect("/login", RedirectType.push);
  }, []);

  return {
    setToken: saveToken,
    token: tokenState,
    logout: removeToken,
  };
}

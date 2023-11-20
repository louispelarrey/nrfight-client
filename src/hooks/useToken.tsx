import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export default function useToken() {
  const [tokenState, setTokenState] = useState<string | null>(null);

  useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      const res = await fetch("/api/member", {
        method: "POST",
        body: JSON.stringify({ token: tokenState }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) removeToken();

      return res.json();
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!tokenState,
    retry: false,
  });

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
  }, []);

  return {
    setToken: saveToken,
    token: tokenState,
    logout: removeToken,
  };
}

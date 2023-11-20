"use client";

import useToken from "@/hooks/useToken";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useToken();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <></>
  );
}

"use client";

import useToken from "@/hooks/useToken";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useToken();

  useEffect(() => {
    logout();

    redirect("/login");
  }, [logout]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

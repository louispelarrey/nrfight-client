"use client";

import useToken from "@/hooks/useToken";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Logout() {
  const { token, logout } = useToken();
  const router = useRouter();
  

  useEffect(() => {
    logout();
    router.push("/login");
  }, [token]);

  return (
    <></>
  );
}

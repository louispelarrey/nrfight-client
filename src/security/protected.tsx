import { useContext } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "@/providers/UserProvider";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected = ({ children }: ProtectedProps) => {
  const { token } = useContext(UserContext);

  if (!token) redirect("/login");
  return children;
};
import { useContext } from "react";
import { RedirectType, redirect } from "next/navigation";
import { UserContext } from "@/providers/user-provider";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected = ({ children }: ProtectedProps) => {
  const { token } = useContext(UserContext);

  if (!token || !localStorage.getItem("token")) redirect("/login", RedirectType.push);
  return children;
};
"use client"

import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "@/providers/UserProvider";
import { redirect, RedirectType } from "next/navigation";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import InputField from "@/components/ui/input-field";
import { SportigoUser } from "../api/member/_get-user/get-user-by-token";

interface LoginData {
  email: string;
  password: string;
}

export function UserAuthForm() {
  const [ isLoading, setIsLoading ] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const { register, handleSubmit } = useForm<LoginData>();

  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      redirect("/reservation", RedirectType.push);
    }
  }, [token]);

  const onSubmit = async ({ email, password }: LoginData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: SportigoUser = await response.json();

      if (response.ok && data.member?.appToken) {
        setToken(data.member.appToken);
        return;
      } 

      throw new Error("Email ou mot de passe incorrect");
    } catch (error: any) {
      toast.error("Email ou mot de passe incorrect");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <InputField label="Email" type="email" register={register} isLoading={isLoading} />
          <InputField label="Mot de passe" type="password" register={register} isLoading={isLoading} />
          <Button disabled={isLoading} type="submit">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </div>
      </form>
    </div>
  );
}
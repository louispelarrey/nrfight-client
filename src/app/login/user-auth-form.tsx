"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { UserContext } from "@/providers/UserProvider";
import { RedirectType, redirect } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<LoginData>();
  const [error, setError] = useState("");
  const { token, setToken } = useContext(UserContext);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // now we know we are on the client
  }, []);

  const onSubmit = async ({ email, password }: LoginData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.status !== 200 || !data) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      if (data.member.appToken) {
        setToken(data.member.appToken);
        redirect("/reservation", RedirectType.push);
      }

    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  if (token || (isClient && localStorage.getItem("token"))) redirect("/reservation", RedirectType.push);

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              className="text-sm font-medium text-muted-foreground"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="test@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />

            <Label
              className="mt-2 text-sm font-medium text-muted-foreground"
              htmlFor="password"
            >
              Mot de passe
            </Label>
            <Input
              id="password"
              placeholder="Mot de passe"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Se connecter
          </Button>
        </div>
      </form>
    </div>
  );
}

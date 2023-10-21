import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "./user-auth-form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative h-[100vh] flex flex-col items-center justify-center lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight">
                Bienvenue
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez l'email et le mot de passe que vous utilisez pour vous
                connecter à l'application Sportigo NRFight (vos identifiants de
                connexion ne sont <b>PAS</b> conservés par ce site)
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              En cliquant sur continuer, vous aggréez à nos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions d'utilisation
              </Link>{" "}
              et{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

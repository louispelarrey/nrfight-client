import Link from "next/link";
import { Button } from "./button";

export default function AppHeader() {
  return (
    <header className="flex items-center h-16 px-4 border-b border-gray-700 shrink-0 md:px-6">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <span
            className="text-xl
       font-bold text-gray-100"
          >
            NRFight Reservation
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Link href="/logout">
            Déconnexion
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

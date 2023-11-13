import type { Metadata } from "next";
import "./globals.css";

import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NRFight Client",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import Header from "@/components/Header/Header";
import SideNav from "@/components/SideNav/SideNav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Providers from "@/providers/providers";
import MobileNav from "@/components/MobileNav/MobileNav";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { VenetianMask } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-full flex-col">
              <Header actionButton={<Button onClick={() => router.push('/')} variant="default" size="default" className="font-bold">Área VIP<VenetianMask className="ml-2" /></Button>} />

              <div className="mx-auto flex w-full min-h-[calc(100vh-129px)] max-w-full items-start gap-x-8 px-2 py-4 sm:px-6 lg:px-8 h-full">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

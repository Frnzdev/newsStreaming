// app/layout.tsx
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import Header from "../components/Header";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConectaNotícias",
  description: "WebSite de notícias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

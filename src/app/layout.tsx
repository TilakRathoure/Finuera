import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DarkModeProvider from "@/lib/darkmode";
import Header from "@/components/home/Header";
import VedAI from "@/components/chatbot/VedAI";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-comfortaa",
  display: "swap", 
});

export const metadata: Metadata = {
  title: "Finuera",
  description: "Your Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${comfortaa.className} font-sans`}
        style={{ fontFamily: `"Comfortaa", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif` }}
      >
        <DarkModeProvider>
          <Header />
          <VedAI />
          {children}
        </DarkModeProvider>
        <Toaster position="bottom-center" offset="50px" />
      </body>
    </html>
  );
}

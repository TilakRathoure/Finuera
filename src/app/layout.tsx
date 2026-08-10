import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DarkModeProvider from "@/providers/dark-mode";
import Header from "@/components/home/Header";
import VedAI from "@/components/chatbot/VedAI";
import { Analytics } from "@vercel/analytics/next";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finuera",
  description: "Your Finance Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="dark scroll-smooth"
    >
      <body className={`${comfortaa.variable} font-sans antialiased`}>
        <DarkModeProvider>
          <Header />
          <VedAI />
          {children}
        </DarkModeProvider>
        <Toaster position="bottom-center" offset="50px" />
        <Analytics />
      </body>
    </html>
  );
}

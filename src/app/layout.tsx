import type { Metadata } from "next";
import {Comfortaa} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DarkModeProvider from "@/lib/darkmode";
import Header from "@/components/home/Header";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: 'variable',
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Finuera",
  description: "You Finance ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${comfortaa.className}`}
      >
        <Header/>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
        <Toaster position="bottom-center"/>
      </body>
    </html>
  );
}

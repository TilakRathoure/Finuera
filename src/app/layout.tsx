import type { Metadata } from "next";
import { Inter, Geist_Mono,Comfortaa,} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DarkModeProvider from "@/lib/darkmode";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.className} antialiased`}
      >
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
        <Toaster position="bottom-center"/>
      </body>
    </html>
  );
}

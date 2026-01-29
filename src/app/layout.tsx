import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DocumentosModals from "@/components/DocumentosModals";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo con el Pueblo - Dr. Nicolás Bustamante Coronado",
  description: "Partido político Todo con el Pueblo (TCP). Secretario General: Dr. Nicolás Bustamante Coronado. Trabajando por un Perú justo y solidario.",
  keywords: ["Todo con el Pueblo", "TCP", "Nicolás Bustamante", "partido político", "Perú"],
  icons: {
    icon: "/tcp.ico",
    shortcut: "/tcp.ico",
    apple: "/tcp.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/tcp.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <DocumentosModals />
      </body>
    </html>
  );
}

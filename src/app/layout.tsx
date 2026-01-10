import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo con el Pueblo - Dr. Nicolás Bustamante Coronado",
  description: "Partido político Todo con el Pueblo (TCP). Secretario General: Dr. Nicolás Bustamante Coronado. Trabajando por un Perú justo y solidario.",
  keywords: ["Todo con el Pueblo", "TCP", "Nicolás Bustamante", "partido político", "Perú"],
  icons: {
    icon: "/images/logos/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

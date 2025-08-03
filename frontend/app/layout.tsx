import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({subsets: ['latin']});

export const metadata: Metadata = {
  title: "POS - Seguridad Civica",
  description: "POS - Seguridad Civica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Aep & Pasangan | The Wedding Of",
  description: "Digital wedding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-body bg-paper text-teal-900 antialiased selection:bg-teal-800 selection:text-white relative overflow-x-hidden`}
      >
        {/* Global base textures */}
        <div className="fixed inset-0 pointer-events-none -z-50 bg-watercolor-gradient"></div>
        <div className="fixed inset-0 pointer-events-none -z-40 bg-gold-texture bg-cover bg-center opacity-30 mix-blend-multiply block"></div>
        {children}
      </body>
    </html>
  );
}

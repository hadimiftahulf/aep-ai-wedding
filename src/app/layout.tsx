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
  title: "The Wedding of Aep & Ai Rosita",
  description: "Official Digital Wedding Invitation of Aep & Ai Rosita 💍✨",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "A&A Wedding",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.png?v=7",
    apple: "/images/couple-chibi.png?v=7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-body bg-paper text-navy-900 antialiased selection:bg-navy-800 selection:text-white relative overflow-x-hidden`}
      >
        {/* Global base textures */}
        <div className="fixed inset-0 pointer-events-none -z-50 bg-watercolor-gradient"></div>
        <div className="fixed inset-0 pointer-events-none -z-40 bg-gold-texture bg-cover bg-center opacity-30 mix-blend-multiply block"></div>
        {children}
      </body>
    </html>
  );
}

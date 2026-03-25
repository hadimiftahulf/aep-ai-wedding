import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aep&Ai Wedding Admin",
  manifest: "/manifest-admin.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/images/couple-chibi.png",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

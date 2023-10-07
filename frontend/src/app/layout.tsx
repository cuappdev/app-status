import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Status | Cornell AppDev",
  description:
    "View the app statuses and histories for all of Cornell AppDev's mobile apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <title>Status | Cornell AppDev</title>
      <link rel="icon" type="image/x-icon" href="./favicon.ico" />
    </html>
  );
}

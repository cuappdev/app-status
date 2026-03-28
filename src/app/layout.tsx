import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Status | Cornell AppDev',
  description:
    "View the app statuses and histories for all of Cornell AppDev's apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

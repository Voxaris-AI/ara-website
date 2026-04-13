import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ara Website",
  description: "Blank starter page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

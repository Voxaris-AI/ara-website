import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ara - AI Clinic Receptionist",
  description:
    "Meet Ara. Your 24/7 Patient Concierge. Ara handles patient calls, books appointments, and answers queries instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/assets/favicon.png" type="image/svg+xml" />
      </head>
      <body className={`${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

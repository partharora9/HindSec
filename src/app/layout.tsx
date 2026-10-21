import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Securio — Cybersecurity services for a new era of risk",
  description: "Protect your business from cyber threats. Securio delivers next-generation cybersecurity services for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#02030a] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

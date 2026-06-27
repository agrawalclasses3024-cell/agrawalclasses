import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agrawal Classes by CA Nidhi Agrawal | Commerce Coaching",
  description:
    "Expert Commerce coaching for Class 11, 12 & B.Com by CA Nidhi Agrawal. Live classes, recorded courses, and face-to-face batches. Join India's trusted Commerce educator.",
  keywords: [
    "Commerce coaching",
    "CA Nidhi Agrawal",
    "Agrawal Classes",
    "11th 12th Commerce",
    "B.Com coaching",
    "Accounts coaching",
    "online Commerce classes",
  ],
  openGraph: {
    title: "Agrawal Classes by CA Nidhi Agrawal",
    description: "Expert Commerce coaching for Class 11, 12 & B.Com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

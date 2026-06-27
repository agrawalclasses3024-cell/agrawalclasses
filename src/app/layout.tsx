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
  metadataBase: new URL("https://www.classesbycanidhiagrawal.in"),
  title: {
    default: "Agrawal Classes | Best Commerce Coaching in Gopalganj Bihar | CA Nidhi Agrawal",
    template: "%s | Agrawal Classes by CA Nidhi Agrawal",
  },
  description:
    "Best Commerce coaching in Gopalganj Bihar by CA Nidhi Agrawal. Expert teaching for Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Live classes, recorded lectures & face-to-face batches. Bihar Board & BSEB Commerce specialist.",
  keywords: [
    "CA Nidhi Agrawal Gopalganj",
    "CA Nidhi Agarwal Gopalganj",
    "Commerce Classes Gopalganj",
    "Best Commerce Classes Gopalganj",
    "Commerce Coaching Gopalganj",
    "11th Commerce Classes Gopalganj",
    "12th Commerce Classes Gopalganj",
    "Bihar Board Commerce Gopalganj",
    "BSEB Commerce Gopalganj",
    "Online Commerce Classes Gopalganj",
    "Offline Commerce Classes Gopalganj",
    "Commerce Tuition Gopalganj",
    "Accountancy Teacher Gopalganj",
    "Economics Teacher Gopalganj",
    "Business Studies Teacher Gopalganj",
    "Best Commerce Coaching in Gopalganj Bihar",
    "Best Commerce Teacher in Gopalganj",
    "Commerce Coaching Bihar",
    "Commerce Coaching Near Me",
    "11th Commerce Coaching Gopalganj",
    "12th Commerce Coaching Gopalganj",
    "Agrawal Classes",
    "Classes by CA Nidhi Agrawal",
    "Commerce Classes Hathua",
    "Commerce Classes Mirganj",
    "Commerce Classes Barauli",
    "Commerce Classes Thawe",
    "Online Commerce Classes Bihar Board",
    "BSEB 11th Commerce",
    "BSEB 12th Commerce",
  ],
  authors: [{ name: "CA Nidhi Agrawal", url: "https://www.classesbycanidhiagrawal.in/about" }],
  creator: "CA Nidhi Agrawal",
  publisher: "Agrawal Classes",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.classesbycanidhiagrawal.in",
    siteName: "Agrawal Classes by CA Nidhi Agrawal",
    title: "Best Commerce Coaching in Gopalganj | CA Nidhi Agrawal",
    description:
      "Expert Commerce coaching for Class 11, 12 & B.Com in Gopalganj Bihar. Bihar Board specialist — Accountancy, Business Studies, Economics. Join 5000+ students.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Agrawal Classes by CA Nidhi Agrawal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Commerce Coaching in Gopalganj | CA Nidhi Agrawal",
    description: "Expert Commerce coaching for Class 11, 12 & B.Com in Gopalganj Bihar.",
  },
  alternates: {
    canonical: "https://www.classesbycanidhiagrawal.in",
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

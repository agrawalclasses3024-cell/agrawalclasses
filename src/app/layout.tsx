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
    // Primary Brand + Gopalganj
    "CA Nidhi Agrawal Gopalganj", "CA Nidhi Agarwal Gopalganj",
    "Agrawal Classes", "Agrawal Classes Gopalganj", "Classes by CA Nidhi Agrawal",
    "Commerce Classes Gopalganj", "Best Commerce Classes Gopalganj",
    "Commerce Coaching Gopalganj", "Best Commerce Coaching in Gopalganj Bihar",
    "Best Commerce Teacher in Gopalganj",
    "11th Commerce Classes Gopalganj", "12th Commerce Classes Gopalganj",
    "11th Commerce Coaching Gopalganj", "12th Commerce Coaching Gopalganj",
    "Bihar Board Commerce Gopalganj", "BSEB Commerce Gopalganj",
    "Online Commerce Classes Gopalganj", "Offline Commerce Classes Gopalganj",
    "Commerce Tuition Gopalganj", "Accountancy Teacher Gopalganj",
    "Economics Teacher Gopalganj", "Business Studies Teacher Gopalganj",
    "BSEB 11th Commerce", "BSEB 12th Commerce",
    "Online Commerce Classes Bihar Board", "Commerce Coaching Bihar",
    "Commerce Coaching Near Me", "B.Com Coaching Bihar",
    // Nearby areas (Gopalganj district towns)
    "Commerce Classes Hathua", "Commerce Coaching Hathua", "11th 12th Commerce Hathua",
    "Commerce Classes Mirganj", "Commerce Coaching Mirganj", "11th 12th Commerce Mirganj",
    "Commerce Classes Barauli", "Commerce Coaching Barauli", "11th 12th Commerce Barauli",
    "Commerce Classes Thawe", "Commerce Coaching Thawe", "11th 12th Commerce Thawe",
    "Commerce Classes Siwan", "Commerce Coaching Siwan", "11th 12th Commerce Siwan", "Online Commerce Classes Siwan",
    "Commerce Classes Saran", "Commerce Coaching Saran", "11th 12th Commerce Saran", "Online Commerce Classes Saran",
    "Commerce Classes Muzaffarpur", "Commerce Coaching Muzaffarpur", "11th 12th Commerce Muzaffarpur", "Online Commerce Classes Muzaffarpur",
    "Commerce Classes Patna", "Commerce Coaching Patna", "11th 12th Commerce Patna", "Online Commerce Classes Patna",
    // Bihar Districts SEO
    "Commerce Classes Vaishali", "Commerce Coaching Vaishali", "11th 12th Commerce Vaishali", "Online Commerce Classes Vaishali",
    "Commerce Classes Darbhanga", "Commerce Coaching Darbhanga", "11th 12th Commerce Darbhanga", "Online Commerce Classes Darbhanga",
    "Commerce Classes Madhubani", "Commerce Coaching Madhubani", "11th 12th Commerce Madhubani", "Online Commerce Classes Madhubani",
    "Commerce Classes Sitamarhi", "Commerce Coaching Sitamarhi", "11th 12th Commerce Sitamarhi", "Online Commerce Classes Sitamarhi",
    "Commerce Classes East Champaran", "Commerce Coaching East Champaran", "11th 12th Commerce East Champaran", "Online Commerce Classes East Champaran",
    "Commerce Classes West Champaran", "Commerce Coaching West Champaran", "11th 12th Commerce West Champaran", "Online Commerce Classes West Champaran",
    "Commerce Classes Motihari", "Commerce Coaching Motihari", "11th 12th Commerce Motihari", "Online Commerce Classes Motihari",
    "Commerce Classes Hajipur", "Commerce Coaching Hajipur", "11th 12th Commerce Hajipur", "Online Commerce Classes Hajipur",
    "Commerce Classes Samastipur", "Commerce Coaching Samastipur", "11th 12th Commerce Samastipur", "Online Commerce Classes Samastipur",
    "Commerce Classes Begusarai", "Commerce Coaching Begusarai", "11th 12th Commerce Begusarai", "Online Commerce Classes Begusarai",
    "Commerce Classes Munger", "Commerce Coaching Munger", "11th 12th Commerce Munger", "Online Commerce Classes Munger",
    "Commerce Classes Bhagalpur", "Commerce Coaching Bhagalpur", "11th 12th Commerce Bhagalpur", "Online Commerce Classes Bhagalpur",
    "Commerce Classes Gaya", "Commerce Coaching Gaya", "11th 12th Commerce Gaya", "Online Commerce Classes Gaya",
    "Commerce Classes Nalanda", "Commerce Coaching Nalanda", "11th 12th Commerce Nalanda", "Online Commerce Classes Nalanda",
    "Commerce Classes Aurangabad", "Commerce Coaching Aurangabad", "11th 12th Commerce Aurangabad", "Online Commerce Classes Aurangabad",
    "Commerce Classes Nawada", "Commerce Coaching Nawada", "11th 12th Commerce Nawada", "Online Commerce Classes Nawada",
    "Commerce Classes Jehanabad", "Commerce Coaching Jehanabad", "11th 12th Commerce Jehanabad", "Online Commerce Classes Jehanabad",
    "Commerce Classes Arwal", "Commerce Coaching Arwal", "11th 12th Commerce Arwal", "Online Commerce Classes Arwal",
    "Commerce Classes Rohtas", "Commerce Coaching Rohtas", "11th 12th Commerce Rohtas", "Online Commerce Classes Rohtas",
    "Commerce Classes Kaimur", "Commerce Coaching Kaimur", "11th 12th Commerce Kaimur", "Online Commerce Classes Kaimur",
    "Commerce Classes Buxar", "Commerce Coaching Buxar", "11th 12th Commerce Buxar", "Online Commerce Classes Buxar",
    "Commerce Classes Bhojpur", "Commerce Coaching Bhojpur", "11th 12th Commerce Bhojpur", "Online Commerce Classes Bhojpur",
    "Commerce Classes Ara", "Commerce Coaching Ara", "11th 12th Commerce Ara", "Online Commerce Classes Ara",
    "Commerce Classes Khagaria", "Commerce Coaching Khagaria", "11th 12th Commerce Khagaria", "Online Commerce Classes Khagaria",
    "Commerce Classes Supaul", "Commerce Coaching Supaul", "11th 12th Commerce Supaul", "Online Commerce Classes Supaul",
    "Commerce Classes Saharsa", "Commerce Coaching Saharsa", "11th 12th Commerce Saharsa", "Online Commerce Classes Saharsa",
    "Commerce Classes Madhepura", "Commerce Coaching Madhepura", "11th 12th Commerce Madhepura", "Online Commerce Classes Madhepura",
    "Commerce Classes Purnia", "Commerce Coaching Purnia", "11th 12th Commerce Purnia", "Online Commerce Classes Purnia",
    "Commerce Classes Katihar", "Commerce Coaching Katihar", "11th 12th Commerce Katihar", "Online Commerce Classes Katihar",
    "Commerce Classes Araria", "Commerce Coaching Araria", "11th 12th Commerce Araria", "Online Commerce Classes Araria",
    "Commerce Classes Kishanganj", "Commerce Coaching Kishanganj", "11th 12th Commerce Kishanganj", "Online Commerce Classes Kishanganj",
    "Commerce Classes Lakhisarai", "Commerce Coaching Lakhisarai", "11th 12th Commerce Lakhisarai", "Online Commerce Classes Lakhisarai",
    "Commerce Classes Sheikhpura", "Commerce Coaching Sheikhpura", "11th 12th Commerce Sheikhpura", "Online Commerce Classes Sheikhpura",
    "Commerce Classes Jamui", "Commerce Coaching Jamui", "11th 12th Commerce Jamui", "Online Commerce Classes Jamui",
    "Commerce Classes Banka", "Commerce Coaching Banka", "11th 12th Commerce Banka", "Online Commerce Classes Banka",
    "Commerce Classes Sheohar", "Commerce Coaching Sheohar", "11th 12th Commerce Sheohar", "Online Commerce Classes Sheohar",
    // Long-tail conversion keywords
    "Best Commerce Coaching Institute Bihar",
    "Commerce Classes Online Bihar Board BSEB",
    "11th 12th Commerce Topper Batch Bihar",
    "CA Teacher Commerce Classes Bihar",
    "Accountancy Classes Bihar Board",
    "Business Studies Classes Bihar Board",
    "Economics Classes Bihar Board",
    "Commerce Crash Course Bihar Board",
    "12th Commerce 90 percent Bihar Board",
    "BSEB Commerce Topper Strategy",
    "Online Commerce Tuition Bihar",
    "Commerce Home Tutor Bihar",
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

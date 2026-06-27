import type { Metadata } from "next";
import DistrictPage from "@/components/DistrictPage";
import { getDistrict } from "@/lib/districtData";

const district = getDistrict("saran")!;

export const metadata: Metadata = {
  title: district.metaTitle,
  description: district.metaDescription,
  keywords: district.keywords,
  alternates: { canonical: "https://www.classesbycanidhiagrawal.in/saran" },
  openGraph: {
    title: district.metaTitle,
    description: district.metaDescription,
    url: "https://www.classesbycanidhiagrawal.in/saran",
  },
};

export default function SaranPage() {
  return <DistrictPage district={district} />;
}

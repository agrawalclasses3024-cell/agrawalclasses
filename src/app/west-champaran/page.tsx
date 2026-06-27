import type { Metadata } from "next";
import DistrictPage from "@/components/DistrictPage";
import { getDistrict } from "@/lib/districtData";

const district = getDistrict("west-champaran")!;

export const metadata: Metadata = {
  title: district.metaTitle,
  description: district.metaDescription,
  keywords: district.keywords,
  alternates: { canonical: "https://www.classesbycanidhiagrawal.in/west-champaran" },
  openGraph: {
    title: district.metaTitle,
    description: district.metaDescription,
    url: "https://www.classesbycanidhiagrawal.in/west-champaran",
  },
};

export default function WestChamparanPage() {
  return <DistrictPage district={district} />;
}

import type { Metadata } from "next";
import DistrictPage from "@/components/DistrictPage";
import { getDistrict } from "@/lib/districtData";

const district = getDistrict("gopalganj")!;

export const metadata: Metadata = {
  title: district.metaTitle,
  description: district.metaDescription,
  keywords: district.keywords,
  alternates: { canonical: "https://www.classesbycanidhiagrawal.in/gopalganj" },
  openGraph: {
    title: district.metaTitle,
    description: district.metaDescription,
    url: "https://www.classesbycanidhiagrawal.in/gopalganj",
  },
};

export default function GopalganjPage() {
  return <DistrictPage district={district} />;
}

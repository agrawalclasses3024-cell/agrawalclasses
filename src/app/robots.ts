import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/student/dashboard"],
      },
    ],
    sitemap: "https://www.classesbycanidhiagrawal.in/sitemap.xml",
  };
}

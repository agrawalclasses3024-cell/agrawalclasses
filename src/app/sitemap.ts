import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.classesbycanidhiagrawal.in";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/student/register`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/student/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}

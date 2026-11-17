import { MetadataRoute } from "next";
import { ARTICLE_INSIGHTS } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://circulife.abyte.my.id";
  const now = new Date();

  const routes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/galeri", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/lapor", priority: 0.95, changeFrequency: "always" as const },
    { url: "/pantau", priority: 0.85, changeFrequency: "hourly" as const },
    { url: "/edukasi", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/konservasi", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/insight", priority: 0.9, changeFrequency: "weekly" as const },
    // Article pages come from the registry, so a new entry is listed without editing this file.
    ...ARTICLE_INSIGHTS.map((entry) => ({
      url: entry.href,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

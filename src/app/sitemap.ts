import { MetadataRoute } from "next";
import { siteMetadata } from "@/content/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl;

  const routes = [
    "",
    "/services/vulnerability-assessment",
    "/services/penetration-testing",
    "/services/application-security",
    "/about",
    "/certifications",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.8 : 0.6,
  }));
}

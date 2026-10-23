import { MetadataRoute } from "next";
import { siteMetadata } from "@/content/siteContent";
import { serviceCategories } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl;

  const coreRoutes = [
    "",
    "/services",
    "/about",
    "/certifications",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/services/vulnerability-assessment",
    "/services/penetration-testing",
    "/services/application-security",
  ];

  // Auto-generate routes from the single source of truth data file
  const serviceCategoryRoutes = serviceCategories.map(
    (category) => `/services/${category.slug}`
  );

  const allRoutes = [...coreRoutes, ...serviceCategoryRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.8 : 0.6,
  }));
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Main pages
    {
      url: "https://beihunorthernfox.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://beihunorthernfox.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://beihunorthernfox.com/company-details",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://beihunorthernfox.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    
    // Service pages
    {
      url: "https://beihunorthernfox.com/customs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://beihunorthernfox.com/suppliers",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    
    // Legal pages
    {
      url: "https://beihunorthernfox.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://beihunorthernfox.com/cookie-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://beihunorthernfox.com/user-agreement",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
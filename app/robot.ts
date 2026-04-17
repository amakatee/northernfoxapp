import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://beihunorthernfox.com/sitemap.xml",
    host: "https://beihunorthernfox.com",
  };
}
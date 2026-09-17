import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { layouts } from "@/lib/layouts";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(layouts).map(({ path }) => ({ url: new URL(path, SITE_URL).href }));
}

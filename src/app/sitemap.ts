import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { layouts } from "@/lib/layouts";
import { articles, guidesIndex } from "@/content/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...Object.values(layouts), guidesIndex, ...Object.values(articles)]
    .map(({ path }) => ({ url: new URL(path, SITE_URL).href }));
}

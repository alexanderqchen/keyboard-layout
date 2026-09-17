import type { Metadata } from "next";
import { layouts, type LayoutName } from "./layouts";
import { SITE_URL } from "./site";

export function layoutMetadata(layout: LayoutName): Metadata {
  const { title, description, path } = layouts[layout];
  return contentMetadata({ title, description, path });
}

export function contentMetadata(
  { title, description, path }: { title: string; description: string; path: string },
  type: "website" | "article" = "website",
): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: "Keyboard Layout",
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

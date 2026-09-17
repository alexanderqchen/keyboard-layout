import type { Metadata } from "next";
import { layouts, type LayoutName } from "./layouts";
import { SITE_URL } from "./site";

export function layoutMetadata(layout: LayoutName): Metadata {
  const { title, description, path } = layouts[layout];
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Keyboard Layout",
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

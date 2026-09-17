import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import { SITE_URL } from "@/lib/site";
import { layoutMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...layoutMetadata("qwerty"),
  metadataBase: SITE_URL,
  applicationName: "Keyboard Layout",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "WebSite", "name": "Keyboard Layout", "url": SITE_URL.href },
                {
                  "@type": "WebApplication",
                  "name": "Keyboard Layout Simulator",
                  "url": SITE_URL.href,
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Any",
                  "browserRequirements": "Requires JavaScript. Supports physical keyboards and on-screen touch typing.",
                  "isAccessibleForFree": true,
                  "description": "An online keyboard layout simulator for trying QWERTY, Dvorak and Colemak."
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}

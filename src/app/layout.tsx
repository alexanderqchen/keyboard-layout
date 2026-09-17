import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dvorak & Colemak Keyboard Tester | Try Alternative Layouts Online",
  description:
    "Test Dvorak, Colemak, and QWERTY keyboard layouts side by side. Type on any layout instantly in your browser — no software to install. Switch layouts with one click and practice typing on real text.",
  metadataBase: SITE_URL,
  applicationName: "Keyboard Layout Tester",
  other: {
    "google": "nositelinkssearchbox",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Keyboard Layout Tester" />
        <meta
          property="og:url"
          content={SITE_URL.href}
        />
        <meta
          property="og:title"
          content="Dvorak & Colemak Keyboard Tester | Try Alternative Layouts Online"
        />
        <meta
          property="og:description"
          content="Test Dvorak, Colemak, and QWERTY keyboard layouts side by side. Type on any layout instantly in your browser — no software to install."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={SITE_URL.href}
        />
        <meta
          name="twitter:title"
          content="Dvorak & Colemak Keyboard Tester | Try Alternative Layouts Online"
        />
        <meta
          name="twitter:description"
          content="Test Dvorak, Colemak, and QWERTY keyboard layouts side by side. Type on any layout instantly in your browser — no software to install."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Keyboard Layout Tester",
              "url": SITE_URL.href
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

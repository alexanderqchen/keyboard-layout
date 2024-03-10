import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SocialImg from "@/assets/social.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keyboard Layout Tester",
  description:
    "Try QWERTY, Dvorak, and Colemak alt keyboard layouts. Seamlessly switch between the layouts and practice typing on dummy text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://keyboard.experimental.software/"
      />
      <meta
        property="og:title"
        content="Practice Typing with Alt Keyboard Layouts"
      />
      <meta
        property="og:description"
        content="Try QWERTY, Dvorak, and Colemak alt keyboard layouts. Seamlessly switch between the layouts and practice typing on dummy text."
      />
      <meta property="og:image" content="<generated>" />
      <meta property="og:image:type" content="<generated>" />
      <meta property="og:image:width" content="<generated>" />
      <meta property="og:image:height" content="<generated>" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content="https://keyboard.experimental.software/"
      />
      <meta
        name="twitter:title"
        content="Practice Typing with Alt Keyboard Layouts"
      />
      <meta
        name="twitter:description"
        content="Try QWERTY, Dvorak, and Colemak alt keyboard layouts. Seamlessly switch between the layouts and practice typing on dummy text."
      />
      <meta name="twitter:image" content="<generated>" />
      <meta name="twitter:image:type" content="<generated>" />
      <meta name="twitter:image:width" content="<generated>" />
      <meta name="twitter:image:height" content="<generated>" />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3XWS80C1HX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-3XWS80C1HX');
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SocialImg from "@/assets/social.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dvorak & Colemak Keyboard Tester | Try Alternative Layouts Online",
  description:
    "Test Dvorak, Colemak, and QWERTY keyboard layouts side by side. Type on any layout instantly in your browser — no software to install. Switch layouts with one click and practice typing on real text.",
  metadataBase: new URL("https://keyboard.experimental.software/"),
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
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Keyboard Layout Tester" />
      <meta
        property="og:url"
        content="https://keyboard.experimental.software/"
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
        content="https://keyboard.experimental.software/"
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
            "url": "https://keyboard.experimental.software/"
          })
        }}
      />
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
      <Script id="posthog" strategy="afterInteractive">
        {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonPropertiesForFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||(window.posthog=[]));
          posthog.init("phc_gZCfyVO7HQTKkDH5G4UH15ejDCJlCHDgbf1XSbZbWGw", {
            api_host: "https://us.i.posthog.com",
            capture_pageview: true,
            capture_pageleave: true,
            disable_session_recording: false,
            session_recording: {
              maskAllInputs: false,
            },
          });
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

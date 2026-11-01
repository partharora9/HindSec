import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteMetadata, BRAND_NAME } from "@/content/siteContent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02030a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.defaultDescription,
  keywords: siteMetadata.keywords,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hindsec-og.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} – Cybersecurity & AI Security Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    images: ["/images/hindsec-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteMetadata.siteUrl}/#organization`,
        name: BRAND_NAME,
        url: siteMetadata.siteUrl,
        logo: `${siteMetadata.siteUrl}/images/hindsec-logo.png`,
        description: siteMetadata.defaultDescription,
        sameAs: [
          "https://linkedin.com",
          "https://x.com",
          "https://github.com",
        ],
      },
      {
        "@type": "Service",
        "@id": `${siteMetadata.siteUrl}/services/vulnerability-assessment#service`,
        name: "Vulnerability Assessment",
        provider: { "@id": `${siteMetadata.siteUrl}/#organization` },
        description:
          "Find, rank, and prioritize weaknesses across your systems before attackers do, with clear reports and practical fix guidance.",
      },
      {
        "@type": "Service",
        "@id": `${siteMetadata.siteUrl}/services/penetration-testing#service`,
        name: "Penetration Testing",
        provider: { "@id": `${siteMetadata.siteUrl}/#organization` },
        description:
          "Find vulnerabilities before attackers do with controlled testing, clear evidence, and practical remediation guidance.",
      },
      {
        "@type": "Service",
        "@id": `${siteMetadata.siteUrl}/services/application-security#service`,
        name: "Application & API Security",
        provider: { "@id": `${siteMetadata.siteUrl}/#organization` },
        description:
          "Test web apps, mobile apps, and APIs against real attack techniques and the OWASP Top 10 before attackers find the gaps.",
      },
    ],
  };

  return (
    <html lang="en" className="antialiased font-sans">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#02030a] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

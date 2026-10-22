import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteMetadata, BRAND_NAME } from "@/content/siteContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.defaultDescription,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
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
        logo: `${siteMetadata.siteUrl}/images/logo.png`,
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
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

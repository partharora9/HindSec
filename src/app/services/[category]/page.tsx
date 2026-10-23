import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CategoryHero from "@/components/services/CategoryHero";
import ServiceCard from "@/components/services/ServiceCard";
import WhoItIsFor from "@/components/services/WhoItIsFor";
import ProcessSteps from "@/components/services/ProcessSteps";
import RelatedServices from "@/components/services/RelatedServices";
import CTASection from "@/components/services/CTASection";
import {
  serviceCategories,
  getCategoryBySlug,
  getRelatedCategories,
} from "@/data/services";
import { BRAND_NAME, siteMetadata } from "@/content/siteContent";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return serviceCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: `Service Not Found | ${BRAND_NAME}`,
    };
  }

  const pageUrl = `${siteMetadata.siteUrl}/services/${category.slug}`;

  return {
    title: `${category.title} | ${BRAND_NAME}`,
    description: category.summary,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${category.title} | ${BRAND_NAME}`,
      description: category.summary,
      url: pageUrl,
      siteName: BRAND_NAME,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | ${BRAND_NAME}`,
      description: category.summary,
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const relatedCategories = getRelatedCategories(category.slug, 3);
  const pageUrl = `${siteMetadata.siteUrl}/services/${category.slug}`;

  // JSON-LD Schema for Service & Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteMetadata.siteUrl}/#organization`,
        name: BRAND_NAME,
        url: siteMetadata.siteUrl,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: category.title,
        serviceType: category.title,
        description: category.summary,
        provider: {
          "@id": `${siteMetadata.siteUrl}/#organization`,
        },
        url: pageUrl,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${category.title} Modules`,
          itemListElement: category.services.map((item, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.shortDescription,
            },
            position: idx + 1,
          })),
        },
      },
    ],
  };

  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar theme="light" />

      {/* Hero Section with Breadcrumbs & Title */}
      <CategoryHero category={category} />

      {/* Grid of Service Cards */}
      <section
        id="services-grid"
        className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#f0f1f3] border-b border-[#e2e4e8]"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="max-w-[760px] mb-12">
            <div className="text-[12px] uppercase tracking-[0.05em] text-[#4a4f5a] font-semibold mb-2">
              Service Modules
            </div>
            <h2 className="text-[30px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#0a0a0a] leading-[1.2] mb-4">
              Comprehensive Capabilities in {category.title}
            </h2>
            <p className="text-[16px] text-[#4a4f5a] leading-relaxed">
              Every capability is delivered as a modular, standalone component or integrated into an end-to-end operational pipeline.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <WhoItIsFor
        heading={category.whoItIsFor.heading}
        audiences={category.whoItIsFor.audiences}
      />

      {/* How We Work */}
      <ProcessSteps
        heading={category.howWeWork.heading}
        steps={category.howWeWork.steps}
      />

      {/* Related Services */}
      <RelatedServices categories={relatedCategories} />

      {/* Call to Action */}
      <CTASection
        title={category.cta.title}
        description={category.cta.description}
        primaryButtonText={category.cta.primaryButtonText}
        primaryButtonHref={category.cta.primaryButtonHref}
        secondaryButtonText={category.cta.secondaryButtonText}
        secondaryButtonHref={category.cta.secondaryButtonHref}
      />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}

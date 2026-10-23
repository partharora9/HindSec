import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Breadcrumbs from "@/components/services/Breadcrumbs";
import ServiceIcon from "@/components/services/ServiceIcon";
import CTASection from "@/components/services/CTASection";
import { getAllCategories } from "@/data/services";
import { BRAND_NAME, siteMetadata } from "@/content/siteContent";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Services Overview | AI & Security Solutions | ${BRAND_NAME}`,
  description:
    "Explore our 6 enterprise service categories spanning AI security product development, custom LLM fine-tuning, knowledge assistants, multi-agent automation, GPU infrastructure, and adversarial AI security assessments.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/services`,
  },
  openGraph: {
    title: `Services Overview | ${BRAND_NAME}`,
    description:
      "Enterprise AI development, private LLM engineering, workflow automation, and offensive AI security testing.",
    url: `${siteMetadata.siteUrl}/services`,
    siteName: BRAND_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services Overview | ${BRAND_NAME}`,
    description:
      "Enterprise AI development, private LLM engineering, workflow automation, and offensive AI security testing.",
  },
};

export default function ServicesOverviewPage() {
  const categories = getAllCategories();
  const pageUrl = `${siteMetadata.siteUrl}/services`;

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
        "@type": "ItemList",
        "@id": `${pageUrl}#servicelist`,
        name: `${BRAND_NAME} Service Categories`,
        description:
          "Comprehensive enterprise AI engineering, deployment, and security assessment offerings.",
        itemListElement: categories.map((cat, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: cat.title,
          description: cat.summary,
          url: `${siteMetadata.siteUrl}/services/${cat.slug}`,
        })),
      },
    ],
  };

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Services" }];

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

      {/* Services Overview Hero */}
      <section className="relative w-full pt-[130px] pb-[70px] lg:pt-[150px] lg:pb-[90px] px-6 lg:px-0 border-b border-[#e2e4e8]">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="max-w-[840px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e2e4e8] shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#4a4f5a]">
                Single Source of Truth Taxonomy
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] font-normal tracking-[-0.03em] text-[#0a0a0a] leading-[1.1] mb-5">
              Enterprise AI & Security Services
            </h1>

            <p className="text-[19px] sm:text-[21px] font-medium text-[#1c2c4a] leading-snug tracking-tight mb-4">
              Production-ready artificial intelligence engineering and adversarial security assessments for demanding enterprise environments.
            </p>

            <p className="text-[16px] sm:text-[17px] text-[#4a4f5a] leading-relaxed max-w-[760px]">
              Explore our 6 core capability areas. Every offering is backed by rigorous engineering, strict data sovereignty, deterministic testing, and continuous operational verification.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Category Cards Grid */}
      <section className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0 bg-[#f0f1f3]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.slug}
                className="group relative flex flex-col justify-between bg-white border border-[#e2e4e8] p-7 lg:p-8 rounded-none transition-all duration-200 hover:shadow-lg hover:border-[#a0a5ad] focus-within:ring-2 focus-within:ring-black"
              >
                <div>
                  {/* Top Bar with Icon & Count */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-[42px] h-[42px] bg-[#0a0a0a] rounded-none flex items-center justify-center text-white group-hover:bg-[#1a2b49] transition-colors">
                      <ServiceIcon name={category.icon} className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[12px] font-semibold text-[#6b7078] bg-[#f0f1f3] px-2.5 py-1 rounded-none uppercase tracking-wider">
                      {category.services.length} Services
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[21px] sm:text-[22px] font-medium text-[#0a0a0a] tracking-tight leading-snug mb-3">
                    <Link
                      href={`/services/${category.slug}`}
                      className="hover:text-black focus:outline-none"
                    >
                      {category.title}
                    </Link>
                  </h2>

                  {/* Tagline */}
                  <p className="text-[14.5px] font-medium text-[#1c2c4a] mb-3 leading-snug">
                    {category.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-[14px] text-[#4a4f5a] leading-relaxed mb-6">
                    {category.summary}
                  </p>

                  {/* Key Services Preview */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#f0f1f3]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7078] mb-2">
                      Key Modules
                    </div>
                    {category.services.slice(0, 3).map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center gap-2 text-[13px] text-[#333740]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                    ))}
                    {category.services.length > 3 && (
                      <div className="text-[12px] text-[#6b7078] font-medium pl-5">
                        + {category.services.length - 3} more modules
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-[#f0f1f3]">
                  <Link
                    href={`/services/${category.slug}`}
                    className="inline-flex items-center justify-between w-full text-[14px] font-semibold text-[#0a0a0a] group-hover:text-blue-700 transition-colors focus:outline-none"
                  >
                    <span>Explore {category.title}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Schedule an AI & Security Consultation"
        description="Whether you are architecting a custom LLM pipeline, automating complex business processes, or conducting adversarial security assessments, our engineers are ready to scope your engagement."
        primaryButtonText="Book a Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}

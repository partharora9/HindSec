import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Breadcrumbs from "@/components/services/Breadcrumbs";
import CTASection from "@/components/services/CTASection";
import { BRAND_NAME, siteMetadata, navContent } from "@/content/siteContent";
import { getCategoryBySlug } from "@/data/services";
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  Building2,
  Activity,
  Sliders,
  EyeOff,
  ListChecks,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: `VAPT Compliance Services | ISO 27001, SOC 2, PCI-DSS, CERT-In | ${BRAND_NAME}`,
  description:
    "Achieve and maintain regulatory compliance with certified VAPT assessments mapped to ISO 27001, SOC 2 Type II, PCI-DSS 4.0, CERT-In, HIPAA, RBI, SEBI, and DPDP Act frameworks.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/compliance`,
  },
  openGraph: {
    title: `VAPT Compliance Services | ${BRAND_NAME}`,
    description:
      "Audit-ready penetration testing and compliance assessments for global enterprise and regulatory standards.",
    url: `${siteMetadata.siteUrl}/compliance`,
    siteName: BRAND_NAME,
    locale: "en_GB",
    type: "website",
  },
};

const frameworksList = [
  {
    id: "iso-27001",
    title: "ISO/IEC 27001:2022 Technical VAPT",
    tag: "ISMS A.8 Controls",
    badge: "Global Standard",
    description:
      "Satisfy Annex A.8 technical control requirements with rigorous external/internal penetration testing, vulnerability management, and remediation retesting.",
    icon: ShieldCheck,
    href: "/services/vapt-compliance-services#iso-27001-vapt-audit",
    features: [
      "A.8.8 Management of technical vulnerabilities",
      "Internal and external attack simulation",
      "Auditor-ready evidence documentation",
      "Free re-test after remediation",
    ],
  },
  {
    id: "soc-2",
    title: "SOC 2 Type I & II Readiness VAPT",
    tag: "Trust Services Criteria",
    badge: "Enterprise SaaS",
    description:
      "Independent penetration testing satisfying AICPA Trust Services Criteria for security, confidentiality, and availability to accelerate enterprise procurement.",
    icon: FileCheck2,
    href: "/services/vapt-compliance-services#soc2-type-2-penetration-testing",
    features: [
      "Common Criteria (CC6/CC7/CC8) validation",
      "Network and application vulnerability testing",
      "Detailed proof-of-concept exploit artifacts",
      "Formal Auditor Attestation Letter",
    ],
  },
  {
    id: "pci-dss",
    title: "PCI-DSS 4.0 Requirement 11",
    tag: "Req 11.3 Pentesting",
    badge: "Payment Security",
    description:
      "Mandatory internal and external penetration testing, cardholder data environment (CDE) segmentation checks, and multi-tenant isolation validation.",
    icon: Lock,
    href: "/services/vapt-compliance-services#pci-dss-penetration-testing",
    features: [
      "Network and application layer pentesting",
      "CDE perimeter segmentation verification",
      "CVSS v3.1 scoring on all findings",
      "PCI-QSA aligned compliance report",
    ],
  },
  {
    id: "cert-in",
    title: "CERT-In Empanelled Audits",
    tag: "National Cybersecurity",
    badge: "India Regulatory",
    description:
      "Mandatory security auditing for government departments, critical infrastructure, Indian utilities, and public cloud operators adhering to CERT-In guidelines.",
    icon: Building2,
    href: "/services/vapt-compliance-services#cert-in-security-auditing",
    features: [
      "CERT-In cybersecurity guideline alignment",
      "Network architecture & firewall configuration review",
      "Website and API vulnerability assessment",
      "Clean Cyber Security Certificate issuance",
    ],
  },
  {
    id: "hipaa",
    title: "HIPAA Security Rule Pentest",
    tag: "ePHI Safeguards",
    badge: "Healthcare",
    description:
      "Technical safeguards testing protecting electronic Protected Health Information (ePHI) across EHR platforms, health tech APIs, and hospital networks.",
    icon: Activity,
    href: "/services/vapt-compliance-services#hipaa-technical-safeguards-audit",
    features: [
      "45 CFR § 164.308 / § 164.312 safeguards",
      "ePHI data transmission encryption testing",
      "Access control & role-based privilege checks",
      "Breach probability risk analysis",
    ],
  },
  {
    id: "rbi-sebi",
    title: "RBI / SEBI / IRDAI Cyber Framework",
    tag: "BFSI Sector",
    badge: "Fintech & Banking",
    description:
      "Specialized penetration testing and cyber resilience audits mandated for commercial banks, NBFCs, stockbrokers, payment gateways, and insurtechs.",
    icon: Sliders,
    href: "/services/vapt-compliance-services#rbi-sebi-irdai-cyber-framework",
    features: [
      "RBI Master Direction on IT Governance testing",
      "SEBI Cyber Security and Cyber Resilience audit",
      "Mobile banking and payment API penetration testing",
      "Board-level executive compliance summary",
    ],
  },
  {
    id: "dpdp-gdpr",
    title: "DPDP Act 2023 & GDPR Privacy",
    tag: "Data Protection",
    badge: "Privacy Law",
    description:
      "Assess technical controls safeguarding personal sensitive data, testing consent mechanics, data minimization, cryptographic storage, and PII leak vectors.",
    icon: EyeOff,
    href: "/services/vapt-compliance-services#dpdp-gdpr-privacy-security-testing",
    features: [
      "PII and sensitive personal data flow mapping",
      "Insecure storage & leakage penetration testing",
      "Third-party tracking and telemetry evaluation",
      "Technical privacy compliance attestation",
    ],
  },
  {
    id: "nist-csf",
    title: "NIST CSF & CIS Controls Benchmark",
    tag: "NIST SP 800-115",
    badge: "Hardening Baseline",
    description:
      "Benchmark operating systems, hypervisors, cloud tenancies, and network appliances against CIS Level 1/2 benchmarks and NIST SP 800-115 standards.",
    icon: ListChecks,
    href: "/services/vapt-compliance-services#nist-csf-cis-benchmark-assessment",
    features: [
      "NIST Cybersecurity Framework (CSF 2.0) mapping",
      "CIS Benchmark automated & manual audits",
      "Remediation hardening scripts & runbooks",
      "Continuous posture scoring & gap reports",
    ],
  },
];

const auditSteps = [
  {
    step: "01",
    title: "Scope & Gap Analysis",
    description:
      "We map your in-scope assets (CDE perimeters, ePHI databases, API gateways), review prior audit findings, and establish clear rules of engagement.",
  },
  {
    step: "02",
    title: "Deep Technical Penetration Testing",
    description:
      "Offensive security engineers test for all mandatory controls, attempting safe exploitation to validate true risk and eliminate false positives.",
  },
  {
    step: "03",
    title: "Remediation Support & Retesting",
    description:
      "Your developers receive reproduction proofs and code-level remediation advice. Once resolved, we perform free verification retesting.",
  },
  {
    step: "04",
    title: "Compliance Attestation & Certificate",
    description:
      "We issue auditor-approved technical reports, control mapping matrices, and official compliance certificates ready for external auditors.",
  },
];

export default function ComplianceServicesPage() {
  const complianceCategory = getCategoryBySlug("vapt-compliance-services");
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Compliance Services" },
  ];

  return (
    <main className="w-full bg-[#f0f1f3] text-[#0a0a0a] min-h-screen overflow-x-hidden font-sans">
      <SmoothScroll />
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar theme="light" />

      {/* Compliance Hero Section */}
      <section className="relative w-full pt-[130px] pb-[70px] lg:pt-[150px] lg:pb-[90px] px-6 lg:px-0 border-b border-[#e2e4e8] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          <div className="max-w-[880px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0fdf4] border border-emerald-200 shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-emerald-800">
                100% Audit-Ready VAPT Attestation
              </span>
            </div>

            <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-normal tracking-[-0.03em] text-[#0a0a0a] leading-[1.1] mb-5">
              VAPT Compliance & Regulatory Security Audits
            </h1>

            <p className="text-[19px] sm:text-[21px] font-normal text-[#334155] leading-relaxed mb-8">
              Pass your security audits with zero surprises. {BRAND_NAME} delivers certified, evidence-backed penetration testing mapped directly to ISO 27001, SOC 2, PCI-DSS, CERT-In, HIPAA, RBI, and DPDP Act frameworks.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact?service=compliance"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0a0a0a] text-white text-[15px] font-medium hover:bg-black/85 transition-all shadow-sm"
              >
                <span>Book Compliance Scoping Call</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="#frameworks"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#f0f1f3] text-[#0a0a0a] text-[15px] font-medium hover:bg-[#e2e4e8] transition-colors border border-[#e2e4e8]"
              >
                <span>Explore 8 Frameworks</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks Grid Section */}
      <section id="frameworks" className="w-full py-[80px] lg:py-[100px] px-6 lg:px-0">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider text-blue-700 mb-2">
                Audit Standards & Frameworks
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#0a0a0a]">
                Compliance Frameworks We Test & Certify
              </h2>
            </div>
            <p className="text-[15px] text-[#64748b] max-w-[420px] mt-3 md:mt-0">
              Each engagement is customized to the exact control matrices and evidence requirements of your chosen certifying bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworksList.map((fw) => {
              const Icon = fw.icon;
              return (
                <div
                  key={fw.id}
                  className="bg-white rounded-none border border-[#e2e4e8] p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-400 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-none bg-[#0a0a0a] group-hover:bg-[#1a2b49] text-white flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-[2px]">
                        {fw.badge}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-semibold text-[#0a0a0a] group-hover:text-blue-700 transition-colors leading-snug mb-2">
                      {fw.title}
                    </h3>
                    <div className="text-[12px] font-medium text-blue-600 mb-3">
                      {fw.tag}
                    </div>

                    <p className="text-[13.5px] text-[#4a5568] leading-relaxed mb-5">
                      {fw.description}
                    </p>

                    <div className="space-y-2 border-t border-[#f1f5f9] pt-4 mb-6">
                      {fw.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[12.5px] text-[#334155]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={fw.href}
                    className="inline-flex items-center text-[13px] font-semibold text-[#0a0a0a] group-hover:text-blue-700 transition-colors pt-2 border-t border-slate-100"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Engagement Process */}
      <section className="w-full py-[80px] bg-white border-y border-[#e2e4e8] px-6 lg:px-0">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[680px] mb-12">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-blue-700 mb-2">
              Structured Methodology
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#0a0a0a]">
              The Path to a Clean Compliance Audit
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {auditSteps.map((step) => (
              <div key={step.step} className="flex flex-col border-t-2 border-[#0a0a0a] pt-5">
                <span className="text-[28px] font-mono font-bold text-slate-300 mb-3">
                  {step.step}
                </span>
                <h3 className="text-[19px] font-semibold text-[#0a0a0a] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#4a5568] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection
        title="Ready to Achieve Complete Audit Compliance?"
        description="Schedule a scoping consultation with a certified compliance security auditor. Receive a clear timetable, scope document, and fixed-price quotation."
        primaryButtonText="Schedule Compliance Scoping"
        primaryButtonHref="/contact?service=compliance"
        secondaryButtonText="Explore All Services"
        secondaryButtonHref="/services"
      />

      <Footer />
    </main>
  );
}


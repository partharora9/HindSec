/**
 * ============================================================================
 * SECURIO VAPT - CENTRAL SITE CONTENT FILE
 * ============================================================================
 * 
 * PLACEHOLDER LIST (Replace with real data before production launch):
 * 1. BRAND_NAME: Set to your actual registered company/brand name.
 * 2. Contact details (email, phone, address, map link, social media URLs).
 * 3. Testimonial: Replace sample client feedback quote, client name, and role.
 * 4. Case studies: Replace illustrative engagement summaries with real client case studies.
 * 5. Team members: Replace placeholder names (Team Member 1..4) and photos with actual team members.
 * 6. Team certifications: Replace placeholder certifications (OSCP, CEH, etc.) with certifications the team ACTUALLY holds.
 *    NOTE: Only certifications the team truly holds may be listed! Never claim unverified certifications.
 * 7. Retest policy: Confirm exact terms (e.g., "one free verification retest within 30 days of initial report").
 * 8. Legal company name & jurisdiction in /privacy and /terms pages.
 * 
 * TRUTH RULES ENFORCED:
 * - No fake customer counts or unverified client metrics.
 * - No fabricated client names or placeholder logo marks (standards marks used instead: OWASP, NIST, CVSS, etc.).
 * - Language uses "aligned with" and "supports" for frameworks (never "certified by" or "approved by").
 * - Prominently affirms that all testing requires written authorization and signed scope.
 */

export const BRAND_NAME = "Securio";

export const siteMetadata = {
  brandName: BRAND_NAME,
  siteUrl: "https://securio.com", // PLACEHOLDER: replace with production domain
  defaultTitle: `VAPT Services | Vulnerability Assessment & Penetration Testing | ${BRAND_NAME}`,
  titleTemplate: `%s | ${BRAND_NAME}`,
  defaultDescription:
    "Professional Vulnerability Assessment and Penetration Testing (VAPT) services. Identify security weaknesses, safely validate exploitability, and receive actionable remediation guidance with free retesting.",
  keywords: [
    "VAPT services",
    "vulnerability assessment",
    "penetration testing",
    "web application security",
    "API security testing",
    "network pentest",
    "cloud security assessment",
    "OWASP Top 10",
    "CVSS scoring",
    "compliance security audit",
  ],
};

export const navContent = {
  brandText: BRAND_NAME,
  servicesLabel: "SERVICES",
  whyLabel: `WHY ${BRAND_NAME.toUpperCase()}`,
  services: [
    {
      title: "Vulnerability Assessment",
      description: "Find and rank weaknesses across your assets",
      href: "/services/vulnerability-assessment",
      iconType: "scan-magnifier" as const,
    },
    {
      title: "Penetration Testing",
      description: "Safely exploit flaws to prove real risk",
      href: "/services/penetration-testing",
      iconType: "check-magnifier" as const,
    },
    {
      title: "Application & API Security",
      description: "Test web, mobile, and API security in depth",
      href: "/services/application-security",
      iconType: "browser-window" as const,
    },
  ],
  whySecurio: [
    {
      title: "About",
      description: "Our mission, values, and approach",
      href: "/about",
      iconType: "users" as const,
    },
    {
      title: "Certifications",
      description: "Skills and standards behind our work",
      href: "/certifications",
      iconType: "award" as const,
    },
    {
      title: "Careers",
      description: "Join a team focused on real impact",
      href: "/careers",
      iconType: "briefcase" as const,
    },
  ],
  mainLinks: [
    { title: "Case Studies", href: "/#case-studies" },
    { title: "Contact", href: "/contact" },
  ],
  ctaButton: "Get a Free Quote",
  ctaButtonLong: "Get a Free Scoping Call",
  dropdownCard: {
    titleLine1: "Talk to a",
    titleLine2: "Security Expert",
    subtitle: "Scope your VAPT engagement",
    href: "/contact",
    imageSrc: "/images/security-expert.jpg",
    imageAlt: "Securio security experts reviewing VAPT scoping requirements",
  },
};

export const heroContent = {
  trustBadge: "Report-backed VAPT with free retesting", // PLACEHOLDER-safe, no fake counts
  h1Line1: "Find the weak points",
  h1Line2: "before attackers do",
  subtext:
    "VAPT services that uncover real vulnerabilities, prove their impact, and show your team exactly how to fix them.",
  ctaButton: "Get a Free Quote",
  ctaHref: "/contact",
};

export const standardMarks = [
  { id: "owasp", name: "OWASP", caption: "Testing Guide" },
  { id: "cvss", name: "CVSS", caption: "v3.1 & v4.0 Scoring" },
  { id: "nist", name: "NIST", caption: "SP 800-115" },
  { id: "mitre", name: "MITRE ATT&CK", caption: "Threat Mapping" },
  { id: "ptes", name: "PTES", caption: "Standard Method" },
  { id: "iso27001", name: "ISO 27001", caption: "Controls Aligned" },
  { id: "pcidss", name: "PCI DSS", caption: "Requirement 11" },
];

export const marqueeContent = {
  caption: "Testing aligned with industry standards",
  items: standardMarks,
};

export interface Card1Data {
  id: "vulnerability-assessment";
  title: string;
  caption: string;
  href: string;
  gradient: string;
  panel: {
    step1: string;
    step2: { label: string; chip: string };
    step3: { label: string; chip: string };
    step4: { chip: string; label: string };
    step5: { label: string; chip: string };
  };
}

export interface Card2Data {
  id: "penetration-testing";
  title: string;
  caption: string;
  href: string;
  gradient: string;
  panel: {
    title: string;
    score: string;
    progress: string;
    row1: string;
    row2: string;
    row3: string;
  };
}

export interface Card3Data {
  id: "application-security";
  title: string;
  caption: string;
  href: string;
  gradient: string;
  panel: {
    title: string;
    tests: string[];
  };
}

export const homeSecurityServices = {
  label: "SECURITY SERVICES",
  headingLine1: "Every vulnerability found.",
  headingLine2: "Every fix verified.",
  cards: [
    {
      id: "vulnerability-assessment" as const,
      title: "Vulnerability Assessment",
      caption: "Know every weakness before it is exploited.",
      href: "/services/vulnerability-assessment",
      gradient: "linear-gradient(135deg, #d9f1ff 0%, #8ccbff 35%, #4a7cf0 70%, #2c4fc4 100%)",
      panel: {
        step1: "Asset discovered",
        step2: { label: "Scan", chip: "Complete" },
        step3: { label: "Triage", chip: "Ranked" },
        step4: { chip: "Validated", label: "Human review" },
        step5: { label: "Reported", chip: "Delivered" },
      },
    },
    {
      id: "penetration-testing" as const,
      title: "Penetration Testing",
      caption: "See how an attacker would really get in.",
      href: "/services/penetration-testing",
      gradient: "linear-gradient(135deg, #5aa0f8 0%, #2f5be0 40%, #0b1a66 75%, #040a2c 100%)",
      panel: {
        title: "Pentest Report",
        score: "Risk score: 8.1 / 10 (High)",
        progress: "81%",
        row1: "Entry point found",
        row2: "Exploit validated",
        row3: "Fix retested",
      },
    },
    {
      id: "application-security" as const,
      title: "Application & API Security",
      caption: "Secure every endpoint, form, and token.",
      href: "/services/application-security",
      gradient: "linear-gradient(135deg, #2a4fc0 0%, #152c80 30%, #02030f 75%, #000108 100%)",
      panel: {
        title: "App & API Testing",
        tests: [
          "Authentication tests",
          "Access control tests",
          "Injection testing",
          "API abuse testing",
          "Business logic tests",
        ],
      },
    },
  ] as [Card1Data, Card2Data, Card3Data],
};

export const testimonialContent = {
  // PLACEHOLDER: Replace with real client testimonial when authorized
  quote:
    '"Our report gave your developers clear steps to fix every finding, and the free retest proved each fix worked."',
  authorName: "Sample client feedback",
  authorRole: "Replace with a real testimonial",
  isPlaceholder: true,
};

export const vaptProcessContent = {
  label: "VAPT ENGAGEMENT PROCESS",
  headingLine1: "Structured testing process",
  headingLine2: "designed for clear results",
  steps: [
    {
      id: 1,
      number: "1",
      title: "Scoping & Authorization",
      description:
        "We define targets, agree rules of engagement, and verify written authorization. Every test is conducted strictly within the signed scope.",
    },
    {
      id: 2,
      number: "2",
      title: "Testing & Validation",
      description:
        "Our engineers combine automated scanners with deep manual exploitation to validate vulnerabilities, uncover business logic flaws, and eliminate false positives.",
    },
    {
      id: 3,
      number: "3",
      title: "Reporting & Retest",
      description:
        "You receive an executive summary, CVSS-scored technical findings, and reproduction steps. Once your team fixes the issues, we retest to verify the fix.",
    },
  ],
};

export const solutionSuiteContent = {
  label: `${BRAND_NAME.toUpperCase()} SOLUTION SUITE`,
  heading: "Trusted outcomes.",
  items: [
    {
      id: "asset-discovery",
      type: "threat" as const,
      title: "Asset Discovery",
      description:
        "We map your external and internal attack surface, so nothing important is left untested.",
    },
    {
      id: "authentication-testing",
      type: "identity" as const,
      title: "Authentication Testing",
      description:
        "We test logins, sessions, and access controls for weaknesses that lead to account takeover.",
    },
    {
      id: "network-pentest",
      type: "network" as const,
      title: "Network Penetration Testing",
      description:
        "We test firewalls, services, and configurations for entry points an attacker could use.",
    },
    {
      id: "exploit-validation",
      type: "incident" as const,
      title: "Exploit Validation",
      description:
        "We safely prove which flaws are exploitable, so you fix what matters instead of chasing false positives.",
    },
    {
      id: "data-exposure-checks",
      type: "data" as const,
      title: "Data Exposure Checks",
      description:
        "We look for exposed data, weak encryption, and misconfigured storage across your systems.",
    },
    {
      id: "risk-based-reporting",
      type: "analytics" as const,
      title: "Risk-Based Reporting",
      description:
        "Every finding is scored with CVSS and explained in plain language with clear fix guidance.",
    },
  ],
};

export const caseStudiesContent = {
  label: "CASE STUDIES",
  heading: "Sample engagements",
  // PLACEHOLDER: Illustrative engagements, replace with approved case studies
  items: [
    {
      id: "fintech-pentest",
      category: "CASE STUDY",
      line1: "Web App Pentest for a",
      line2: "FinTech Platform",
      imageSrc: "/images/case-1.jpg",
      href: "/contact?service=pentest",
      alt: "FinTech web application penetration testing assessment",
    },
    {
      id: "healthcare-vapt",
      category: "CASE STUDY",
      line1: "Cloud & Network VAPT for a",
      line2: "Healthcare Provider",
      imageSrc: "/images/case-2.jpg",
      href: "/contact?service=vapt",
      alt: "Healthcare cloud and network vulnerability assessment and pentest",
    },
    {
      id: "saas-api-security",
      category: "CASE STUDY",
      line1: "API Security Testing for a",
      line2: "SaaS Company",
      imageSrc: "/images/case-3.jpg",
      href: "/contact?service=appsec",
      alt: "Multi-tenant SaaS API and microservices security evaluation",
    },
  ],
};

export const faqContent = {
  label: "QUESTIONS & ANSWERS",
  headingLine1: "Frequently",
  headingLine2: "Asked Questions",
  askCard: {
    title: "Can’t find an answer to your question?",
    sub: "Talk to our team",
    href: "/contact",
  },
  items: [
    {
      id: "faq-1",
      question: "What is the difference between a vulnerability assessment and a penetration test?",
      answer:
        "A vulnerability assessment finds and ranks weaknesses across your systems, mostly with scanning plus manual review. A penetration test goes further: our testers safely exploit the flaws to prove real impact and show how far an attacker could get.",
    },
    {
      id: "faq-2",
      question: "What do you test?",
      answer:
        "Web applications, mobile apps, APIs, internal and external networks, cloud environments, and wireless setups. We agree the exact scope with you before any testing starts.",
    },
    {
      id: "faq-3",
      question: "How long does a VAPT engagement take?",
      answer:
        "Most engagements take 1 to 4 weeks, depending on scope and size. You get a clear timeline in the proposal before we begin.",
    },
    {
      id: "faq-4",
      question: "Will testing disrupt our live systems?",
      answer:
        "We use safe, controlled techniques and agree testing windows with you. For sensitive systems we can test in staging or during low-traffic hours.",
    },
    {
      id: "faq-5",
      question: "What will we receive at the end?",
      answer:
        "An executive summary for leadership and a detailed technical report with CVSS-scored findings, proof of concept, evidence, and step-by-step remediation guidance.",
    },
    {
      id: "faq-6",
      question: "Do you offer retesting after we fix the issues?",
      // PLACEHOLDER: Confirm specific policy, e.g. "one free retest within 30 days"
      answer:
        "Yes. We retest the fixed findings and update the report so you have proof that the vulnerabilities are closed.",
    },
    {
      id: "faq-7",
      question: "Can VAPT help with compliance?",
      answer:
        "Yes. Regular VAPT supports requirements in frameworks such as ISO 27001, PCI DSS, SOC 2, and regulator guidelines. We format reports so they can be shared with auditors.",
    },
  ],
};

export const servicePagesContent = {
  vulnerabilityAssessment: {
    hero: {
      title: "Vulnerability Assessment",
      paragraph:
        "Find, rank, and prioritize weaknesses across your systems before attackers do, with clear reports and practical fix guidance.",
    },
    cards: [
      {
        id: "va-card-1",
        title: "Asset and attack surface discovery",
        description:
          "We map your internet-facing and internal assets so every system in scope is known and tested.",
      },
      {
        id: "va-card-2",
        title: "Automated and manual scanning",
        description:
          "We combine trusted scanners with manual verification to reduce noise and false positives.",
      },
      {
        id: "va-card-3",
        title: "Risk-based prioritization",
        description:
          "Each finding is scored with CVSS and ranked by business impact so your team knows what to fix first.",
      },
    ],
    whatIs: {
      heading: "What Is Vulnerability Assessment?",
      paragraphs: [
        "Vulnerability Assessment is a structured review that identifies security weaknesses in your applications, networks, and infrastructure. It shows where you are exposed, how serious each issue is, and what to fix first.",
        `${BRAND_NAME} combines scanning tools with manual validation by security engineers. You receive a prioritized report with clear remediation steps your technical team can act on.`,
      ],
      checklistLabel: "WITH VULNERABILITY ASSESSMENT, YOU CAN:",
      checklist: [
        "Discover unknown and forgotten assets",
        "Identify missing patches and misconfigurations",
        "Understand risk with CVSS scoring",
        "Prioritize fixes by business impact",
        "Track improvement over time",
      ],
    },
    delivery: {
      headingLine1: "How Do We Deliver",
      headingLine2: "Vulnerability Assessment?",
      steps: [
        {
          number: 1,
          title: "Scope and discover",
          description:
            "We agree the scope, confirm authorization, and map the assets and services to be assessed.",
        },
        {
          number: 2,
          title: "Scan and verify",
          description:
            "We run scans and manually verify results to remove false positives and confirm real issues.",
        },
        {
          number: 3,
          title: "Report and advise",
          description:
            "We deliver a prioritized report with severity ratings, evidence, and clear remediation guidance.",
        },
      ],
    },
    outcomes: [
      {
        id: "va-out-1",
        title: "Full asset visibility",
        description: "Know what you have exposed and what needs protection.",
      },
      {
        id: "va-out-2",
        title: "Fewer false positives",
        description: "Manual validation keeps your team focused on real issues.",
      },
      {
        id: "va-out-3",
        title: "Clear fix priorities",
        description: "Start with the vulnerabilities that carry the most risk.",
      },
      {
        id: "va-out-4",
        title: "Faster patching",
        description: "Specific guidance helps developers and admins fix issues quickly.",
      },
      {
        id: "va-out-5",
        title: "Audit-ready reports",
        description: "Documentation that supports security reviews and compliance.",
      },
      {
        id: "va-out-6",
        title: "Lower breach risk",
        description: "Close weak points before attackers can use them.",
      },
    ],
  },
  penetrationTesting: {
    hero: {
      title: "Penetration Testing",
      paragraph:
        "Find vulnerabilities before attackers do with controlled testing, clear evidence, and practical remediation guidance.",
    },
    cards: [
      {
        id: "pt-card-1",
        title: "Web application testing",
        description:
          "We test web apps, portals, and APIs for exploitable flaws that could expose users, data, or business systems.",
      },
      {
        id: "pt-card-2",
        title: "Network penetration testing",
        description:
          "We test external perimeters and internal networks to find weaknesses that allow unauthorized access or lateral movement.",
      },
      {
        id: "pt-card-3",
        title: "Cloud security testing",
        description:
          "We assess cloud environments for permission flaws, exposed services, and configuration weaknesses that leave systems vulnerable.",
      },
    ],
    whatIs: {
      heading: "What Is Penetration Testing?",
      paragraphs: [
        "Penetration Testing is a controlled security assessment that simulates real attack methods to find vulnerabilities before they are exploited. It helps your team understand where risk exists, how serious each issue is, and what needs to be fixed first.",
        `${BRAND_NAME} tests applications, networks, cloud systems, and infrastructure with a clear focus on business impact. You get evidence-based findings, practical recommendations, and a better understanding of your real security posture.`,
      ],
      checklistLabel: "WITH PENETRATION TESTING, YOU CAN:",
      checklist: [
        "Find exploitable vulnerabilities",
        "Validate existing security controls",
        "Understand real attack paths",
        "Prioritize remediation work",
        "Reduce security risk before incidents happen",
      ],
    },
    delivery: {
      headingLine1: "How Do We Deliver",
      headingLine2: "Penetration Testing?",
      steps: [
        {
          number: 1,
          title: "Map the attack surface",
          description:
            "We review your systems, applications, access points, and exposed assets to understand where testing should focus first.",
        },
        {
          number: 2,
          title: "Test real attack paths",
          description:
            "We use controlled testing methods to validate vulnerabilities and show how an attacker could move through your environment, always within the agreed scope.",
        },
        {
          number: 3,
          title: "Report clear next steps",
          description:
            "We deliver clear findings, risk ratings, evidence, and remediation guidance your technical and leadership teams can act on.",
        },
      ],
    },
    outcomes: [
      {
        id: "pt-out-1",
        title: "Clear risk priorities",
        description: "Understand which vulnerabilities matter most so your team can focus on the highest-risk issues first.",
      },
      {
        id: "pt-out-2",
        title: "Actionable remediation",
        description: "Get specific, practical guidance that helps developers and IT teams resolve findings faster.",
      },
      {
        id: "pt-out-3",
        title: "Evidence-based results",
        description: "Review clear proof of concept and impact demonstration for each confirmed vulnerability.",
      },
      {
        id: "pt-out-4",
        title: "Stronger defense posture",
        description: "Close security gaps before attackers can discover or exploit them in production environments.",
      },
      {
        id: "pt-out-5",
        title: "Compliance support",
        description: "Receive audit-ready reports that support security compliance frameworks and client reviews.",
      },
      {
        id: "pt-out-6",
        title: "Retest verification",
        description: "Verify that applied patches and fixes have successfully closed the identified vulnerabilities.",
      },
    ],
  },
  applicationSecurity: {
    hero: {
      title: "Application & API Security",
      paragraph:
        "Test web apps, mobile apps, and APIs against real attack techniques and the OWASP Top 10 before attackers find the gaps.",
    },
    cards: [
      {
        id: "appsec-card-1",
        title: "Web application testing",
        description:
          "We test logins, sessions, inputs, and business logic for flaws such as injection, broken access control, and XSS.",
      },
      {
        id: "appsec-card-2",
        title: "API security testing",
        description:
          "We test REST and GraphQL APIs for authorization flaws, data exposure, and abuse of endpoints and tokens.",
      },
      {
        id: "appsec-card-3",
        title: "Mobile app testing",
        description:
          "We review Android and iOS apps for insecure storage, weak communication, and reverse-engineering risks.",
      },
    ],
    whatIs: {
      heading: "What Is Application & API Security Testing?",
      paragraphs: [
        "Application and API security testing checks the software your customers and partners use for flaws that could expose data or allow account takeover. It follows methods such as the OWASP Top 10, ASVS, and MASVS.",
        `${BRAND_NAME} testers combine automated tools with deep manual testing of authentication, authorization, and business logic, where scanners often miss serious issues.`,
      ],
      checklistLabel: "WITH APPLICATION SECURITY TESTING, YOU CAN:",
      checklist: [
        "Find OWASP Top 10 vulnerabilities",
        "Protect user data and sessions",
        "Secure APIs and integrations",
        "Test business logic abuse",
        "Ship safer releases",
      ],
    },
    delivery: {
      headingLine1: "How Do We Deliver",
      headingLine2: "Application & API Security Testing?",
      steps: [
        {
          number: 1,
          title: "Understand the application",
          description:
            "We review features, user roles, and data flows to plan realistic test cases.",
        },
        {
          number: 2,
          title: "Test in depth",
          description:
            "We test authentication, access control, inputs, and APIs manually and with tools, within the agreed scope.",
        },
        {
          number: 3,
          title: "Report and retest",
          description:
            "We deliver evidence-backed findings with fix guidance and retest the fixed issues.",
        },
      ],
    },
    outcomes: [
      {
        id: "appsec-out-1",
        title: "Safer user data",
        description: "Reduce the chance of data leaks and account takeover.",
      },
      {
        id: "appsec-out-2",
        title: "Secure APIs",
        description: "Find authorization and data exposure flaws in your endpoints.",
      },
      {
        id: "appsec-out-3",
        title: "Fewer production bugs",
        description: "Catch security issues before release, when fixes cost less.",
      },
      {
        id: "appsec-out-4",
        title: "Developer-ready fixes",
        description: "Reports include code-level guidance developers can use.",
      },
      {
        id: "appsec-out-5",
        title: "Stronger release confidence",
        description: "Ship new features knowing they have been tested.",
      },
      {
        id: "appsec-out-6",
        title: "Compliance support",
        description: "Evidence for PCI DSS, ISO 27001 and SOC 2 reviews.",
      },
    ],
  },
};

export const aboutContent = {
  hero: {
    label: `ABOUT ${BRAND_NAME.toUpperCase()}`,
    heading: "A VAPT partner built for teams\nthat want proof, not just alerts.",
    photo: {
      src: "/images/about-team.jpg",
      alt: "Securio security testing team collaborating on vulnerability analysis",
    },
  },
  values: {
    label: "OUR VALUES",
    heading: "The values behind our\nsecurity approach",
    items: [
      {
        id: "integrity",
        title: "Integrity",
        description:
          "We report what we find, honestly and without exaggeration. Every finding is backed by evidence and explained in plain language.",
      },
      {
        id: "reliability",
        title: "Reliability",
        description:
          "We follow a repeatable methodology and agreed timelines, so you know what to expect from scoping to retest.",
      },
      {
        id: "transparency",
        title: "Transparency",
        description:
          "You see our scope, method, and findings clearly. No black boxes, no surprise changes to the plan.",
      },
      {
        id: "resilience",
        title: "Resilience",
        description:
          "We help you fix issues and verify the fixes, so your security holds up as your systems change.",
      },
    ],
  },
  philosophy: {
    label: "PHILOSOPHY",
    heading: "We make risk clear\nand fixable",
    paragraphs: [
      "Security testing is only useful if your team can act on it. We turn complex technical findings into clear priorities, evidence, and fix steps.",
      "Every engagement starts with a written scope and authorization, follows recognized methodologies, and ends with a report and a retest, so you can see real improvement.",
    ],
  },
  team: {
    label: "MEET THE TEAM",
    heading: "Security practitioners\n& researchers",
    // PLACEHOLDER: Replace placeholder team with real personnel and photos
    members: [
      {
        name: "Team Member 1",
        role: "Founder and Lead Security Consultant",
        image: "/images/team-alex.jpg",
        alt: "Founder and Lead Security Consultant",
      },
      {
        name: "Team Member 2",
        role: "Senior Penetration Tester",
        image: "/images/team-kamila.jpg",
        alt: "Senior Penetration Tester",
      },
      {
        name: "Team Member 3",
        role: "Application Security Engineer",
        image: "/images/team-bill.jpg",
        alt: "Application Security Engineer",
      },
      {
        name: "Team Member 4",
        role: "Client Success Manager",
        image: "/images/team-andy.jpg",
        alt: "Client Success Manager",
      },
    ],
  },
};

export const careersContent = {
  hero: {
    label: "CAREERS",
    heading: "Join a team focused on real security impact",
    paragraph:
      "We work with organizations to uncover vulnerabilities, prove real risk, and help development and security teams build lasting defense. Explore our open roles below.",
  },
  openRoles: [
    {
      id: "role-1",
      slug: "senior-penetration-tester",
      title: "Senior Penetration Tester",
      location: "Remote, Full Time",
      description:
        "Lead penetration testing assessments across web, network, and cloud environments, delivering evidence-backed findings and actionable remediation advice.",
      department: "Offensive Security",
      datePosted: "2025-01-15",
    },
    {
      id: "role-2",
      slug: "application-security-engineer",
      title: "Application Security Engineer",
      location: "Remote, Full Time",
      description:
        "Review source code, test web and mobile apps and APIs against OWASP Top 10 vulnerabilities, and partner with developers on fixes.",
      department: "Product Security",
      datePosted: "2025-01-20",
    },
    {
      id: "role-3",
      slug: "security-analyst-va",
      title: "Security Analyst (VA)",
      location: "Remote, Full Time",
      description:
        "Perform vulnerability scans, conduct manual triage to eliminate false positives, and produce prioritized CVSS-scored assessment reports.",
      department: "Vulnerability Assessment",
      datePosted: "2025-02-01",
    },
    {
      id: "role-4",
      slug: "cloud-security-engineer",
      title: "Cloud Security Engineer",
      location: "Remote, Full Time",
      description:
        "Assess AWS, Azure, and GCP architectures for misconfigurations, excessive permissions, and compliance gaps within scoped engagements.",
      department: "Cloud Security",
      datePosted: "2025-02-10",
    },
  ],
};

/**
 * CERTIFICATIONS & STANDARDS DATA
 * IMPORTANT TRUTH RULE:
 * Only certifications the team truly holds may be listed here!
 * Replace this array with actual certifications verified by your security team.
 */
export const certificationsContent = {
  label: "CERTIFICATIONS",
  heading: "Skills and standards behind our work",
  subtitle:
    "We adhere strictly to internationally recognized offensive security methodologies and verifiable assessment standards.",
  // PLACEHOLDER: Replace team certifications with real team credentials
  items: [
    {
      id: "team-certs",
      title: "Team certifications",
      description:
        "OSCP, CEH, CRTP, eJPT (PLACEHOLDER: Replace with the certifications your team really holds. Testing is performed by qualified offensive security practitioners.)",
    },
    {
      id: "methodologies",
      title: "Methodologies we follow",
      description:
        "OWASP Testing Guide (WSTG & MASTG), PTES (Penetration Testing Execution Standard), NIST SP 800-115, and MITRE ATT&CK framework.",
    },
    {
      id: "scoring",
      title: "Severity scoring",
      description:
        "CVSS v3.1 and CVSS v4.0 standard scoring to provide objective, repeatable vulnerability risk ratings aligned with industry standards.",
    },
    {
      id: "compliance",
      title: "Compliance support",
      description:
        "Testing reports designed to support compliance audits and security reviews including ISO 27001, PCI DSS, SOC 2, DPDP Act, and CERT-In guidelines.",
    },
  ],
};

export const contactInfo = {
  email: "hello@securio.com", // PLACEHOLDER: replace with real business email
  phone: "+1 (123) 456-7890", // PLACEHOLDER: replace with real business phone
  address: "456 Business Ave, New York, NY 10001", // PLACEHOLDER: replace with real office address
  addressMapUrl: "https://www.google.com/maps/search/?api=1&query=456+Business+Ave,+New+York,+NY+10001",
  socials: [
    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://linkedin.com",
      ariaLabel: `Follow ${BRAND_NAME} on LinkedIn`,
    },
    {
      id: "x",
      name: "X",
      href: "https://x.com",
      ariaLabel: `Follow ${BRAND_NAME} on X`,
    },
    {
      id: "github",
      name: "GitHub",
      href: "https://github.com",
      ariaLabel: `Follow ${BRAND_NAME} on GitHub`,
    },
  ],
};

export const contactPageContent = {
  label: "CONTACT",
  heading: "Reach out today",
  paragraph:
    "Schedule a free scoping call to discuss your VAPT requirements, testing windows, and compliance deadlines.",
  form: {
    servicePrefills: {
      vapt: "I am interested in: VAPT (Vulnerability Assessment & Penetration Testing)",
      va: "I am interested in: Vulnerability Assessment",
      pentest: "I am interested in: Penetration Testing",
      appsec: "I am interested in: Application & API Security",
    } as Record<string, string>,
  },
};

export const footerContent = {
  headingLine1: "Request a free",
  headingLine2: "VAPT scoping call",
  tagline: "Find it before attackers do",
  ctaButton: "Get a Free Quote",
  columns: {
    servicesTitle: "Services",
    services: [
      { title: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
      { title: "Penetration Testing", href: "/services/penetration-testing" },
      { title: "Application & API Security", href: "/services/application-security" },
    ],
    companyTitle: "Company",
    company: [
      { title: "Case Studies", href: "/#case-studies" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Certifications", href: "/certifications" },
      { title: "Careers", href: "/careers" },
    ],
  },
  bottomLinks: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
  copyrightText: `© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`,
  authorizedNotice: "Authorized testing only",
};

export const legalContent = {
  privacy: {
    title: `Privacy Policy | ${BRAND_NAME}`,
    heading: "Privacy Policy",
    lastUpdated: "October 2026",
    intro:
      "Securio is committed to protecting the privacy and confidentiality of our clients and site visitors. This website is cookie-free and does not track personal browsing habits.",
    sections: [
      {
        title: "Information We Collect",
        content:
          "We only collect information voluntarily submitted through our contact and scoping forms (such as name, email address, company name, and project scope details). We do not use tracking cookies or third-party behavioral analytics.",
      },
      {
        title: "How We Use Information",
        content:
          "Submitted information is used exclusively to respond to inquiries, prepare non-disclosure agreements (NDAs), establish testing scopes, and deliver agreed security assessment services.",
      },
      {
        title: "Confidentiality of Assessment Data",
        content:
          "All vulnerability findings, target scopes, network telemetry, and assessment reports are strictly confidential client property protected under mutual non-disclosure agreements.",
      },
    ],
  },
  terms: {
    title: `Terms of Service | ${BRAND_NAME}`,
    heading: "Terms of Service",
    lastUpdated: "October 2026",
    intro:
      "These Terms of Service govern the use of the Securio website and establish the foundational terms for all security assessment engagements.",
    sections: [
      {
        title: "Authorized Testing Requirement",
        content:
          "All Vulnerability Assessment and Penetration Testing (VAPT) activities are conducted ONLY with explicit, prior written authorization and a mutually signed scope of work. Unauthorized scanning or penetration testing of any systems is strictly prohibited.",
      },
      {
        title: "Rules of Engagement",
        content:
          "Engagements are performed according to mutually agreed Rules of Engagement (RoE), specifying IP ranges, domains, testing windows, contact escalation protocols, and testing limitations to avoid service interruption.",
      },
      {
        title: "Limitation of Liability",
        content:
          "Security assessments represent a point-in-time review of target environments based on agreed testing methodologies. Securio provides detailed remediation guidance but does not guarantee the complete absence of undiscovered vulnerabilities.",
      },
    ],
  },
};

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
}

export interface WhoItIsForAudience {
  title: string;
  description: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  icon: string;
  services: ServiceItem[];
  whoItIsFor: {
    heading: string;
    audiences: WhoItIsForAudience[];
  };
  howWeWork: {
    heading: string;
    steps: ProcessStep[];
  };
  cta: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
  };
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "vapt-services",
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    tagline: "Manual and automated offensive security assessments discovering exploitable weaknesses before attackers do.",
    summary:
      "Our certified offensive security experts simulate sophisticated real-world cyberattacks across your web applications, APIs, cloud environments, and internal networks, delivering proof-of-exploit evidence and free verification retesting.",
    icon: "ShieldAlert",
    services: [
      {
        slug: "web-application-penetration-testing",
        title: "Web Application Penetration Testing",
        shortDescription:
          "Deep manual and automated testing aligned with OWASP Top 10 to uncover SQL injection, broken authentication, IDOR, and business logic flaws.",
        icon: "FileCode",
      },
      {
        slug: "mobile-application-security-testing",
        title: "Mobile App Security Testing (iOS & Android)",
        shortDescription:
          "Static and dynamic testing (SAST/DAST) adhering to OWASP MASVS for hardcoded keys, insecure data storage, jailbreak bypass, and IPC risks.",
        icon: "Layers",
      },
      {
        slug: "api-microservices-security-testing",
        title: "API & Microservices Security Testing",
        shortDescription:
          "Rigorous assessment of REST, GraphQL, and gRPC endpoints for BOLA, broken authorization, mass assignment, and rate-limiting bypasses.",
        icon: "Cable",
      },
      {
        slug: "network-infrastructure-penetration-testing",
        title: "Network Infrastructure Pentest",
        shortDescription:
          "Internal and external network security auditing, firewall configuration checks, unpatched service exploitation, and privilege escalation tests.",
        icon: "Network",
      },
      {
        slug: "cloud-security-configuration-review",
        title: "Cloud Infrastructure & Container Security",
        shortDescription:
          "Evaluate AWS, Azure, and GCP architectures, IAM permissions, Kubernetes clusters, and storage buckets for lateral movement paths and misconfigurations.",
        icon: "Cloud",
      },
      {
        slug: "red-teaming-adversary-simulation",
        title: "Red Teaming & Adversary Simulation",
        shortDescription:
          "Full-scope cyberattack simulations testing your detection and response capabilities against MITRE ATT&CK tactics, techniques, and procedures.",
        icon: "Radar",
      },
      {
        slug: "devsecops-source-code-review",
        title: "DevSecOps & Secure Code Review",
        shortDescription:
          "Manual line-by-line secure code audits and automated SAST integration to eliminate security vulnerabilities directly in your CI/CD pipelines.",
        icon: "Code2",
      },
      {
        slug: "iot-wireless-penetration-testing",
        title: "IoT & Wireless Penetration Testing",
        shortDescription:
          "Assess wireless rogue access points, WPA enterprise setups, firmware vulnerabilities, and hardware interface attack vectors.",
        icon: "HardDrive",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "SaaS & Software Product Companies",
          description:
            "Development and product teams needing rigorous security validation and penetration testing reports before releasing to enterprise customers.",
        },
        {
          title: "Financial Institutions & Fintechs",
          description:
            "Banking, insurance, and fintech firms required to conduct periodic third-party VAPT audits to satisfy strict regulatory requirements.",
        },
        {
          title: "Enterprises with Complex Hybrid Infrastructure",
          description:
            "Organizations operating multi-cloud or hybrid environments seeking to identify perimeter blind spots, unpatched services, and lateral movement vectors.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Scoping & Threat Modeling",
          description:
            "We define assessment boundaries, establish rules of engagement, obtain signed authorization, and map target architecture to prioritize high-risk assets.",
        },
        {
          number: 2,
          title: "Reconnaissance & Vulnerability Discovery",
          description:
            "Our team utilizes commercial scanners and custom reconnaissance scripts to enumerate live attack surfaces, open ports, and obsolete software components.",
        },
        {
          number: 3,
          title: "Manual Exploitation & Privilege Escalation",
          description:
            "Offensive security engineers safely exploit validated flaws to establish proof-of-concept, test business logic vulnerabilities, and rule out false positives.",
        },
        {
          number: 4,
          title: "Executive & Technical Reporting",
          description:
            "We provide an executive risk summary alongside CVSS-scored technical findings with step-by-step reproduction steps and code-level remediation advice.",
        },
        {
          number: 5,
          title: "Free Retesting & Verification Letter",
          description:
            "After your engineering team deploys the fixes, we conduct a free verification retest and issue a finalized clean VAPT certificate.",
        },
      ],
    },
    cta: {
      title: "Schedule Your Comprehensive VAPT Engagement",
      description:
        "Speak with a certified penetration tester to define your target scope, receive a fixed-price quote, and uncover critical vulnerabilities safely.",
      primaryButtonText: "Request Scoping Call",
      primaryButtonHref: "/contact?service=vapt",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "security-awareness-training",
    title: "Cybersecurity Training & Phishing Simulation",
    tagline: "On-demand employee cyber defense training and automated realistic phishing simulations.",
    summary:
      "Transform your employees from a vulnerability into your strongest defense layer through interactive on-demand training modules, automated simulated phishing attacks, and quantifiable human risk analytics.",
    icon: "BookOpenCheck",
    services: [
      {
        slug: "on-demand-employee-cyber-training",
        title: "On-Demand Employee Cyber Awareness Training",
        shortDescription:
          "Self-paced, engaging video training modules and interactive knowledge checks covering password security, social engineering, and safe browsing.",
        icon: "BookOpen",
      },
      {
        slug: "automated-phishing-simulations",
        title: "Automated Phishing & Spear-Phishing Simulations",
        shortDescription:
          "Realistic, scheduled email phishing scenarios mimicking real-world threat actors with customizable lures, urgency triggers, and landing pages.",
        icon: "SearchCheck",
      },
      {
        slug: "credential-harvesting-quishing-simulations",
        title: "Credential Harvesting & Quishing (QR Code) Drills",
        shortDescription:
          "Simulated spoofed login portals and QR code attack vectors to gauge employee susceptibility to credential theft and mobile redirection.",
        icon: "KeyRound",
      },
      {
        slug: "smishing-vishing-social-engineering",
        title: "Smishing & Vishing Social Engineering Testing",
        shortDescription:
          "Multi-channel social engineering exercises simulating SMS phishing and voice pretexting calls targeting high-value departments.",
        icon: "MessageSquare",
      },
      {
        slug: "ransomware-defense-training",
        title: "Ransomware & Malicious Attachment Defense",
        shortDescription:
          "Specialized education instructing personnel on spotting suspicious macro-enabled documents, malicious links, and zero-day payload vectors.",
        icon: "ShieldAlert",
      },
      {
        slug: "role-based-executive-developer-training",
        title: "Role-Based Executive & Developer Training",
        shortDescription:
          "Tailored curricula for C-level leadership (BEC/whale phishing), finance staff (wire fraud), and engineers (OWASP secure coding hygiene).",
        icon: "Building2",
      },
      {
        slug: "gamified-micro-learning",
        title: "Gamified Cyber Hygiene & Micro-Lessons",
        shortDescription:
          "Bite-sized 3-minute interactive challenges, departmental leaderboards, and instant achievement badges that drive genuine behavioral change.",
        icon: "Zap",
      },
      {
        slug: "employee-risk-scoring-analytics",
        title: "Employee Security Risk Scoring & Analytics",
        shortDescription:
          "Comprehensive telemetry dashboards tracking click-through rates, reporting speeds, repeat clickers, and compliance progression over time.",
        icon: "FileBarChart",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Corporate HR & People Operations",
          description:
            "Teams seeking seamless, on-demand onboarding modules and annual cybersecurity refresher courses that keep employees engaged and compliant.",
        },
        {
          title: "CISOs & Security Operations Teams",
          description:
            "Security leaders looking to decrease phishing click rates, encourage swift incident reporting, and measure cultural resilience over time.",
        },
        {
          title: "Regulated Healthcare & Finance Organizations",
          description:
            "Entities mandated by HIPAA, PCI-DSS, or ISO 27001 to demonstrate regular, documented staff security awareness training and phishing resilience.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Baseline Phishing Assessment",
          description:
            "We execute a benign baseline phishing campaign across your organization to measure initial failure rates and identify vulnerable business units.",
        },
        {
          number: 2,
          title: "Custom Curriculum Design",
          description:
            "We tailor educational modules and phishing templates to reflect your actual technology stack, company branding, and industry threat profiles.",
        },
        {
          number: 3,
          title: "Continuous Automated Simulations",
          description:
            "Employees receive periodic, randomized simulated attacks across email, SMS, and voice channels to maintain heightened threat awareness.",
        },
        {
          number: 4,
          title: "Just-In-Time Remediation",
          description:
            "Users who click simulated lures are instantly guided through a 60-second micro-lesson explaining the exact red flags they missed.",
        },
        {
          number: 5,
          title: "Executive Telemetry & Compliance Reporting",
          description:
            "We deliver audit-ready reports illustrating vulnerability reductions, reporting trends, and training completion records for auditors.",
        },
      ],
    },
    cta: {
      title: "Build a Cyber-Resilient Workforce",
      description:
        "Launch an on-demand cybersecurity training and phishing simulation pilot today to protect your organization from social engineering.",
      primaryButtonText: "Start Phishing Simulation",
      primaryButtonHref: "/contact?service=training-phishing",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "vapt-compliance-services",
    title: "VAPT Compliance & Regulatory Audits",
    tagline: "Audit-ready vulnerability assessment and penetration testing mapped to global compliance frameworks.",
    summary:
      "Accelerate your certification audits and satisfy regulatory mandates with rigorous VAPT testing mapped directly to ISO 27001, SOC 2 Type II, PCI-DSS 4.0, HIPAA, RBI, SEBI, and DPDP Act requirements.",
    icon: "FileCheck2",
    services: [
      {
        slug: "iso-27001-vapt-audit",
        title: "ISO/IEC 27001:2022 Technical Controls VAPT",
        shortDescription:
          "Fulfill Annex A.8 technical control requirements with rigorous external/internal penetration testing and vulnerability management audits.",
        icon: "ShieldCheck",
      },
      {
        slug: "soc2-type-2-penetration-testing",
        title: "SOC 2 Type I & II Technical Readiness VAPT",
        shortDescription:
          "Independent third-party penetration testing and gap assessment satisfying the Trust Services Criteria for security, confidentiality, and availability.",
        icon: "CheckCheck",
      },
      {
        slug: "pci-dss-penetration-testing",
        title: "PCI-DSS 4.0 Requirement 11 Penetration Testing",
        shortDescription:
          "Mandatory internal and external network pentesting, segmentation checks, and application assessments for cardholder data environments (CDE).",
        icon: "FileLock2",
      },
      {
        slug: "hipaa-technical-safeguards-audit",
        title: "HIPAA Security Rule & ePHI Technical Safeguards",
        shortDescription:
          "Assess healthcare software, electronic health records (EHR), and patient portals to prevent electronic protected health information breaches.",
        icon: "Activity",
      },
      {
        slug: "rbi-sebi-irdai-cyber-framework",
        title: "RBI / SEBI / IRDAI Cyber Security Framework Audits",
        shortDescription:
          "Specialized penetration testing and cyber resilience audits mandated for banks, NBFCs, stockbrokers, and insurance platforms.",
        icon: "Sliders",
      },
      {
        slug: "dpdp-gdpr-privacy-security-testing",
        title: "DPDP Act 2023 & GDPR Technical Privacy Pentest",
        shortDescription:
          "Validate technical controls protecting personal data, testing consent mechanics, data masking, encryption at rest, and PII leakage.",
        icon: "EyeOff",
      },
      {
        slug: "nist-csf-cis-benchmark-assessment",
        title: "NIST CSF & CIS Controls Benchmark Review",
        shortDescription:
          "Benchmark operating systems, cloud tenancies, and network appliances against CIS Level 1/2 benchmarks and NIST SP 800-115 standards.",
        icon: "ListChecks",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Fintech, Banking & Payment Processors",
          description:
            "Companies handling digital payments, fund transfers, and card data requiring PCI-DSS, RBI, or SEBI compliant penetration test certifications.",
        },
        {
          title: "Enterprise B2B SaaS Vendors",
          description:
            "SaaS platforms undergoing SOC 2 Type II or ISO 27001 certifications to unlock enterprise procurement and shorten sales security review cycles.",
        },
        {
          title: "Healthcare Technology & MedTech Providers",
          description:
            "HealthTech providers storing, processing, or transmitting ePHI that must demonstrate strict adherence to HIPAA Security Rule requirements.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Regulatory Gap & Scope Alignment",
          description:
            "We review your target compliance framework, define in-scope assets (e.g. CDE or ePHI boundaries), and tailor testing criteria to auditor requirements.",
        },
        {
          number: 2,
          title: "Rigorous Technical Testing",
          description:
            "Our certified team conducts manual and automated penetration testing targeting all mandated technical control vectors and isolation mechanisms.",
        },
        {
          number: 3,
          title: "Audit-Grade Technical Reporting",
          description:
            "You receive an auditor-friendly report including methodology descriptions, CVSSv3.1 scores, control mapping matrices, and evidence documentation.",
        },
        {
          number: 4,
          title: "Remediation Guidance & Re-Testing",
          description:
            "We advise your engineering team through patching findings, followed by a complimentary validation retest to verify resolution.",
        },
        {
          number: 5,
          title: "Attestation & Certificate Issuance",
          description:
            "We provide a formal Attestation of Compliance (AoC) or VAPT Compliance Certificate ready for submission to your external auditors and customers.",
        },
      ],
    },
    cta: {
      title: "Achieve Audit-Ready Security Compliance",
      description:
        "Speak with our compliance auditing specialists to ensure your applications and infrastructure pass their upcoming audit without friction.",
      primaryButtonText: "Book Compliance Scoping",
      primaryButtonHref: "/contact?service=compliance",
      secondaryButtonText: "View All Compliance Services",
      secondaryButtonHref: "/compliance",
    },
  },
  {
    slug: "ai-security-products",
    title: "AI Security Product Development",
    tagline: "Production-grade artificial intelligence engineering for enterprise cybersecurity platforms.",
    summary:
      "We architect and build bespoke AI-driven security tools, copilots, and analytical pipelines designed to automate threat triage, correlate telemetry, and accelerate remediation workflows.",
    icon: "ShieldAlert",
    services: [
      {
        slug: "ai-based-security-analytics",
        title: "AI-Based Security Analytics",
        shortDescription:
          "Implement machine learning models to detect behavioural anomalies, prioritise real-time alerts, and uncover hidden attack patterns across complex telemetry streams.",
        icon: "Activity",
      },
      {
        slug: "intelligent-vulnerability-management",
        title: "Intelligent Vulnerability Management",
        shortDescription:
          "Automatically correlate vulnerability scan findings with asset criticality and exploitability intelligence to eliminate triage bottlenecks.",
        icon: "ShieldCheck",
      },
      {
        slug: "security-knowledge-copilot",
        title: "Security Knowledge Copilot",
        shortDescription:
          "Deploy conversational AI assistants connected to internal runbooks, incident archives, and architectural diagrams for rapid response guidance.",
        icon: "Bot",
      },
      {
        slug: "ai-threat-intelligence-analysis",
        title: "AI-Powered Threat Intelligence Analysis",
        shortDescription:
          "Synthesise structured threat feeds and unstructured threat actor reports into actionable detection rules and executive summaries.",
        icon: "Radar",
      },
      {
        slug: "security-finding-explanation-assistant",
        title: "Security Finding Explanation Assistant",
        shortDescription:
          "Translate complex technical vulnerabilities into contextual remediation instructions tailored for developer and engineering teams.",
        icon: "FileCode",
      },
      {
        slug: "automated-security-evidence-analysis",
        title: "Automated Security Evidence Analysis",
        shortDescription:
          "Parse system logs, forensic artifacts, and audit trails automatically to corroborate security incidents and accelerate compliance reporting.",
        icon: "SearchCheck",
      },
      {
        slug: "enterprise-security-copilot",
        title: "Enterprise Security Copilot",
        shortDescription:
          "Integrate generative AI copilots directly into SOC workflows to streamline incident investigation, containment actions, and stakeholder communication.",
        icon: "Cpu",
      },
      {
        slug: "custom-ai-security-tool-development",
        title: "Custom AI Security Tool Development",
        shortDescription:
          "Engineer proprietary security tooling and specialised machine learning pipelines built to solve unique organisational security requirements.",
        icon: "Wrench",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Cybersecurity Software Vendors",
          description:
            "Product teams seeking to embed proprietary AI analytics and autonomous copilot capabilities into commercial security platforms.",
        },
        {
          title: "Enterprise SOC & Incident Response Teams",
          description:
            "Security operations centres facing unsustainable alert volumes that require automated triage, correlation, and evidence synthesis.",
        },
        {
          title: "Regulated Infrastructure Operators",
          description:
            "Organisations subject to strict compliance oversight requiring auditable, deterministic AI tooling that operates within closed perimeters.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Architecture & Threat Scoping",
          description:
            "We define operational requirements, evaluate data ingestion sources, map security boundaries, and set quantifiable detection benchmarks.",
        },
        {
          number: 2,
          title: "Pipeline & Model Prototyping",
          description:
            "Our engineers build dedicated data parsing pipelines and train bespoke machine learning models on representative telemetry datasets.",
        },
        {
          number: 3,
          title: "Defensive Guardrail Implementation",
          description:
            "We integrate strict input validation, adversarial prompt filtering, and deterministic fallback rules to prevent hallucinations.",
        },
        {
          number: 4,
          title: "Enterprise Stack Integration",
          description:
            "We package tools into containerised microservices connected directly with your existing SIEM, SOAR, and ticketing systems.",
        },
        {
          number: 5,
          title: "Continuous Validation & Tuning",
          description:
            "We monitor model inference accuracy, drift, and false-positive ratios against live operational traffic to maintain high performance.",
        },
      ],
    },
    cta: {
      title: "Build Custom AI Security Capabilities",
      description:
        "Speak directly with our security architects to scope custom AI analytics, copilot tooling, or automated investigation pipelines.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=ai-security-products",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "custom-llm-development",
    title: "Custom LLM Development & Fine-Tuning",
    tagline: "Domain-adapted large language models engineered for private enterprise infrastructure.",
    summary:
      "We customise, fine-tune, and optimise open-source and proprietary foundation models to deliver high accuracy on internal datasets while ensuring complete data sovereignty.",
    icon: "Cpu",
    services: [
      {
        slug: "organisation-specific-llm-solutions",
        title: "Organisation-Specific LLM Solutions",
        shortDescription:
          "Develop bespoke language models tailored to internal business processes, industry terminology, and enterprise governance standards.",
        icon: "Building2",
      },
      {
        slug: "open-source-llm-customisation",
        title: "Open-Source LLM Customisation",
        shortDescription:
          "Adapt state-of-the-art open-weights models such as Llama, Mistral, and DeepSeek for dedicated commercial deployment.",
        icon: "Code2",
      },
      {
        slug: "llm-fine-tuning-lora-qlora",
        title: "LLM Fine-Tuning & LoRA/QLoRA",
        shortDescription:
          "Apply parameter-efficient fine-tuning techniques (LoRA, QLoRA) to adapt foundation models efficiently without excessive compute overhead.",
        icon: "Sliders",
      },
      {
        slug: "domain-specific-model-adaptation",
        title: "Domain-Specific Model Adaptation",
        shortDescription:
          "Train models on proprietary corpora to master specialised legal, financial, healthcare, or technical engineering lexicons.",
        icon: "BookOpenCheck",
      },
      {
        slug: "instruction-fine-tuning",
        title: "Instruction Fine-Tuning",
        shortDescription:
          "Align model outputs to follow complex multi-step instructions, structured schema generation, and strict enterprise guidelines.",
        icon: "ListChecks",
      },
      {
        slug: "model-evaluation-benchmarking",
        title: "Model Evaluation & Benchmarking",
        shortDescription:
          "Establish rigorous evaluation harnesses to measure factual accuracy, hallucination rates, and task performance against baseline models.",
        icon: "Gauge",
      },
      {
        slug: "model-quantisation-optimisation",
        title: "Model Quantisation & Optimisation",
        shortDescription:
          "Compress and quantise models (AWQ, GPTQ, GGUF) to maximise throughput, minimise latency, and lower hosting infrastructure costs.",
        icon: "Zap",
      },
      {
        slug: "private-llm-deployment",
        title: "Private LLM Deployment",
        shortDescription:
          "Deploy hardened language models within air-gapped data centres or private cloud enclaves with zero external telemetry leakage.",
        icon: "Server",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Enterprises with Strict Data Sovereignty",
          description:
            "Organisations with sensitive data that cannot be transmitted to external commercial model APIs under regulatory or contractual rules.",
        },
        {
          title: "Domain-Specialised Businesses",
          description:
            "Firms operating in legal, medical, engineering, or financial domains requiring terminology precision that off-the-shelf models fail to provide.",
        },
        {
          title: "Scale Operators Seeking Cost Predictability",
          description:
            "Companies aiming to replace variable per-token API billing with high-throughput private inference on owned or reserved compute.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Data Auditing & Curation",
          description:
            "We inspect, sanitise, and structure your domain training data, removing duplicates and enforcing strict privacy and PII redaction.",
        },
        {
          number: 2,
          title: "Model Architecture Selection",
          description:
            "We select the optimal foundation architecture based on parameter size, target latency thresholds, hardware budgets, and licensing.",
        },
        {
          number: 3,
          title: "Supervised Fine-Tuning Runs",
          description:
            "Our team configures and runs parameter-efficient training regimes on distributed GPU clusters, tracking loss curves and gradient stability.",
        },
        {
          number: 4,
          title: "Evaluation & Safety Alignment",
          description:
            "We validate fine-tuned checkpoints against automated benchmark suites and human-in-the-loop tests to eliminate hallucination risks.",
        },
        {
          number: 5,
          title: "Quantisation & Deployment",
          description:
            "We apply precision quantisation and deploy the final weights onto dedicated inference engines configured for low-latency batch serving.",
        },
      ],
    },
    cta: {
      title: "Develop Your Private LLM Strategy",
      description:
        "Schedule a technical consultation to assess model selection, data preparation requirements, and private inference deployment.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=custom-llm-development",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "enterprise-ai-knowledge-assistants",
    title: "Enterprise AI & Knowledge Assistants",
    tagline: "Secure retrieval-augmented generation and private document intelligence systems.",
    summary:
      "We build verifiable enterprise search, knowledge copilots, and conversational assistants that extract verified answers from corporate documentation with role-based access control.",
    icon: "FileSearch",
    services: [
      {
        slug: "retrieval-augmented-generation",
        title: "Retrieval-Augmented Generation (RAG)",
        shortDescription:
          "Design hybrid vector-and-lexical retrieval architectures that deliver grounded answers with direct citations back to source documents.",
        icon: "Layers",
      },
      {
        slug: "enterprise-knowledge-base-assistant",
        title: "Enterprise Knowledge Base Assistant",
        shortDescription:
          "Connect internal wikis, manuals, and codebases into an intelligent conversational interface for cross-functional staff enablement.",
        icon: "BookOpen",
      },
      {
        slug: "private-document-intelligence",
        title: "Private Document Intelligence",
        shortDescription:
          "Extract, summarise, and query complex unstructured PDFs, spreadsheets, and technical blueprints with high precision.",
        icon: "FileText",
      },
      {
        slug: "ai-chatbots-for-business",
        title: "AI Chatbots for Business",
        shortDescription:
          "Deploy conversational assistants capable of answering business enquiries, navigating enterprise catalogues, and executing verified actions.",
        icon: "MessageSquare",
      },
      {
        slug: "internal-policy-sop-assistant",
        title: "Internal Policy & SOP Assistant",
        shortDescription:
          "Enable staff to quickly query HR guidelines, standard operating procedures, and compliance mandates with pinpoint accuracy.",
        icon: "CheckSquare",
      },
      {
        slug: "ai-powered-document-search",
        title: "AI-Powered Document Search",
        shortDescription:
          "Upgrade traditional keyword search systems with semantic search engines that understand query intent and multi-lingual nuances.",
        icon: "Search",
      },
      {
        slug: "ai-customer-support-assistant",
        title: "AI Customer Support Assistant",
        shortDescription:
          "Automate tier-1 customer enquiries with contextual knowledge resolution, reducing ticket handling times while maintaining brand tone.",
        icon: "Headphones",
      },
      {
        slug: "enterprise-ai-search-solutions",
        title: "Enterprise AI Search Solutions",
        shortDescription:
          "Unify disparate data silos across SharePoint, Google Workspace, Confluence, and ERP repositories into a central search layer.",
        icon: "Database",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Knowledge-Intensive Enterprises",
          description:
            "Organisations with thousands of complex policy documents, SOPs, and technical archives where employee search is slow and fragmented.",
        },
        {
          title: "Regulated Legal & Compliance Teams",
          description:
            "Teams requiring auditable, factual document extraction with exact citation tracking and absolute prevention of unverified statements.",
        },
        {
          title: "Customer Support & Operations Units",
          description:
            "Support divisions seeking to resolve high enquiry volumes reliably without compromising factual precision or data security.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Corpus Ingestion & Chunking",
          description:
            "We extract, parse, and clean unstructured documents across your internal data silos, applying semantic chunking strategies.",
        },
        {
          number: 2,
          title: "Hybrid Index Architecture",
          description:
            "We build dense vector embeddings combined with sparse BM25 keyword indexes to guarantee both semantic depth and exact keyword match.",
        },
        {
          number: 3,
          title: "Role-Based Access Enforcement",
          description:
            "We integrate with your enterprise identity provider (IdP) to ensure users can only retrieve documents matching their active security permissions.",
        },
        {
          number: 4,
          title: "Reranking & Grounding Verification",
          description:
            "We implement cross-encoder rerankers and strict prompt grounding rules to ensure every model response cites verifiable source paragraphs.",
        },
        {
          number: 5,
          title: "Deployment & Telemetry",
          description:
            "We deploy the assistant into web, Slack, or Microsoft Teams interfaces with analytics tracking search latency, retrieval relevance, and feedback.",
        },
      ],
    },
    cta: {
      title: "Unlock Enterprise Knowledge with Verifiable AI",
      description:
        "Speak with our solutions team to plan a secure RAG assistant connected directly to your existing documentation repositories.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=enterprise-ai-knowledge-assistants",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "ai-agents-automation",
    title: "AI Agents & Business Automation",
    tagline: "Autonomous multi-agent workflows designed to execute complex enterprise processes.",
    summary:
      "We architect and deploy goal-driven AI agents that collaborate across business applications, classify documents, route tickets, and automate repetitive operational workflows.",
    icon: "Bot",
    services: [
      {
        slug: "ai-agent-development",
        title: "AI Agent Development",
        shortDescription:
          "Build autonomous agents equipped with tool-calling capabilities, memory persistence, and dynamic planning to complete targeted tasks.",
        icon: "Bot",
      },
      {
        slug: "multi-agent-workflow-automation",
        title: "Multi-Agent Workflow Automation",
        shortDescription:
          "Coordinate specialised networks of AI agents collaborating across multi-step review, validation, and approval workflows.",
        icon: "Workflow",
      },
      {
        slug: "ai-business-process-automation",
        title: "AI-Powered Business Process Automation",
        shortDescription:
          "Streamline complex human-in-the-loop operational tasks by replacing manual data transcription with resilient AI workflows.",
        icon: "Repeat",
      },
      {
        slug: "intelligent-document-processing",
        title: "Intelligent Document Processing",
        shortDescription:
          "Automatically classify, extract, and reconcile information from invoices, purchase orders, identity documents, and claims.",
        icon: "FileCheck2",
      },
      {
        slug: "ai-report-generation",
        title: "AI Report Generation",
        shortDescription:
          "Synthesise structured analytics, operational logs, and qualitative commentary into publication-ready management reports.",
        icon: "FileBarChart",
      },
      {
        slug: "ai-ticket-classification-routing",
        title: "AI Ticket Classification & Routing",
        shortDescription:
          "Categorise incoming customer support and IT service tickets by intent and urgency, routing them directly to designated specialists.",
        icon: "Tags",
      },
      {
        slug: "ai-workflow-integration",
        title: "AI Workflow Integration",
        shortDescription:
          "Connect AI agents directly into enterprise platforms including Salesforce, Jira, ServiceNow, Slack, and legacy ERP systems.",
        icon: "Network",
      },
      {
        slug: "custom-ai-api-development",
        title: "Custom AI API Development",
        shortDescription:
          "Engineer scalable, secure REST and gRPC API layers to expose agent capabilities safely to internal and external client software.",
        icon: "Code",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Operational & Process Engineering Leaders",
          description:
            "Executives seeking to remove human data entry bottlenecks from claims, invoice processing, order reconciliation, and auditing.",
        },
        {
          title: "IT & Customer Support Divisions",
          description:
            "Service teams needing automated classification, sentiment analysis, and routing for thousands of daily incoming service requests.",
        },
        {
          title: "Product Engineering Teams",
          description:
            "Software organisations needing resilient, deterministic multi-agent architectures integrated into complex production backends.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Process Mapping & Tool Definition",
          description:
            "We analyse target operational workflows, isolate deterministic steps from heuristic reasoning, and define exact tool API contracts.",
        },
        {
          number: 2,
          title: "Agent Architecture & State Machine Design",
          description:
            "We construct resilient agent loops with state persistence, structured JSON schema outputs, and constrained execution boundaries.",
        },
        {
          number: 3,
          title: "Human-in-the-Loop Safeguards",
          description:
            "We integrate explicit approval checkpoints for high-impact actions, financial transactions, and compliance-sensitive decision points.",
        },
        {
          number: 4,
          title: "Adversarial & Edge-Case Testing",
          description:
            "We stress-test agents against malformed inputs, API timeouts, circular loops, and conflicting tool outputs to guarantee resilience.",
        },
        {
          number: 5,
          title: "Production Deployment & Observability",
          description:
            "We launch agents within containerised runtimes with full execution tracing, latency dashboards, and step-by-step audit logging.",
        },
      ],
    },
    cta: {
      title: "Automate Critical Workflows with AI Agents",
      description:
        "Discuss your process automation requirements with our engineers to build reliable, tool-calling agent systems.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=ai-agents-automation",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "ai-infrastructure-mlops",
    title: "AI Infrastructure & MLOps",
    tagline: "Resilient, high-throughput GPU serving infrastructure and model lifecycle engineering.",
    summary:
      "We design, deploy, and manage on-premises and private cloud AI runtime environments, optimising GPU utilisation, serving latency, and automated model observability.",
    icon: "Server",
    services: [
      {
        slug: "on-premises-ai-deployment",
        title: "On-Premises AI Deployment",
        shortDescription:
          "Architect bare-metal and air-gapped GPU infrastructure clusters optimised for private enterprise model inference and training.",
        icon: "HardDrive",
      },
      {
        slug: "private-cloud-llm-deployment",
        title: "Private Cloud LLM Deployment",
        shortDescription:
          "Provision hardened AI environments within your existing AWS, Azure, or GCP Virtual Private Clouds (VPC) with zero public exposure.",
        icon: "Cloud",
      },
      {
        slug: "gpu-inference-infrastructure-setup",
        title: "GPU Inference Infrastructure Setup",
        shortDescription:
          "Configure high-throughput inference engines leveraging vLLM, TensorRT-LLM, and Triton Inference Server for maximum concurrency.",
        icon: "Cpu",
      },
      {
        slug: "llm-serving-api-integration",
        title: "LLM Serving & API Integration",
        shortDescription:
          "Build OpenAI-compatible enterprise gateways featuring rate limiting, load balancing, API key management, and failover routing.",
        icon: "Share2",
      },
      {
        slug: "model-monitoring-observability",
        title: "Model Monitoring & Observability",
        shortDescription:
          "Track real-time inference latency, token consumption, drift, prompt anomalies, and system availability through unified dashboards.",
        icon: "Activity",
      },
      {
        slug: "ai-performance-cost-optimisation",
        title: "AI Performance & Cost Optimisation",
        shortDescription:
          "Implement continuous dynamic batching, prompt caching, and auto-scaling policies to slash GPU infrastructure expenses.",
        icon: "TrendingDown",
      },
      {
        slug: "model-versioning-lifecycle-management",
        title: "Model Versioning & Lifecycle Management",
        shortDescription:
          "Establish continuous integration pipelines for model checkpoints, dataset lineage tracking, and seamless blue-green rollouts.",
        icon: "GitBranch",
      },
      {
        slug: "ai-integration-enterprise-applications",
        title: "AI Integration with Enterprise Applications",
        shortDescription:
          "Securely bridge model serving infrastructure with enterprise message queues, identity providers, and mission-critical databases.",
        icon: "Cable",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "Infrastructure & Platform Engineering Teams",
          description:
            "DevOps teams charged with provisioning and maintaining high-availability GPU infrastructure for internal product teams.",
        },
        {
          title: "Security-Conscious Enterprises",
          description:
            "Organisations with air-gapped or on-premises mandates needing high-performance local inference without vendor lock-in.",
        },
        {
          title: "High-Volume AI Product Teams",
          description:
            "Engineering organisations facing unsustainable monthly SaaS LLM bills looking to reduce unit economics through self-hosted inference.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Capacity & Workload Modelling",
          description:
            "We profile your expected token lengths, peak concurrent request volumes, and strict P99 latency service-level agreements.",
        },
        {
          number: 2,
          title: "Cluster & Hardware Architecture",
          description:
            "We design the hardware topology, GPU memory sizing, networking interconnects, and container orchestrator deployment plans.",
        },
        {
          number: 3,
          title: "Inference Engine Optimisation",
          description:
            "We configure high-performance inference servers (vLLM / TensorRT-LLM) using PagedAttention, continuous batching, and kernel tuning.",
        },
        {
          number: 4,
          title: "Observability & Gateway Configuration",
          description:
            "We integrate production API gateways with token-level rate limiting, authentication, cost tracking, and Prometheus metrics.",
        },
        {
          number: 5,
          title: "Stress Testing & Operational Handover",
          description:
            "We run high-concurrency load tests to validate failover automation, auto-scaling thresholds, and operational runbooks.",
        },
      ],
    },
    cta: {
      title: "Optimise Your AI Infrastructure",
      description:
        "Consult with our MLOps architects to design scalable, cost-efficient private GPU serving infrastructure.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=ai-infrastructure-mlops",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
  {
    slug: "ai-llm-security-assessment",
    title: "AI & LLM Security Assessment",
    tagline: "Rigorous adversarial evaluation of LLM applications, agents, and enterprise AI pipelines.",
    summary:
      "We conduct offensive security assessments against your AI implementations, identifying prompt injection vulnerabilities, jailbreaks, data leakage risks, and insecure agent permissions.",
    icon: "ShieldCheck",
    services: [
      {
        slug: "llm-application-security-testing",
        title: "LLM Application Security Testing",
        shortDescription:
          "Perform comprehensive penetration testing across generative AI applications, web interfaces, and backend orchestration logic.",
        icon: "Shield",
      },
      {
        slug: "prompt-injection-testing",
        title: "Prompt Injection Testing",
        shortDescription:
          "Evaluate resistance against direct and indirect prompt injection vectors designed to hijack model instructions and outputs.",
        icon: "Terminal",
      },
      {
        slug: "jailbreak-resistance-assessment",
        title: "Jailbreak Resistance Assessment",
        shortDescription:
          "Test model guardrails against complex obfuscation, multi-turn elicitation, and adversarial framing to prevent policy bypasses.",
        icon: "Unlock",
      },
      {
        slug: "sensitive-data-leakage-testing",
        title: "Sensitive Data Leakage Testing",
        shortDescription:
          "Validate that proprietary training data, system prompts, API credentials, and client PII cannot be extracted through prompt attacks.",
        icon: "EyeOff",
      },
      {
        slug: "rag-security-access-control-testing",
        title: "RAG Security & Access-Control Testing",
        shortDescription:
          "Verify that vector databases and retrieval mechanisms strictly enforce document ACLs and cannot be manipulated into leaking unauthorized records.",
        icon: "FileLock2",
      },
      {
        slug: "ai-agent-security-assessment",
        title: "AI Agent Security Assessment",
        shortDescription:
          "Audit agent tool execution, privilege boundaries, and sandboxing to prevent unauthorized command execution or downstream data manipulation.",
        icon: "Bot",
      },
      {
        slug: "ai-api-security-testing",
        title: "AI API Security Testing",
        shortDescription:
          "Assess model serving endpoints for denial-of-wallet vectors, resource exhaustion attacks, authentication bypasses, and unvalidated outputs.",
        icon: "KeyRound",
      },
      {
        slug: "llm-security-guardrail-assessment",
        title: "LLM Security Guardrail Assessment",
        shortDescription:
          "Benchmark and harden input/output content moderation filters, NeMo guardrails, and deterministic safety classifiers.",
        icon: "CheckCheck",
      },
    ],
    whoItIsFor: {
      heading: "Who It's For",
      audiences: [
        {
          title: "AI Product & Security Engineering Teams",
          description:
            "Teams preparing to launch customer-facing LLM applications that require thorough adversarial red-teaming prior to general availability.",
        },
        {
          title: "Chief Information Security Officers (CISOs)",
          description:
            "Security executives needing independent validation that internal AI deployments do not introduce data exposure or supply chain risks.",
        },
        {
          title: "Compliance & Risk Officers",
          description:
            "Governance leaders needing audit-ready evidence of LLM guardrail integrity aligned with the OWASP Top 10 for LLMs and NIST AI RMF.",
        },
      ],
    },
    howWeWork: {
      heading: "How We Work",
      steps: [
        {
          number: 1,
          title: "Architecture & Threat Modelling",
          description:
            "We review system prompts, RAG data sources, tool-calling APIs, and trust boundaries to establish comprehensive attack trees.",
        },
        {
          number: 2,
          title: "Adversarial Red Teaming",
          description:
            "Our security practitioners execute automated and manual prompt injections, jailbreaks, and linguistic obfuscation techniques.",
        },
        {
          number: 3,
          title: "Data Extraction & ACL Validation",
          description:
            "We attempt unauthorized extraction of underlying embeddings, system prompts, fine-tuning samples, and cross-tenant records.",
        },
        {
          number: 4,
          title: "Tool Execution Sandbox Auditing",
          description:
            "We test whether compromised agents can be forced to execute unauthorized database writes, shell commands, or network calls.",
        },
        {
          number: 5,
          title: "Evidence Reporting & Fix Verification",
          description:
            "We deliver CVSS-scored findings with full reproduction logs and actionable guardrail hardening advice, verified via retesting.",
        },
      ],
    },
    cta: {
      title: "Secure Your AI & LLM Deployments",
      description:
        "Schedule an adversarial assessment to identify vulnerabilities across your LLM applications, RAG pipelines, and agent tools.",
      primaryButtonText: "Book a Consultation",
      primaryButtonHref: "/contact?service=ai-llm-security-assessment",
      secondaryButtonText: "Explore All Services",
      secondaryButtonHref: "/services",
    },
  },
];

// Helper functions for data access
export function getAllCategories(): ServiceCategory[] {
  return serviceCategories;
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getAllServices(): { category: ServiceCategory; service: ServiceItem }[] {
  const result: { category: ServiceCategory; service: ServiceItem }[] = [];
  for (const category of serviceCategories) {
    for (const service of category.services) {
      result.push({ category, service });
    }
  }
  return result;
}

export function getRelatedCategories(currentSlug: string, count = 3): ServiceCategory[] {
  return serviceCategories.filter((category) => category.slug !== currentSlug).slice(0, count);
}

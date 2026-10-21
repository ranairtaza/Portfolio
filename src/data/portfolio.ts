import { Project, Skill, TimelineItem, InterestTopic } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Rana Irtaza Ali Khan',
  handle: 'rana-irtaza',
  systemTitle: 'RANA.OS // v2.4.0',
  role: 'Full-Stack Software Engineer & AI Solutions Architect',
  tagline: 'Engineering resilient web applications, multi-tenant SaaS architectures, and automated business workflows.',
  shortBio:
    'Focused on building high-performance web systems, database architectures, and pragmatic AI integrations that eliminate operational friction and scale real-world businesses.',
  location: 'Pakistan (Available Globally / Remote)',
  email: 'irtaza.contact@gmail.com',
  github: 'https://github.com/rana-irtaza',
  linkedin: 'https://linkedin.com/in/rana-irtaza',
  status: 'Available for Engineering Roles & Technical Consulting',
  educationSummary: 'BS Information Technology • June 2026 • CGPA 3.10 / 4.00',
  currentFocus: 'Multi-Tenant SaaS Architecture • Edge AI Integrations • Systems Reliability',
};

export const PROJECTS: Project[] = [
  {
    id: 'leadmachine',
    slug: 'leadmachine',
    title: 'LeadMachine',
    subtitle: 'Multi-Tenant AI-Assisted Business Intelligence & Lead Qualification Engine',
    category: 'saas',
    status: 'Active Development',
    statusBadge: 'SaaS Prototype',
    description:
      'A multi-tenant SaaS concept designed to streamline prospective client qualification, CRM ingestion, and AI-driven personalized outreach workflows with strict organization-level data isolation.',
    highlights: [
      'Engineered multi-tenant database schema using PostgreSQL and Supabase with Row-Level Security (RLS) policies.',
      'Designed structured AI qualification pipelines converting raw incoming lead parameters into actionable buyer readiness scores.',
      'Constructed modular Next.js App Router frontend with real-time analytics dashboards and lead lifecycle tracking.',
      'Built automated webhook handlers and async task queues for reliable outreach sequence dispatching.',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Prisma',
      'REST APIs',
      'AI Integrations',
      'Vercel',
    ],
    githubUrl: 'https://github.com/rana-irtaza/leadmachine',
    liveUrl: 'https://leadmachine-preview.vercel.app',
    isFeatured: true,
    caseStudy: {
      overview:
        'LeadMachine is a multi-tenant business software architecture conceptualized to solve the high cost and manual friction of qualifying prospective business leads. It bridges the gap between raw web inquiries and CRM-ready pipeline data using contextual AI classification and automated routing.',
      problemStatement:
        'Small-to-medium sales organizations often waste dozens of hours each week triaging unstructured inquiries across multiple communication channels. Existing enterprise CRMs are either prohibitively expensive or lack native tenant-isolated AI pipelines for customized lead scoring.',
      architectureNotes: [
        'Multi-tenant tenancy model with shared database, separate schemas/tenant_id partitioning enforced via PostgreSQL Row-Level Security (RLS).',
        'Next.js App Router utilizing Server Components for cached dashboard rendering and Client Components for dynamic pipeline boards.',
        'Prisma ORM for strict type-safe database queries and migration management.',
        'Structured prompt engineering protocols ensuring deterministic JSON outputs from LLM endpoints for lead scoring.',
      ],
      techStack: [
        'Next.js (App Router)',
        'TypeScript',
        'PostgreSQL',
        'Supabase (Auth & RLS)',
        'Prisma ORM',
        'Tailwind CSS',
        'Vercel Edge Functions',
      ],
      dataFlow: [
        '1. Intake: Raw lead inquiries ingested via public webhook or interactive forms.',
        '2. Validation & Isolation: Middleware verifies tenant credentials and attaches tenant_id context.',
        '3. AI Enrichment: Background edge worker evaluates lead profile against tenant criteria via AI endpoints.',
        '4. Persistence: Verified lead scoring stored with RLS constraints in PostgreSQL.',
        '5. Dispatch: Automated alerts and scheduled email sequences trigger based on score thresholds.',
      ],
      keyChallenges: [
        'Preventing cross-tenant data leaks: Resolved by combining Prisma middleware with database-level PostgreSQL RLS policies.',
        'LLM Latency & Cost Optimization: Implemented aggressive caching of domain classifications and normalized prompt tokens.',
        'State Management: Synchronized multi-stage pipeline dragging with optimistic UI updates.',
      ],
      currentStatus:
        'Active Prototype & Architectural Validation. Core multi-tenant auth, database schemas, and AI pipeline prototypes are implemented. Ongoing work includes webhook integrations and analytics dashboard refinement.',
      futureRoadmap: [
        'Native OAuth integrations for Google Workspace and Microsoft 365.',
        'Self-hosted vector embedding retrieval for custom tenant knowledge bases.',
        'Automated billing and subscription tiers via Stripe webhook orchestration.',
      ],
    },
  },
  {
    id: 'keyabroad',
    slug: 'keyabroad',
    title: 'KeyAbroad 2.0',
    subtitle: 'Educational Consultancy Platform & Student Case Management System',
    category: 'enterprise',
    status: 'Shipped',
    statusBadge: 'Internal Production',
    description:
      'Internal operations and student portal platform developed for KeyAbroad Consultants to manage study abroad applications, university matching, counselor task assignments, and document compliance workflows.',
    highlights: [
      'Developed student dossier management tracking applications across dozens of international universities and visa stages.',
      'Implemented secure document vault with role-based permissions (Counselor, Operations, Management, Student).',
      'Created automated status update pipeline reducing student inquiry volume to counselors by over 40%.',
      'Integrated internal task queues and audit logging for sensitive application submission milestones.',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'Tailwind CSS',
      'REST APIs',
    ],
    githubUrl: 'https://github.com/rana-irtaza/keyabroad-platform',
    isFeatured: true,
    caseStudy: {
      overview:
        'KeyAbroad 2.0 represents the software overhaul of operations at KeyAbroad Consultants. Prior to this platform, application tracking, student communication, and international documentation relied on fragmented spreadsheets and messaging apps.',
      problemStatement:
        'Managing hundreds of overseas university applications involves strict deadlines, country-specific visa documents, and multiple stakeholders. Document misplacement or missed intake deadlines directly impacts student success and agency credibility.',
      architectureNotes: [
        'Modular Next.js architecture separating public marketing pages from authenticated internal operations portals.',
        'Role-Based Access Control (RBAC) governing counselor visibility, ensuring team members only access assigned student portfolios.',
        'Secure object storage with time-limited signed URLs for passport scans, academic transcripts, and visa filings.',
        'Audit trail logging capturing every document approval, stage change, and counselor remark.',
      ],
      techStack: [
        'Next.js App Router',
        'React 19',
        'TypeScript',
        'Supabase Storage & Auth',
        'PostgreSQL',
        'Node.js REST Services',
        'Tailwind CSS',
      ],
      dataFlow: [
        '1. Intake: Counselor registers student profile with academic history and target destinations.',
        '2. Verification: Student uploads credentials to secure vault; counselor reviews and verifies.',
        '3. University Matching: System cross-references GPA, language tests, and deadlines against program matrix.',
        '4. Application Filing: Operations team updates milestone checklist with tracking identifiers.',
        '5. Real-Time Telemetry: Automated email/SMS trigger alerts student on each milestone progression.',
      ],
      keyChallenges: [
        'Handling large file uploads on unreliable network conditions: Implemented chunked client-side uploads with checksum verification.',
        'Complex role matrix: Encapsulated permission checks in declarative Next.js layout middleware.',
      ],
      currentStatus:
        'Shipped and actively powering internal operations at KeyAbroad Consultants. Periodic enhancements deployed for upcoming academic intake cycles.',
      futureRoadmap: [
        'Automated university requirement scraping and eligibility score calculators.',
        'Direct WhatsApp Business API integration for instant milestone notifications.',
      ],
    },
  },
  {
    id: 'biometric-attendance',
    slug: 'biometric-attendance',
    title: 'Biometric Attendance & HR Integration Engine',
    subtitle: 'Hardware-to-Cloud Biometric Ingestion & Automated Attendance Pipeline',
    category: 'automation',
    status: 'Production Architecture',
    statusBadge: 'Production Architecture',
    description:
      'Reliable systems integration bridge connecting physical biometric fingerprint/facial recognition hardware to central HR databases, automating punch reconciliation, shifts, and payroll reporting.',
    highlights: [
      'Architected continuous device ingestion daemon communicating directly over TCP/IP socket protocols.',
      'Created intelligent reconciliation logic handling missed punch-outs, grace periods, and rotating shift schedules.',
      'Engineered automated database synchronization queue preventing duplicate logs and handling network disconnects.',
      'Built administrative inspection dashboard for HR managers with real-time device health telemetry.',
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'SQL',
      'PostgreSQL',
      'REST APIs',
      'Network Protocols (TCP/IP)',
      'Next.js',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/rana-irtaza/biometric-hr-sync',
    isFeatured: true,
    caseStudy: {
      overview:
        'A mission-critical systems engineering initiative bridging physical workplace hardware with cloud business systems. The engine continuously syncs punch events from biometric terminals into HR records without manual flash-drive exports.',
      problemStatement:
        'Physical attendance hardware frequently exists on isolated local network subnets with legacy proprietary protocols. HR personnel had to manually export CSV logs onto thumb drives at month-end, creating high error rates, delayed payroll calculations, and zero real-time attendance visibility.',
      architectureNotes: [
        'Lightweight Node.js integration daemon installed on local gateway to poll or listen for terminal UDP/TCP event packets.',
        'Local SQLite buffer cache ensuring zero data loss during wide-area internet outages.',
        'Idempotent API sync worker submitting punch batches to central PostgreSQL database with transaction deduplication.',
        'Next.js dashboard providing HR administrators with live presence logs, device online status, and discrepancy flags.',
      ],
      techStack: [
        'Node.js (Daemon / Integration Service)',
        'TypeScript',
        'PostgreSQL',
        'Raw TCP/IP Socket Communications',
        'RESTful API Gateway',
        'Next.js (HR Admin Dashboard)',
      ],
      dataFlow: [
        '1. Biometric Scan: Employee scans fingerprint or face at physical terminal.',
        '2. Device Ingestion: Integration daemon extracts timestamp, device ID, and employee biometric ID.',
        '3. Local Buffering: Record queued locally with timestamp to ensure fault tolerance.',
        '4. Cloud Dispatch: Worker pushes payload to central API using TLS and API key authentication.',
        '5. Reconciliation: SQL stored procedures evaluate scan time against employee roster shift to classify as Check-In, Check-Out, Late, or Overtime.',
      ],
      keyChallenges: [
        'Network dropouts between office locations: Solved with local persistent queue and retry backoff.',
        'Duplicate / accidental rapid double-scans: Implemented 60-second de-bouncing window in ingestion logic.',
      ],
      currentStatus:
        'Architecture tested and deployed for production workflow. Currently operating with stable device communication and daily automated sync runs.',
      futureRoadmap: [
        'Webhooks for instant Slack/Discord manager alerts on unexpected absences.',
        'Biometric device configuration management directly from the cloud web portal.',
      ],
    },
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: 'React',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Component architecture, custom hooks, state optimization, and modern React 19 capabilities.',
  },
  {
    name: 'Next.js (App Router)',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad'],
    description: 'Server Components, dynamic routes, streaming SSR, API routes, and optimized client boundaries.',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Strict type modeling, interface contracts, generics, and end-to-end type safety.',
  },
  {
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Asynchronous event loops, DOM manipulation, functional paradigms, and modern syntax.',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad'],
    description: 'Custom design systems, dark interfaces, responsive layouts, and performance-focused styling.',
  },
  {
    name: 'HTML5 & Modern Web APIs',
    category: 'frontend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad'],
    description: 'Semantic markup, accessibility (a11y), dialog/popover APIs, and web standards.',
  },
  {
    name: 'CSS3 & Motion',
    category: 'frontend',
    proficiency: 'Advanced',
    relatedProjectIds: ['leadmachine', 'keyabroad'],
    description: 'CSS Grid, Flexbox, transitions, micro-interactions, and Motion for React.',
  },

  // Backend & Database
  {
    name: 'Node.js',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'High-throughput backend services, daemon processes, socket listeners, and file pipeline processing.',
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Relational modeling, indexing, ACID transactions, complex joins, and stored queries.',
  },
  {
    name: 'SQL',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Data aggregation, window functions, schema design, and query optimization.',
  },
  {
    name: 'Supabase',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad'],
    description: 'Row-Level Security (RLS), real-time subscriptions, secure auth flows, and storage buckets.',
  },
  {
    name: 'Prisma ORM',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine'],
    description: 'Schema modeling, automated migrations, relational querying, and type-safe query generation.',
  },
  {
    name: 'REST APIs',
    category: 'backend',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Designing RESTful resources, rate limiting, error handling, and robust OpenAPI/JSON contracts.',
  },

  // Systems & Tools
  {
    name: 'Git & GitHub',
    category: 'systems',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Version control workflows, trunk-based development, branch management, and code review standards.',
  },
  {
    name: 'Vercel Deployment',
    category: 'systems',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine'],
    description: 'Edge functions, build optimization, environment configuration, and preview environments.',
  },
  {
    name: 'TCP/IP & Hardware Protocols',
    category: 'systems',
    proficiency: 'Advanced',
    relatedProjectIds: ['biometric-attendance'],
    description: 'Socket communication, device polling, buffer caches, and local subnet device integrations.',
  },
  {
    name: 'Linux / Bash',
    category: 'systems',
    proficiency: 'Core',
    relatedProjectIds: ['biometric-attendance'],
    description: 'Shell scripting, daemon service management, cron automation, and server diagnostics.',
  },

  // AI & Automation
  {
    name: 'AI API Integrations',
    category: 'ai-automation',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine'],
    description: 'Structured prompt design, JSON-mode classification, embeddings, and context-window optimization.',
  },
  {
    name: 'Business Automation',
    category: 'ai-automation',
    proficiency: 'Core',
    relatedProjectIds: ['leadmachine', 'keyabroad', 'biometric-attendance'],
    description: 'Workflow orchestration, event-driven webhooks, scheduled sync tasks, and operational elimination of manual data entry.',
  },
  {
    name: 'Multi-Tenant Architecture',
    category: 'ai-automation',
    proficiency: 'Advanced',
    relatedProjectIds: ['leadmachine'],
    description: 'Tenant isolation patterns, schema partitioning, shared resource scaling, and tenant authorization.',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'exp-keyabroad',
    type: 'experience',
    title: 'Software Developer',
    organization: 'KeyAbroad Consultants',
    location: 'Lahore, Pakistan / Hybrid',
    period: '2024 — Present',
    summary:
      'Engineered internal business workflow systems, student case management platform, and biometric hardware attendance synchronization pipelines.',
    achievements: [
      'Built and maintained KeyAbroad 2.0 internal platform, modernizing student application tracking across international university pipelines.',
      'Designed and deployed the Biometric Attendance & HR Integration engine, connecting physical biometric terminals directly to the central PostgreSQL database.',
      'Implemented secure document vault with role-based access for counselors and verification officers.',
      'Reduced manual spreadsheet tracking and attendance reconciliation by over 90% across operational teams.',
    ],
    skillsUsed: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Hardware Integration'],
    verificationBadge: 'Verified Professional Role',
  },
  {
    id: 'edu-bsit',
    type: 'education',
    title: 'Bachelor of Science in Information Technology (BS IT)',
    organization: 'University Degree Program',
    location: 'Pakistan',
    period: 'Completed June 2026',
    summary:
      'Rigorous 4-year undergraduate curriculum focusing on software engineering, database management systems, network architecture, and cyber defense.',
    achievements: [
      'Graduated with Cumulative Grade Point Average of 3.10 / 4.00 (June 2026).',
      'Completed coursework in Advanced Database Systems, Web Engineering, Computer Networks, Operating Systems, Information Security, and Software Architecture.',
      'Applied theoretical computer science principles directly to real-world software engineering and multi-tenant architectures.',
    ],
    skillsUsed: ['Computer Science', 'Software Architecture', 'SQL & RDBMS', 'Computer Networks', 'Cybersecurity', 'Web Systems'],
    verificationBadge: 'CGPA 3.10 / 4.00 • Completed June 2026',
  },
];

export const INTERESTS: InterestTopic[] = [
  {
    title: 'Artificial Intelligence & Agentic Workflows',
    domain: 'Applied AI',
    description:
      'Investigating autonomous AI agents, multi-step tool-calling pipelines, structured output validation, and local LLM deployment patterns for enterprise automation.',
    currentExploration: 'Benchmarking latency and deterministic JSON extraction in Next.js edge functions.',
    iconName: 'Cpu',
  },
  {
    title: 'SaaS Architecture & Bootstrapping',
    domain: 'Entrepreneurship',
    description:
      'Studying sustainable software business models, self-serve onboarding friction reduction, multi-tenant billing models, and product-led growth mechanics.',
    currentExploration: 'Analyzing multi-tenant tenancy tradeoffs (isolated schemas vs. shared tables with RLS).',
    iconName: 'Building2',
  },
  {
    title: 'Cybersecurity & Zero-Trust Defense',
    domain: 'Security',
    description:
      'Exploring modern authentication paradigms, Row-Level Security, API threat vectors, input sanitization, and cryptographic identity verification.',
    currentExploration: 'Hardening Supabase RLS security policies and preventing privilege escalation vectors.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Systems Networking & Hardware Bridging',
    domain: 'Infrastructure',
    description:
      'Practical mechanics of connecting physical workplace hardware, IoT devices, and proprietary TCP/UDP protocols to modern cloud databases.',
    currentExploration: 'Developing lightweight edge daemons that buffer event streams during wide-area network drops.',
    iconName: 'Network',
  },
  {
    title: 'Cloud Infrastructure & High-Availability',
    domain: 'Cloud Systems',
    description:
      'Architecting resilient web infrastructure on Vercel and edge compute, utilizing serverless databases, edge caching, and automated CI/CD pipelines.',
    currentExploration: 'Optimizing Next.js partial pre-rendering and asset cache hierarchies.',
    iconName: 'Cloud',
  },
  {
    title: 'Business Process Automation',
    domain: 'Automation',
    description:
      'Transforming high-friction manual business workflows into automated background jobs, event-driven webhooks, and auditable pipelines.',
    currentExploration: 'Designing human-in-the-loop approval queues for automated workflow transitions.',
    iconName: 'Workflow',
  },
];

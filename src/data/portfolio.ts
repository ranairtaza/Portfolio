import {
  Project,
  SkillCategoryGroup,
  JourneyMilestone,
  BeyondCodeItem,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Rana Irtaza Ali Khan',
  handle: 'ranairtaza',
  systemTitle: 'RANA.OS // Phase 1 Foundation',
  headline: 'I build software that solves real problems.',
  role: 'Full-Stack Software Engineer & AI Solutions Architect',
  supportingText:
    'Specializing in full-stack web applications, resilient multi-tenant SaaS platforms, practical AI integrations, and high-reliability business automation pipelines.',
  aboutNarrative: [
    'I am an Information Technology graduate (BS IT, completed June 2026, CGPA 3.10 / 4.00) focused on engineering software systems that eliminate operational bottlenecks.',
    'At KeyAbroad Consultants, I engineered core internal operational platforms and biometric hardware integration bridges, transforming manual, paper-heavy workflows into automated cloud services.',
    'My core technical curiosity lies at the intersection of robust backend architectures, type-safe full-stack ecosystems, and deterministic AI automation that creates tangible value for businesses.',
  ],
  educationSummary: 'BS Information Technology • Graduated June 2026 • CGPA 3.10 / 4.00',
  location: 'Pakistan (Available Globally / Remote)',
  email: 'irtaza.contact@gmail.com',
  github: 'https://github.com/ranairtaza',
  linkedin: 'https://linkedin.com/in/rana-irtaza',
  bookingUrl: 'mailto:irtaza.contact@gmail.com?subject=Project%20Discovery%20%2F%20Collaboration%20Inquiry',
  status: 'Open for Full-Stack Roles & Technical Consulting',
};

export const PROJECTS: Project[] = [
  {
    id: 'leadmachine',
    slug: 'leadmachine',
    title: 'LeadMachine',
    subtitle: 'Multi-Tenant AI-Assisted Lead Discovery & Outreach Engine',
    category: 'saas',
    categoryLabel: 'SaaS & AI Prototype',
    status: 'Active Development',
    statusBadge: 'Active Prototype',
    description:
      'A multi-tenant SaaS concept designed to streamline prospective client qualification, CRM ingestion, and AI-driven personalized outreach workflows with strict organization-level data isolation.',
    problemStatement:
      'Sales teams waste excessive manual hours reviewing unstructured web inquiries and composing cold emails, while enterprise CRM tools are cost-prohibitive and lack tenant-isolated AI pipelines.',
    highlights: [
      'Multi-tenant database schema built on PostgreSQL with Row-Level Security (RLS) enforcement.',
      'Prompt-engineered qualification pipelines that classify incoming buyer readiness deterministically.',
      'Server-driven Next.js App Router dashboards with real-time stage progression.',
      'Asynchronous webhook receiver queues ensuring reliable message ingestion.',
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
    ],
    githubUrl: 'https://github.com/ranairtaza/Saas-AI',
    liveUrl: 'https://saas-2e91nmukz-ranairtazas-projects.vercel.app/',
    previewImageMock: {
      accentColor: '#67E8F9',
      routeEndpoint: '/api/v1/tenant/lead-qualify',
      terminalSnippet: 'tenant_id=lead_09x • rls_policy=STRICT • readiness_score=88%',
    },
    isFeatured: true,
    caseStudy: {
      overview:
        'LeadMachine is an exploratory multi-tenant architecture designed to validate automated lead scoring and personalized sequence triggering for small-to-medium enterprise sales teams.',
      problemStatement:
        'Triaging inquiries across disparate channels without structured tenant isolation creates data leakage vulnerabilities and excessive manual overhead.',
      architectureNotes: [
        'Shared database tenancy with schema-level tenant partitioning enforced via PostgreSQL RLS.',
        'Prisma ORM for strict compile-time query modeling and relational migration integrity.',
        'Deterministic JSON extraction protocols preventing hallucinated payload shapes.',
      ],
      techStack: [
        'Next.js 16 (App Router)',
        'TypeScript',
        'Tailwind CSS v4',
        'Supabase (PostgreSQL & Auth)',
        'Prisma ORM',
        'Vercel Edge Functions',
      ],
      dataFlow: [
        '1. Intake: Raw lead payload arrives via public tenant webhook endpoint.',
        '2. Verification: Auth middleware validates API token and verifies tenant_id context.',
        '3. AI Analysis: Edge worker parses lead metrics against tenant criteria via AI endpoints.',
        '4. Storage: Evaluated record persisted with row-level tenant constraints in PostgreSQL.',
        '5. Dispatch: Automated notifications and scheduled email sequences trigger.',
      ],
      keyChallenges: [
        'Ensuring tenant isolation: Enforced PostgreSQL RLS policies at the database layer.',
        'LLM response variance: Used strict JSON schema mode and fallback parsers.',
      ],
      currentStatus:
        'Prototype & Architectural Validation. Core multi-tenant auth, schemas, and AI pipeline prototypes are implemented. Ongoing work includes webhook integrations and analytics dashboard refinement.',
      futureRoadmap: [
        'OAuth integration for Google Workspace and Microsoft 365.',
        'Custom tenant vector embedding stores.',
        'Stripe billing integration.',
      ],
    },
  },
  {
    id: 'keyabroad',
    slug: 'keyabroad',
    title: 'KeyAbroad 2.0',
    subtitle: 'Educational Consultancy Platform & Student Case Management System',
    category: 'enterprise',
    categoryLabel: 'Enterprise System',
    status: 'Shipped',
    statusBadge: 'Internal Production',
    description:
      'Internal operations and student portal platform developed for KeyAbroad Consultants to manage study abroad applications, university matching, counselor task assignments, and document compliance workflows.',
    problemStatement:
      'Tracking hundreds of international university applications across visa stages using spreadsheets created high operational latency, lost documentation, and poor student visibility.',
    highlights: [
      'Centralized student dossier system tracking university and visa filing milestones.',
      'Encrypted document vault with time-limited signed URLs and role-based permissions.',
      'Reduced repetitive counselor follow-up calls by 40% through automated milestone progression.',
      'Immutable audit trail recording every verification, stage advance, and document note.',
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
    githubUrl: 'https://github.com/ranairtaza/keyabroad-platform',
    previewImageMock: {
      accentColor: '#A78BFA',
      routeEndpoint: '/portal/students/dossier-review',
      terminalSnippet: 'counselor_rbac=ACTIVE • signed_url_expiry=900s • audit_log=SYNCED',
    },
    isFeatured: true,
    caseStudy: {
      overview:
        'KeyAbroad 2.0 modernized internal workflows at KeyAbroad Consultants, replacing fragmented spreadsheets and messaging chats with a single verified source of truth.',
      problemStatement:
        'International educational admissions require strict compliance, university intake cutoff deadlines, and rigorous document verification. Misplaced papers risked missed student intakes.',
      architectureNotes: [
        'Authenticated operations portal built with Next.js App Router and server-side layout guards.',
        'Role-Based Access Control (RBAC) separating counselors, branch managers, and verification staff.',
        'Secure object storage with cryptographic signed URL access for sensitive credentials.',
      ],
      techStack: [
        'Next.js App Router',
        'TypeScript',
        'Supabase Storage & Auth',
        'PostgreSQL',
        'Node.js REST Services',
        'Tailwind CSS',
      ],
      dataFlow: [
        '1. Intake: Counselor logs student profile, test scores, and target countries.',
        '2. Verification: Student files transcripts to document vault; verification officer reviews.',
        '3. Matching: Platform cross-references GPA and intake dates against institution database.',
        '4. Submission: Team logs university submission identifiers and confirmation codes.',
        '5. Alerts: Automated notifications alert student and counselor on progress.',
      ],
      keyChallenges: [
        'Managing heavy PDF transcript uploads: Implemented chunked client-side uploads with hash validation.',
        'Fine-grained role visibility: Built declarative middleware authorization matrices.',
      ],
      currentStatus:
        'Shipped and actively powering internal operations at KeyAbroad Consultants.',
      futureRoadmap: [
        'Automated university requirement scrapers.',
        'Instant WhatsApp Business milestone dispatch.',
      ],
    },
  },
  {
    id: 'biometric-attendance',
    slug: 'biometric-attendance',
    title: 'Biometric Attendance & HR Integration Engine',
    subtitle: 'Hardware-to-Cloud Biometric Ingestion & Automated Reconciliation Daemon',
    category: 'automation',
    categoryLabel: 'Hardware & Automation',
    status: 'Production Architecture',
    statusBadge: 'Production Architecture',
    description:
      'Reliable systems integration bridge connecting physical biometric fingerprint/facial recognition hardware to central HR databases, automating punch reconciliation, shifts, and payroll reporting.',
    problemStatement:
      'Biometric terminals resided on isolated local network subnets requiring manual USB flash-drive punch exports at month-end, creating high human error rates and delayed payroll.',
    highlights: [
      'Engineered continuous Node.js daemon communicating directly over raw TCP/IP socket protocols.',
      'Built local SQLite fault-tolerant buffer preventing punch event loss during internet downtime.',
      'Created reconciliation algorithm resolving missing check-outs, shift rotations, and overtime.',
      'Eliminated manual thumb-drive log extraction, reducing reconciliation time by over 90%.',
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'SQL',
      'PostgreSQL',
      'TCP/IP Sockets',
      'REST APIs',
      'Next.js',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/ranairtaza/biometric-hr-sync',
    previewImageMock: {
      accentColor: '#38BDF8',
      routeEndpoint: '/daemon/tcp-socket/inbound-punch',
      terminalSnippet: 'socket=PORT_4370 • protocol=TCP_RAW • buffer_queue=0_PENDING',
    },
    isFeatured: true,
    caseStudy: {
      overview:
        'A mission-critical systems engineering initiative bridging physical workplace hardware with cloud business systems without third-party recurring licensing costs.',
      problemStatement:
        'Local office biometric hardware could not natively reach cloud databases over encrypted webhooks, necessitating manual CSV export workflows.',
      architectureNotes: [
        'Lightweight background service daemon installed on the local network gateway.',
        'Persistent transaction buffer ensuring zero data loss during WAN connectivity loss.',
        'Idempotent database sync procedures preventing duplicate punch registration.',
      ],
      techStack: [
        'Node.js (Daemon / Integration Service)',
        'TypeScript',
        'PostgreSQL',
        'Raw TCP/IP Socket Communications',
        'RESTful API Gateway',
        'Next.js (Admin Telemetry Dashboard)',
      ],
      dataFlow: [
        '1. Hardware Scan: Employee scans fingerprint/face at physical terminal.',
        '2. Device Socket: Daemon extracts event timestamp and employee biometric identifier.',
        '3. Local Cache: Event saved to local disk queue immediately for fault tolerance.',
        '4. Cloud Dispatch: Worker batch-pushes records to PostgreSQL via TLS REST endpoints.',
        '5. Reconciliation: Shift rules evaluate punch timestamps for attendance records.',
      ],
      keyChallenges: [
        'Unstable local office internet: Solved with local disk queue and exponential retry backoff.',
        'Rapid duplicate taps: Built a 60-second de-bouncing deduplication window.',
      ],
      currentStatus:
        'Architecture tested and deployed for production workflow with stable automated daily sync.',
      futureRoadmap: [
        'Instant manager Slack alerts for unexpected absence anomalies.',
        'Cloud-controlled terminal user enrollment sync.',
      ],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Component architecture, responsive layouts, and modern web application ecosystems.',
    iconName: 'Layout',
    skills: [
      { name: 'React', level: 'Core', highlight: 'React 19, Custom Hooks, Performance' },
      { name: 'Next.js (App Router)', level: 'Core', highlight: 'Server Components, Streaming, Routing' },
      { name: 'TypeScript', level: 'Core', highlight: 'Strict Typing, Generics, Contracts' },
      { name: 'JavaScript (ESNext)', level: 'Core', highlight: 'Async/Await, Event Loops, Modern Syntax' },
      { name: 'Tailwind CSS v4', level: 'Core', highlight: 'Custom Design Systems, Dark Mode' },
      { name: 'HTML5 & Modern Web APIs', level: 'Core', highlight: 'Semantic DOM, ARIA Accessibility' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'API design, server runtimes, background processing, and integration services.',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 'Core', highlight: 'Async I/O, Services, Stream Processing' },
      { name: 'REST APIs', level: 'Core', highlight: 'Resource Modeling, Rate Limiting, Error Handling' },
      { name: 'Next.js Route Handlers', level: 'Core', highlight: 'Edge Handlers, Webhook Intake' },
      { name: 'Authentication & RBAC', level: 'Core', highlight: 'Session Tokens, Role Permissions' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    description: 'Relational database modeling, query optimization, and secure data access.',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 'Core', highlight: 'Relational Schemas, Constraints, Indexing' },
      { name: 'Supabase', level: 'Core', highlight: 'Row-Level Security (RLS), Auth, Storage' },
      { name: 'Prisma ORM', level: 'Core', highlight: 'Type-Safe Queries, Migration Workflows' },
      { name: 'SQL Query Tuning', level: 'Core', highlight: 'Joins, Aggregations, Transactions' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Structured generative AI pipelines, webhook orchestration, and task automation.',
    iconName: 'Workflow',
    skills: [
      { name: 'AI API Integrations', level: 'Core', highlight: 'Prompt Engineering, Deterministic JSON' },
      { name: 'Business Automation', level: 'Core', highlight: 'Event-Driven Webhooks, Scheduled Tasks' },
      { name: 'Multi-Tenant Design', level: 'Advanced', highlight: 'Tenant Partitioning, Resource Isolation' },
      { name: 'Pipeline Orchestration', level: 'Core', highlight: 'Async Queue Processing, Idempotency' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Tools',
    description: 'Development tooling, deployment platforms, and hardware protocol bridging.',
    iconName: 'Network',
    skills: [
      { name: 'Git & GitHub', level: 'Core', highlight: 'Trunk Development, Code Review Standards' },
      { name: 'Vercel Platform', level: 'Core', highlight: 'Edge Deployments, CI/CD Builds, DNS' },
      { name: 'TCP/IP Sockets', level: 'Core', highlight: 'Raw Socket Protocols, Device Ingestion' },
      { name: 'Linux / Bash', level: 'Core', highlight: 'Daemon Scripting, System Diagnostics' },
    ],
  },
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    description: 'Architectural discipline, developer experience, and software craftsmanship.',
    iconName: 'ShieldCheck',
    skills: [
      { name: 'Type Safety & Contracts', level: 'Core', highlight: 'End-to-end interface integrity' },
      { name: 'Defensive Architecture', level: 'Core', highlight: 'Boundary validation, Fallback states' },
      { name: 'Observability & Auditing', level: 'Core', highlight: 'Audit logs, Error tracing, Heartbeats' },
      { name: 'User-Centric Workflows', level: 'Core', highlight: 'Reducing operational cognitive load' },
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'journey-keyabroad',
    type: 'experience',
    title: 'Software Developer',
    organization: 'KeyAbroad Consultants',
    location: 'Lahore, Pakistan / Hybrid',
    period: '2024 — Present',
    badge: 'Professional Experience',
    summary:
      'Led the software development of internal operational systems, student case management workflows, and hardware biometric data synchronization pipelines.',
    outcomes: [
      'Architected KeyAbroad 2.0 student platform, centralizing applications across dozens of international university intakes.',
      'Constructed the Biometric Attendance & HR Integration engine, automating device punch sync to PostgreSQL.',
      'Implemented role-based security and encrypted document storage with signed URLs.',
      'Eliminated manual spreadsheet tracking and month-end attendance collation by 90%.',
    ],
    stackTags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'TCP/IP Sockets', 'Tailwind CSS'],
  },
  {
    id: 'journey-education',
    type: 'education',
    title: 'Bachelor of Science in Information Technology (BS IT)',
    organization: 'University Degree Program',
    location: 'Pakistan',
    period: 'Completed June 2026',
    badge: 'CGPA 3.10 / 4.00 • June 2026',
    summary:
      'Rigorous 4-year undergraduate degree establishing solid foundations in computer science, relational databases, network engineering, and information security.',
    outcomes: [
      'Graduated with a Cumulative GPA of 3.10 / 4.00 (June 2026).',
      'Completed in-depth coursework in Database Systems, Computer Networks, Software Engineering, Information Security, and Web Architecture.',
      'Applied theoretical computer science and networking protocols to real-world software platforms and socket programming.',
    ],
    stackTags: ['Computer Science', 'RDBMS & SQL', 'Computer Networks', 'Software Architecture', 'Cybersecurity'],
  },
];

export const BEYOND_CODE: BeyondCodeItem[] = [
  {
    id: 'ai-agents',
    title: 'Artificial Intelligence & Agents',
    domain: 'Applied AI',
    description:
      'Investigating autonomous AI agents, multi-step tool calling, structured JSON output validation, and local LLM deployment patterns for enterprise automation.',
    currentNote: 'Benchmarking deterministic schema enforcement and token efficiency.',
    iconName: 'Cpu',
  },
  {
    id: 'saas-bootstrapping',
    title: 'Entrepreneurship & SaaS',
    domain: 'Business Engineering',
    description:
      'Analyzing sustainable bootstrapped software businesses, self-serve onboarding, multi-tenant billing models, and product-led growth mechanics.',
    currentNote: 'Studying multi-tenant tenancy tradeoffs (isolated schemas vs. shared tables with RLS).',
    iconName: 'Building2',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Zero-Trust',
    domain: 'Security',
    description:
      'Exploring modern authentication paradigms, Row-Level Security, API threat vectors, input sanitization, and cryptographic identity verification.',
    currentNote: 'Hardening Supabase RLS security policies and preventing privilege escalation vectors.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'networking',
    title: 'Networking & Systems',
    domain: 'Infrastructure',
    description:
      'Practical mechanics of connecting physical workplace hardware, IoT devices, and proprietary TCP/UDP protocols to modern cloud databases.',
    currentNote: 'Developing lightweight edge daemons that buffer event streams during wide-area network drops.',
    iconName: 'Network',
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    domain: 'Cloud Systems',
    description:
      'Architecting resilient web infrastructure on Vercel and edge compute, utilizing serverless databases, edge caching, and automated CI/CD pipelines.',
    currentNote: 'Optimizing Next.js partial pre-rendering and asset cache hierarchies.',
    iconName: 'Cloud',
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    domain: 'Automation',
    description:
      'Transforming high-friction manual business workflows into automated background jobs, event-driven webhooks, and auditable pipelines.',
    currentNote: 'Designing human-in-the-loop approval queues for automated workflow transitions.',
    iconName: 'Workflow',
  },
  {
    id: 'fitness',
    title: 'Fitness & Physical Discipline',
    domain: 'Personal Discipline',
    description:
      'Consistent physical conditioning, strength training, and endurance as the foundational driver for mental clarity, resilience, and sustained focus.',
    currentNote: 'Treating physical training as a non-negotiable anchor for engineering focus and long-term stamina.',
    iconName: 'Dumbbell',
  },
];

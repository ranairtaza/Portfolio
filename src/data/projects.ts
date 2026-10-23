import { Project } from '../types/portfolio';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'leadmachine',
    slug: 'leadmachine',
    title: 'LeadMachine (SaaS-AI)',
    subtitle: 'Autonomous AI Business Platform for Enterprise Lead Discovery & Intelligence',
    category: 'saas',
    categoryLabel: 'SaaS & AI System',
    status: 'Live',
    statusBadge: 'Live & Active Prototype',
    role: 'Full-Stack Software Engineer & AI System Architect',
    description:
      'An enterprise AI-driven business intelligence and lead qualification platform featuring multi-tenant data architecture, automated prospect enrichment, predictive forecasting, and event-driven workflow automation.',
    problemStatement:
      'Sales and marketing teams burn dozens of hours weekly manually triaging inbound inquiries, researching firmographic data, and crafting custom outreach. Enterprise CRM tools are cost-prohibitive and lack tenant-isolated AI pipelines.',
    solutionSummary:
      'LeadMachine combines a high-performance Next.js 16 App Router frontend with Google AI (Gemini) intelligence, Upstash Redis edge rate limiting, and Inngest background event processing to automate lead qualification deterministically.',
    highlights: [
      'Verified GitHub repository with 41 commits, active Next.js 16 App Router, React 19, and Tailwind v4 stack.',
      'Edge API protection utilizing Upstash Redis token-bucket rate limiting before triggering AI endpoints.',
      'Relational schema migrations managed through Prisma ORM targeting PostgreSQL with strict type safety.',
      'Event-driven asynchronous workflow execution powered by Inngest for resilient background task processing.',
      'Public production deployment live on Vercel with Stripe subscription billing architecture.',
    ],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Prisma ORM',
      'PostgreSQL',
      'Google AI (Gemini)',
      'Upstash Redis',
      'Inngest',
      'Stripe',
      'Vercel',
    ],
    githubUrl: 'https://github.com/ranairtaza/Saas-AI',
    repoAccessType: 'public',
    repoAccessLabel: 'Public GitHub Repository (MIT)',
    liveUrl: 'https://saas-ai-sooty.vercel.app',
    previewImageMock: {
      accentColor: '#67E8F9',
      routeEndpoint: '/api/v1/leads/enrichment-pipeline',
      terminalSnippet: 'ai_engine=Google_Gemini • rate_limit=PASS_REDIS • status=ENRICHED_200',
    },
    isFeatured: true,
    evidence: {
      repoName: 'ranairtaza/Saas-AI',
      repoOwner: 'ranairtaza',
      verifiedCommits: 41,
      primaryLanguage: 'TypeScript',
      license: 'MIT License',
      hasAutomatedTests: true,
      testingDetails:
        'Repository includes automated tests directory (tests/) and npm test script. Validated phase stabilization reports committed to version control.',
      verifiedFiles: [
        'prisma/schema.prisma',
        'prisma.config.ts',
        'migrations/',
        'src/app/',
        'tests/',
        'seed.mjs',
        'phase48_system_command_center_report.md',
        'phase48_1_security_truth_hardening_report.md',
      ],
      publicDeployUrl: 'https://saas-ai-sooty.vercel.app',
      unverifiedClaimsNotice:
        'Microsoft 365 OAuth sync and multi-tenant vector embedding collections are documented as planned future roadmap items; not yet merged into production main.',
    },
    caseStudy: {
      overview:
        'LeadMachine (SaaS-AI) is an autonomous business platform engineered to automate lead discovery, structured firmographic enrichment, predictive outcome scoring, and strategic outreach. Built on Next.js 16 and Prisma ORM, it addresses common operational friction in modern B2B customer acquisition pipelines.',
      problemStatement:
        'Triaging unstructured web inquiries and manual lead research causes severe response delays and lost revenue opportunities. Meanwhile, standard AI implementations often generate non-deterministic responses, lack rate-limiting protection, and risk exposing sensitive tenant context across shared models.',
      targetUsers:
        'B2B sales teams, growth marketing agencies, and software startups requiring automated, high-precision prospect qualification without hiring dedicated research personnel.',
      roleAndContributions: [
        'Designed end-to-end system architecture from database relational schemas to Next.js 16 UI and edge middleware.',
        'Implemented Upstash Redis rate-limiting guards to protect serverless functions and generative AI budget.',
        'Engineered Google AI (Gemini) prompt pipelines enforcing strict JSON schema parsing and fallback states.',
        'Created Prisma migration workflows and seed scripts ensuring database consistency across environments.',
        'Integrated Inngest event handlers for resilient background processing of lead enrichment queues.',
      ],
      techStack: [
        {
          category: 'Frontend & UI Framework',
          items: ['Next.js 16 (App Router)', 'React 19', 'Tailwind CSS v4', 'Lucide React Icons'],
        },
        {
          category: 'Backend & Data Layer',
          items: ['Node.js 22 runtime', 'Prisma ORM', 'PostgreSQL database', 'Prisma Migrations'],
        },
        {
          category: 'AI & Event Orchestration',
          items: ['Google AI (Gemini API)', 'Inngest Event Workers', 'Upstash Redis Rate Limiter'],
        },
        {
          category: 'Billing & Infrastructure',
          items: ['Stripe Checkout & Webhooks', 'Vercel Edge Platform', 'TypeScript Strict Mode'],
        },
      ],
      architecture: {
        summary:
          'A three-tier modern SaaS architecture separating client-side presentation, edge-governed API logic with rate limiting, and an asynchronous data/AI pipeline with PostgreSQL persistence.',
        layers: [
          {
            layerName: '01. Presentation & Client Layer',
            description: 'Fast, responsive Next.js 16 App Router client with server-driven components.',
            components: [
              {
                name: 'Executive Dashboard UI',
                role: 'Interactive overview of lead health, forecasts, and conversion funnels',
                status: 'current',
                tech: 'Next.js 16 + React 19',
              },
              {
                name: 'Lead Discovery & Table View',
                role: 'Sortable, filterable list of prospective leads with enrichment status',
                status: 'current',
                tech: 'Tailwind CSS v4',
              },
              {
                name: 'Tenant Settings & Billing',
                role: 'Subscription tier management and Stripe customer billing portal link',
                status: 'current',
                tech: 'Stripe Elements',
              },
            ],
          },
          {
            layerName: '02. API & Edge Security Layer',
            description: 'Edge-executed middleware and Next.js route handlers with defensive guards.',
            components: [
              {
                name: 'Upstash Redis Rate Limiter',
                role: 'Token-bucket rate limiting defending AI endpoints against abuse & quota exhaustion',
                status: 'current',
                tech: 'Upstash Redis SDK',
              },
              {
                name: 'RBAC Auth & Session Validator',
                role: 'Verifies user permissions before accessing tenant analytics and data mutations',
                status: 'current',
                tech: 'Next.js Route Handlers',
              },
              {
                name: 'Stripe Webhook Receiver',
                role: 'Processes invoice events and subscription state changes idempotently',
                status: 'current',
                tech: 'Stripe Webhooks',
              },
            ],
          },
          {
            layerName: '03. Intelligence & Data Pipeline',
            description: 'AI model orchestration, background task processing, and relational storage.',
            components: [
              {
                name: 'Google AI (Gemini) Intelligence',
                role: 'Analyzes company domains, scores buyer readiness, and structures JSON payloads',
                status: 'current',
                tech: 'Google AI Studio / Gemini API',
              },
              {
                name: 'Inngest Event Orchestrator',
                role: 'Asynchronous task queue handling multi-step lead enrichment with retries',
                status: 'current',
                tech: 'Inngest SDK',
              },
              {
                name: 'Prisma ORM & PostgreSQL',
                role: 'Primary relational datastore holding tenants, leads, logs, and billing state',
                status: 'current',
                tech: 'PostgreSQL + Prisma',
              },
              {
                name: 'Vector Embedding Search',
                role: 'Semantic retrieval across historical CRM conversations',
                status: 'planned',
                tech: 'pgvector / Planned',
                notes: 'Architectural milestone slated for future release.',
              },
            ],
          },
        ],
        dataFlow: [
          {
            step: 1,
            title: 'Lead Intake',
            detail: 'User submits prospect domain or web webhook arrives at /api/leads/ingest.',
            protocol: 'HTTP POST / TLS',
          },
          {
            step: 2,
            title: 'Edge Guard & Rate Limit',
            detail: 'Upstash Redis checks the caller IP/tenant token quota. If exceeded, returns 429 Too Many Requests.',
            protocol: 'Redis REST API',
          },
          {
            step: 3,
            title: 'Event Queue Dispatch',
            detail: 'Valid intake triggers an Inngest event (lead.received) and immediately returns 202 Accepted to caller.',
            protocol: 'Inngest SDK',
          },
          {
            step: 4,
            title: 'AI Enrichment Execution',
            detail: 'Background worker calls Google AI (Gemini) with prompt templates enforcing deterministic JSON schema output.',
            protocol: 'Google AI API',
          },
          {
            step: 5,
            title: 'Relational Persistence',
            detail: 'Prisma client writes verified qualification scores, company size, and category tags to PostgreSQL.',
            protocol: 'Prisma / SQL',
          },
        ],
        verifiedComponents: [
          'Next.js 16 App Router UI',
          'Prisma ORM Schema & Migrations',
          'PostgreSQL Database Connection',
          'Upstash Redis Rate Limiting',
          'Google AI / Gemini Pipeline',
          'Stripe Billing Webhook Integration',
        ],
        plannedComponents: [
          'Vector Embedding Store (pgvector)',
          'Microsoft 365 / Google Workspace Bi-Directional OAuth Mail Sync',
        ],
      },
      engineeringDecisions: [
        {
          title: 'Defensive Edge Rate-Limiting with Upstash Redis',
          context:
            'Generative AI API endpoints incur direct cost per token and are vulnerable to malicious scraping or runaway loops.',
          decision:
            'Implemented Upstash Redis token-bucket rate limiting in middleware before any LLM API invocation or database compute is reached.',
          tradeOffs:
            'Adds a negligible ~15ms network hop to Redis on API requests, but completely eliminates runaway LLM billing spikes and denial-of-wallet vectors.',
          evidence:
            'Verified in repository dependencies and documentation reports (phase48_system_command_center_report.md).',
        },
        {
          title: 'Prisma Schema Migration Discipline over Ad-Hoc DB Writes',
          context:
            'Fast-moving prototype code often introduces database schema drift between local, preview, and production environments.',
          decision:
            'Enforced all database modifications through version-controlled Prisma migration files (migrations/) and explicit prisma.config.ts configuration.',
          tradeOffs:
            'Requires running migration scripts for every schema iteration instead of direct DB mutations, but ensures 100% reproducible environments and type safety.',
          evidence:
            'Repository contains dedicated migrations/ directory and seed.mjs script for deterministic database initialization.',
        },
        {
          title: 'Asynchronous Enrichment Decoupling with Inngest',
          context:
            'Firmographic scraping and LLM evaluation take several seconds, risking serverless HTTP gateway timeouts if handled synchronously.',
          decision:
            'Decoupled HTTP intake from enrichment work using Inngest event queues, returning an immediate 202 response to the user while background jobs execute.',
          tradeOffs:
            'Requires client polling or real-time event updates to reflect completed state, but prevents HTTP 504 timeouts and offers automatic retry backoff.',
          evidence:
            'Implemented and documented in project architecture overview and dependency manifests.',
        },
      ],
      keyChallenges: [
        {
          challenge: 'Preventing LLM Output Hallucinations and Schema Variance',
          solution:
            'Configured Google AI Gemini prompts with strict JSON schema definitions and created Zod validation boundary checks to parse and sanitize all model responses.',
        },
        {
          challenge: 'Database Schema Drift across Environments',
          solution:
            'Maintained explicit version-controlled migrations in the migrations/ folder and automated seed scripts to guarantee reproducible test environments.',
        },
      ],
      securityReliability: [
        {
          area: 'Input Validation & Rate Limiting',
          control:
            'Upstash Redis rate-limiting guards applied on public routes with strict token bucket allocations per IP and tenant ID.',
          scopeOfVerification:
            'Verified via edge middleware configuration and verified documentation reports in repository.',
        },
        {
          area: 'Authentication & RBAC',
          control:
            'Role-based permissions governing administrative endpoints, restricting billing modifications to tenant owner accounts.',
          scopeOfVerification:
            'Route handlers enforce session validation and organization ID matching before executing mutations.',
        },
        {
          area: 'Auditability & Logging',
          control:
            'Audit trails recorded across administrative actions, documented in phase 48 observability and system readiness reports.',
          scopeOfVerification:
            'Committed reports (phase48_system_command_center_report.md) confirm logging standards and verification evidence.',
        },
      ],
      testingVerification: [
        {
          method: 'Automated Test Suite',
          scope: 'Unit and integration tests covering API response shapes and database operations.',
          artifact: 'npm test script & tests/ directory',
        },
        {
          method: 'Observability & Stabilization Audits',
          scope: 'System readiness, rate-limiting validation, and security hardening reviews.',
          artifact: 'phase48_system_command_center_report.md',
        },
      ],
      currentStatus:
        'Live Production Prototype. The core application, AI enrichment pipeline, Prisma migrations, and Stripe integration are deployed and operational at https://saas-ai-sooty.vercel.app.',
      futureRoadmap: [
        'Vector embedding store with pgvector for semantic CRM lookups.',
        'Direct OAuth integration for Microsoft 365 and Google Workspace email dispatch.',
        'Team collaboration workspaces with granular sub-user permissions.',
      ],
    },
    relatedSlugs: ['keyabroad', 'biometric-attendance'],
  },
  {
    id: 'keyabroad',
    slug: 'keyabroad',
    title: 'KeyAbroad 2.0',
    subtitle: 'Educational Consultancy Operations Platform & Student Application Engine',
    category: 'enterprise',
    categoryLabel: 'Enterprise System',
    status: 'Internal Production',
    statusBadge: 'Internal Production',
    role: 'Software Developer (KeyAbroad Consultants)',
    description:
      'Internal operations portal and student case management system built for KeyAbroad Consultants to manage study-abroad applications, counselor task assignments, university program matching, and document compliance.',
    problemStatement:
      'Tracking hundreds of international university applications across visa stages using spreadsheets created high operational latency, lost documentation, and zero student visibility.',
    solutionSummary:
      'Engineered an authenticated monorepo platform using Next.js App Router, Turborepo, Supabase, and PostgreSQL, complete with an encrypted document vault using time-limited signed URLs and Playwright E2E testing.',
    highlights: [
      'Extensive production codebase verified with 179 commits in Turborepo monorepo architecture.',
      'Comprehensive Playwright automated test suite (playwright.config.ts, playwright-results.json).',
      'Secure document vault utilizing time-limited cryptographic signed URLs for sensitive transcripts & IDs.',
      'Documented API architecture with openapi.json specifications and Supabase relational migrations.',
      'Active internal production engine eliminating manual spreadsheet tracking at KeyAbroad Consultants.',
    ],
    technologies: [
      'Next.js (App Router)',
      'React',
      'TypeScript',
      'Turborepo',
      'Supabase',
      'PostgreSQL',
      'Playwright',
      'Tailwind CSS',
      'OpenAPI',
    ],
    githubUrl: 'https://github.com/ranairtaza/Keyabroad',
    repoAccessType: 'public',
    repoAccessLabel: 'Public GitHub Monorepo (179 Commits)',
    previewImageMock: {
      accentColor: '#A78BFA',
      routeEndpoint: '/admin/applications/dossier-review',
      terminalSnippet: 'monorepo=TURBO • playwright=PASSING • signed_url=EXP_900S',
    },
    isFeatured: true,
    evidence: {
      repoName: 'ranairtaza/Keyabroad',
      repoOwner: 'ranairtaza',
      verifiedCommits: 179,
      primaryLanguage: 'TypeScript',
      hasAutomatedTests: true,
      testingDetails:
        'End-to-End test automation configured via Playwright (playwright.config.ts, playwright-report/, and playwright-results.json committed).',
      verifiedFiles: [
        'turbo.json',
        'apps/',
        'packages/',
        'supabase/migrations/',
        'openapi.json',
        'playwright.config.ts',
        'playwright-results.json',
        'DEPLOYMENT.md',
        'CHAT_SUMMARY_AND_HANDOVER.md',
      ],
      publicDeployUrl: 'Internal production platform (Private company deployment)',
      unverifiedClaimsNotice:
        'Live student portal access is restricted to verified KeyAbroad staff and enrolled students; public access to internal database is withheld for data privacy.',
    },
    caseStudy: {
      overview:
        'KeyAbroad 2.0 modernized core operational workflows at KeyAbroad Consultants (Faisalabad, Pakistan). It transitioned admissions counselors and compliance officers from fragmented spreadsheets to a centralized, auditable case management ecosystem.',
      problemStatement:
        'International educational admissions demand strict adherence to university intake deadlines, language proficiency minimums, and visa documentation. Handling student credentials across WhatsApp and spreadsheets created serious data leak risks and delayed filings.',
      targetUsers:
        'Educational counselors, compliance officers, branch managers, and international university applicants.',
      roleAndContributions: [
        'Architected the monorepo structure using Turborepo to unify student application forms and internal counselor portals.',
        'Designed Supabase relational schema migrations covering students, university dossiers, and verification stages.',
        'Constructed encrypted document storage integration with cryptographic signed URLs expiring in 15 minutes.',
        'Wrote automated end-to-end Playwright tests verifying the application progression pipeline.',
        'Created OpenAPI 3.0 route documentation and structured deployment configurations.',
      ],
      techStack: [
        {
          category: 'Monorepo & Build System',
          items: ['Turborepo (turbo.json)', 'npm workspaces', 'apps/ and packages/ architecture'],
        },
        {
          category: 'Frontend & Portals',
          items: ['Next.js App Router', 'React', 'TypeScript', 'Tailwind CSS'],
        },
        {
          category: 'Backend & Data Storage',
          items: ['Supabase Auth & Storage', 'PostgreSQL database', 'Supabase Migrations', 'OpenAPI 3.0'],
        },
        {
          category: 'Quality Assurance & Testing',
          items: ['Playwright E2E Suite', 'Automated Test Results Reporter'],
        },
      ],
      architecture: {
        summary:
          'A Turborepo monorepo separating student intake web applications from administrative counselor dashboards, sharing core TypeScript types, validation logic, and Supabase client bindings.',
        layers: [
          {
            layerName: '01. Monorepo Frontend Applications',
            description: 'Distinct web applications within apps/ sharing centralized design tokens.',
            components: [
              {
                name: 'Student Intake Portal',
                role: 'Public-facing application flow for students to register and upload transcripts',
                status: 'current',
                tech: 'Next.js App Router',
              },
              {
                name: 'Counselor Operations Dashboard',
                role: 'Internal portal for admissions staff to review dossiers and assign university matches',
                status: 'current',
                tech: 'Next.js + Tailwind CSS',
              },
              {
                name: 'Shared UI & Validation Package',
                role: 'Monorepo library for shared forms, validation schemas, and types',
                status: 'current',
                tech: 'packages/ui & packages/types',
              },
            ],
          },
          {
            layerName: '02. Backend Services & Access Control',
            description: 'Supabase authentication and documented RESTful API endpoints.',
            components: [
              {
                name: 'Role-Based Auth Middleware',
                role: 'Separates counselor, manager, and student access boundaries',
                status: 'current',
                tech: 'Supabase Auth',
              },
              {
                name: 'OpenAPI Service Layer',
                role: 'Formally documented route interface for applicant mutations and stage tracking',
                status: 'current',
                tech: 'openapi.json specification',
              },
            ],
          },
          {
            layerName: '03. Secure Storage & Database',
            description: 'PostgreSQL relational persistence and secure object storage.',
            components: [
              {
                name: 'Encrypted Document Vault',
                role: 'Stores academic transcripts, bank letters, and passports with signed URL access',
                status: 'current',
                tech: 'Supabase Storage (Signed URLs)',
              },
              {
                name: 'Relational Application Database',
                role: 'PostgreSQL storing student dossiers, intake deadlines, and counselor audit trails',
                status: 'current',
                tech: 'PostgreSQL + Migrations',
              },
            ],
          },
        ],
        dataFlow: [
          {
            step: 1,
            title: 'Student Profile Creation',
            detail: 'Applicant submits basic academic history and target destinations via the student portal.',
            protocol: 'Next.js Server Actions / TLS',
          },
          {
            step: 2,
            title: 'Document Upload & Storage',
            detail: 'Transcripts and identity documents are pushed directly to Supabase Storage with private ACLs.',
            protocol: 'Encrypted S3 Protocol',
          },
          {
            step: 3,
            title: 'Counselor Review & Signed URL Generation',
            detail: 'Verification officers inspect files by generating short-lived (15-min) signed download links.',
            protocol: 'Cryptographic Signature',
          },
          {
            step: 4,
            title: 'University Program Matching',
            detail: 'Platform evaluates applicant credentials against institution requirements database.',
            protocol: 'PostgreSQL Query',
          },
          {
            step: 5,
            title: 'Automated Status Progression',
            detail: 'Milestone changes update student dashboards and trigger counselor task reminders.',
            protocol: 'Database Events',
          },
        ],
        verifiedComponents: [
          'Turborepo monorepo setup',
          'Playwright automated E2E test suite',
          'Supabase schema and migrations',
          'OpenAPI specification',
          'Secure document upload workflows',
        ],
        plannedComponents: [
          'Automated WhatsApp Business status notifications',
          'Automated university portal scraping engine',
        ],
      },
      engineeringDecisions: [
        {
          title: 'Turborepo Monorepo Architecture for Portal Separation',
          context:
            'Counselors and students required drastically different interfaces, yet needed identical data models and validation logic.',
          decision:
            'Structured the codebase as a Turborepo monorepo with apps/ (intake app and admin dashboard) and packages/ (shared types, UI tokens, and validation schemas).',
          tradeOffs:
            'Increased initial configuration complexity, but eliminated code duplication and guaranteed synchronized API contracts.',
          evidence:
            'Verified by presence of turbo.json, apps/, and packages/ in the GitHub repository (ranairtaza/Keyabroad).',
        },
        {
          title: 'Time-Limited Cryptographic Signed URLs for Sensitive Documents',
          context:
            'Transcripts, financial affidavits, and passport scans are confidential and must never be exposed via public static URLs.',
          decision:
            'Stored files in private storage buckets and generated short-lived (900-second) HMAC signed URLs exclusively upon authenticated staff request.',
          tradeOffs:
            'Requires requesting a fresh URL each time a counselor views an attachment, but eliminates the risk of indexing or credential leakage.',
          evidence:
            'Implemented in Supabase storage integration policies and verified in repository documentation.',
        },
        {
          title: 'Playwright Automated End-to-End Regression Testing',
          context:
            'Admissions workflows involve multi-step form submissions; manual testing during deployment was prone to human error.',
          decision:
            'Implemented automated Playwright tests covering critical user flows, including registration, document upload, and status transitions.',
          tradeOffs:
            'Tests take longer to run than pure unit tests, but provide definitive proof that user-facing workflows operate correctly.',
          evidence:
            'Verified through committed playwright.config.ts, playwright-report/, and playwright-results.json in the repository.',
        },
      ],
      keyChallenges: [
        {
          challenge: 'High-Volume Document Uploads and Network Dropouts',
          solution:
            'Implemented client-side chunked upload logic with sha256 checksum validation to allow resume capability on weak internet connections.',
        },
        {
          challenge: 'Strict Access Boundaries Between Branches and Counselors',
          solution:
            'Enforced declarative Row-Level Security policies in PostgreSQL restricting counselors to dossiers assigned to their branch.',
        },
      ],
      securityReliability: [
        {
          area: 'Data Protection & Cryptography',
          control:
            'Time-limited signed URLs expiring in 15 minutes; private access control lists on all document buckets.',
          scopeOfVerification:
            'Verified via Supabase storage policies and integration test cases.',
        },
        {
          area: 'Authentication & RBAC',
          control:
            'Strict separation of student, counselor, and administrator role capabilities enforced at both middleware and database levels.',
          scopeOfVerification:
            'Verified through Supabase auth checks and Playwright authenticated testing.',
        },
        {
          area: 'Auditability & Logging',
          control:
            'Every stage transition, counselor note, and verification stamp is logged with timestamps and user identifiers.',
          scopeOfVerification:
            'Logged in internal database tables for operational compliance.',
        },
      ],
      testingVerification: [
        {
          method: 'Playwright E2E Automation',
          scope: 'Critical path tests for student onboarding, file uploads, and dossier stage advancing.',
          artifact: 'playwright.config.ts & playwright-results.json',
        },
      ],
      currentStatus:
        'Shipped and operating in production for internal workflows at KeyAbroad Consultants. Codebase actively maintained with 179 commits in GitHub repository.',
      futureRoadmap: [
        'Direct university portal API integrations.',
        'Real-time WhatsApp notification webhooks for applicants.',
      ],
    },
    relatedSlugs: ['leadmachine', 'biometric-attendance'],
  },
  {
    id: 'biometric-attendance',
    slug: 'biometric-attendance',
    title: 'Biometric Attendance & HR Integration Engine',
    subtitle: 'Hardware-to-Cloud Raw TCP/IP Socket Ingestion & Offline-Resilient Sync Daemon',
    category: 'automation',
    categoryLabel: 'Hardware & Systems Integration',
    status: 'Production Architecture',
    statusBadge: 'Production Architecture',
    role: 'Software Developer & Systems Integrator (KeyAbroad Consultants)',
    description:
      'Reliable systems integration bridge connecting physical biometric fingerprint and facial recognition hardware to central HR databases, automating punch reconciliation, shifts, and payroll reporting without recurring third-party licensing fees.',
    problemStatement:
      'Biometric terminals resided on isolated local network subnets requiring manual USB flash-drive punch exports at month-end, creating high human error rates, delayed payroll, and zero real-time attendance visibility.',
    solutionSummary:
      'Engineered a persistent Node.js/TypeScript daemon running on the local office gateway that listens on raw TCP/IP socket port 4370, buffers scans to local SQLite during WAN drops, and pushes batches to cloud PostgreSQL idempotently.',
    highlights: [
      'Low-level socket programming communicating directly over raw TCP/IP protocols on Port 4370.',
      'Local disk persistence queue guaranteeing zero punch data loss during local internet service provider outages.',
      'Idempotent database sync procedures preventing duplicate punch registration from rapid double-taps.',
      'Eliminated manual thumb-drive log extraction, reducing monthly attendance reconciliation time by over 90%.',
      'Deployed on-premises in production at KeyAbroad Consultants (Faisalabad office).',
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'Raw TCP/IP Sockets (Port 4370)',
      'SQLite (Local Buffer)',
      'PostgreSQL',
      'REST APIs',
      'Linux Systemd',
    ],
    repoAccessType: 'proprietary-onprem',
    repoAccessLabel: 'Proprietary Enterprise Software (On-Premises)',
    previewImageMock: {
      accentColor: '#38BDF8',
      routeEndpoint: '/daemon/tcp-socket/inbound-punch',
      terminalSnippet: 'socket=PORT_4370 • protocol=TCP_RAW • buffer_queue=0_PENDING',
    },
    isFeatured: true,
    evidence: {
      primaryLanguage: 'TypeScript / Node.js',
      testingDetails:
        'Physical hardware verification conducted on biometric hardware terminals in Faisalabad, Pakistan office across local office network subnets.',
      unverifiedClaimsNotice:
        'The repository is proprietary internal software deployed on-premises at KeyAbroad Consultants. Source code is withheld from public GitHub hosting to protect local network architecture, device IP assignments, and employee biometric metadata.',
    },
    caseStudy: {
      overview:
        'A mission-critical systems engineering initiative bridging physical workplace biometric hardware with cloud business systems. Designed and deployed at KeyAbroad Consultants, it eliminated legacy manual thumb-drive export workflows with automated, fault-tolerant background synchronization.',
      problemStatement:
        'Workplace biometric attendance terminals operated on an isolated local subnet without built-in cloud webhook capabilities. Office managers were forced to physically visit terminals with USB flash drives at the end of every month, manually parse proprietary CSVs, and reconcile attendance errors in spreadsheets.',
      targetUsers:
        'HR managers, office administrators, and payroll accounting staff.',
      roleAndContributions: [
        'Researched and implemented the biometric device communication protocol over raw TCP/IP sockets.',
        'Engineered an offline-resilient Node.js daemon running continuously on the local network gateway.',
        'Created a local SQLite write-ahead transaction buffer ensuring punches are safely saved before cloud dispatch.',
        'Implemented a 60-second de-bouncing deduplication algorithm handling rapid multi-scans.',
        'Built automated cloud sync workers that batch-push records to PostgreSQL over TLS REST endpoints.',
      ],
      techStack: [
        {
          category: 'Daemon Runtime & Protocol',
          items: ['Node.js (LTS)', 'TypeScript', 'Raw TCP/IP Socket Communications (Port 4370)'],
        },
        {
          category: 'Persistence & Buffering',
          items: ['SQLite (Local Disk Queue)', 'PostgreSQL (Cloud Central DB)', 'SQL Queries'],
        },
        {
          category: 'Deployment & Process Management',
          items: ['Linux Systemd service', 'Automated Healthcheck Heartbeats', 'TLS REST APIs'],
        },
      ],
      architecture: {
        summary:
          'An edge-to-cloud bridge architecture featuring a local gateway daemon that interfaces with physical biometric hardware over TCP sockets, buffers records locally for offline resilience, and syncs batches to cloud PostgreSQL.',
        layers: [
          {
            layerName: '01. Physical Hardware Layer',
            description: 'On-premises biometric terminals recording fingerprint and facial scans.',
            components: [
              {
                name: 'Biometric Attendance Terminals',
                role: 'Hardware capturing employee fingerprint and facial recognition punches',
                status: 'current',
                tech: 'Hardware Terminals (TCP/IP Port 4370)',
              },
              {
                name: 'Local Office Subnet',
                role: 'Isolated LAN connecting terminals to gateway daemon',
                status: 'current',
                tech: 'Static IP Local Network',
              },
            ],
          },
          {
            layerName: '02. Edge Ingestion Daemon',
            description: 'Node.js service deployed on local network gateway PC.',
            components: [
              {
                name: 'TCP/IP Socket Listener',
                role: 'Extracts employee biometric IDs and timestamps from raw socket packet stream',
                status: 'current',
                tech: 'Node.js net module',
              },
              {
                name: 'Local SQLite Disk Buffer',
                role: 'Write-ahead cache ensuring zero punch loss during WAN or ISP downtime',
                status: 'current',
                tech: 'SQLite database',
              },
              {
                name: 'Deduplication Engine',
                role: 'Filters out duplicate scans occurring within a 60-second rolling window',
                status: 'current',
                tech: 'TypeScript logic',
              },
            ],
          },
          {
            layerName: '03. Cloud Synchronization Layer',
            description: 'TLS-encrypted cloud dispatch and database reconciliation.',
            components: [
              {
                name: 'Batch Dispatch Worker',
                role: 'Sends buffered punch events to cloud REST endpoints with exponential backoff',
                status: 'current',
                tech: 'TLS HTTPS REST API',
              },
              {
                name: 'PostgreSQL HR Datastore',
                role: 'Stores verified attendance logs, shift mappings, and payroll calculations',
                status: 'current',
                tech: 'PostgreSQL',
              },
              {
                name: 'Shift Reconciliation Engine',
                role: 'Matches morning check-ins and evening check-outs to calculate overtime and absences',
                status: 'current',
                tech: 'SQL Stored Logic',
              },
            ],
          },
        ],
        dataFlow: [
          {
            step: 1,
            title: 'Employee Biometric Punch',
            detail: 'Employee scans fingerprint or face at physical workplace device.',
            protocol: 'Hardware Sensor',
          },
          {
            step: 2,
            title: 'Raw TCP Socket Packet Extraction',
            detail: 'Daemon receives packet over Port 4370 and parses employee ID and timestamp.',
            protocol: 'TCP RAW / Socket',
          },
          {
            step: 3,
            title: 'Local Disk Cache Write',
            detail: 'Event is immediately committed to local SQLite disk buffer before cloud transmission.',
            protocol: 'SQLite ACID Transaction',
          },
          {
            step: 4,
            title: 'Cloud Batch Dispatch',
            detail: 'Worker polls SQLite buffer and transmits un-synced punches to PostgreSQL over TLS.',
            protocol: 'HTTPS / REST POST',
          },
          {
            step: 5,
            title: 'Idempotent Confirmation',
            detail: 'Upon cloud 200 OK response, local records are marked synced and shift rules evaluate.',
            protocol: 'SQL Update',
          },
        ],
        verifiedComponents: [
          'Raw TCP/IP socket packet parser',
          'Local SQLite write-ahead buffer',
          'Deduplication filter (60s window)',
          'TLS batch dispatch to cloud PostgreSQL',
          'Daily automated shift reconciliation',
        ],
        plannedComponents: [
          'Instant manager Slack alerts for unexpected absence anomalies',
          'Remote terminal user enrollment synchronization from web portal',
        ],
      },
      engineeringDecisions: [
        {
          title: 'Local Disk Buffer Persistence over Direct Cloud Uploads',
          context:
            'Office internet connections frequently experienced brief outages and WAN dropouts; directly posting scans to cloud HTTP APIs caused lost punches.',
          decision:
            'Engineered a local SQLite write-ahead buffer on the local gateway. Punches are committed to disk before any network request is attempted.',
          tradeOffs:
            'Requires running a dedicated service with local storage on the LAN, but guarantees zero punch loss even during extended internet outages.',
          evidence:
            'Validated in production architecture deployed at KeyAbroad Consultants office.',
        },
        {
          title: '60-Second Sliding Deduplication Window',
          context:
            'Employees frequently tapped twice out of habit, causing duplicate punch events that skewed automated shift calculations.',
          decision:
            'Implemented an in-memory and SQLite-backed deduplication filter that ignores identical employee ID punches within 60 seconds.',
          tradeOffs:
            'If an employee legitimately checked in and out within 60 seconds (rare), the second tap is suppressed, but prevents 99% of erroneous double-records.',
          evidence:
            'Implemented in daemon event pipeline and verified in production attendance data.',
        },
        {
          title: 'Raw TCP Socket Interface vs. Vendor Cloud Subscription',
          context:
            'Hardware vendors sell proprietary cloud bridge software with ongoing subscription licenses.',
          decision:
            'Engineered a custom Node.js daemon communicating directly over raw TCP sockets on port 4370.',
          tradeOffs:
            'Required reverse-engineering packet protocols, but saved recurring software licensing fees and yielded complete data ownership.',
          evidence:
            'Verified on physical terminals operating daily on KeyAbroad Consultants network.',
        },
      ],
      keyChallenges: [
        {
          challenge: 'Unstable Local WAN Connectivity',
          solution:
            'Designed local write-ahead SQLite caching with exponential retry backoff, ensuring offline punches sync seamlessly upon reconnection.',
        },
        {
          challenge: 'Missing Evening Punches When Staff Forgot to Scan',
          solution:
            'Built a reconciliation algorithm that flags unmatched morning check-ins and prompts HR managers for single-click verification.',
        },
      ],
      securityReliability: [
        {
          area: 'Hardware & Network Fault Tolerance',
          control:
            'Local SQLite transaction queue retains all punch events indefinitely during internet outages until server acknowledgment is received.',
          scopeOfVerification:
            'Simulated router disconnections; all queued punches verified pushed upon WAN restoration.',
        },
        {
          area: 'Input Validation & Rate Limiting',
          control:
            'Raw socket packet checksum validation and 60-second de-bouncing window filtering out noisy sensor triggers.',
          scopeOfVerification:
            'Tested on physical scanner devices with consecutive repeat taps.',
        },
        {
          area: 'Data Protection & Cryptography',
          control:
            'Transmission from local gateway to cloud PostgreSQL secured via TLS REST endpoints with API secret headers.',
          scopeOfVerification:
            'Inspected packet capture; all external WAN communication encrypted.',
        },
      ],
      testingVerification: [
        {
          method: 'On-Site Hardware Validation',
          scope: 'Live fingerprint and facial scan verification on physical attendance terminals.',
          artifact: 'Hardware terminal verification logs in Faisalabad office',
        },
      ],
      currentStatus:
        'Production Architecture. Deployed and actively reconciling daily staff attendance at KeyAbroad Consultants (Faisalabad office).',
      futureRoadmap: [
        'Slack/WhatsApp alerts for administrative absence anomalies.',
        'Over-the-air biometric user enrollment sync from cloud HR dashboard.',
      ],
    },
    relatedSlugs: ['leadmachine', 'keyabroad'],
  },
  {
    id: 'white-stone',
    slug: 'white-stone',
    title: 'White Stone Consultant Platform',
    subtitle: 'Responsive Client Showcase & Educational Advisory Web Experience',
    category: 'client',
    categoryLabel: 'Client Application',
    status: 'Live',
    statusBadge: 'Live Client Demo',
    role: 'Frontend Software Engineer',
    description:
      'A modern, responsive web application built for White Stone Consultant featuring dynamic service showcases, interactive student consultation inquiry flows, and high Core Web Vitals performance.',
    problemStatement:
      'Consultancy clients needed a lightweight, high-speed web presence to convert visitor inquiries on mobile devices without heavy framework overhead.',
    solutionSummary:
      'Developed a modern React application powered by Vite, Tailwind CSS, and Oxlint linting rules, deployed with high-speed edge caching on Vercel.',
    highlights: [
      'Verified public repository on GitHub (ranairtaza/white-stone-consultant).',
      'Live production deployment at white-stone-consultant-three.vercel.app.',
      'Fast client-side routing, mobile responsive layouts, and modern typography.',
    ],
    technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/ranairtaza/white-stone-consultant',
    repoAccessType: 'public',
    repoAccessLabel: 'Public GitHub Repository',
    liveUrl: 'https://white-stone-consultant-three.vercel.app',
    previewImageMock: {
      accentColor: '#34D399',
      routeEndpoint: '/consultation/inquiry',
      terminalSnippet: 'bundler=VITE • deploy=VERCEL_PROD • status=LIVE_200',
    },
    isFeatured: false,
    evidence: {
      repoName: 'ranairtaza/white-stone-consultant',
      repoOwner: 'ranairtaza',
      verifiedCommits: 3,
      primaryLanguage: 'JavaScript',
      publicDeployUrl: 'https://white-stone-consultant-three.vercel.app',
      verifiedFiles: ['src/', 'public/', 'vite.config.js', 'vercel.json', 'package.json'],
    },
    caseStudy: {
      overview:
        'White Stone Consultant platform is a clean, client-facing responsive web application engineered for an educational advisory consultancy. It focuses on fast page loads, clear service hierarchies, and intuitive inquiry capture on mobile screens.',
      problemStatement:
        'Consultancy visitors on 3G/4G mobile networks experienced high abandonment rates on older, unoptimized corporate templates with heavy JavaScript bundles.',
      targetUsers:
        'Prospective study-abroad students and parents looking for visa guidance and university counseling services.',
      roleAndContributions: [
        'Built modern component architecture using React and Vite for rapid development and lean bundles.',
        'Engineered responsive layouts and accessible consultation forms with Tailwind CSS.',
        'Configured Vercel deployment with edge caching and clean production routing.',
      ],
      techStack: [
        { category: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS', 'JavaScript'] },
        { category: 'Tooling & Deployment', items: ['Oxlint', 'Vercel Platform', 'Git'] },
      ],
      architecture: {
        summary:
          'A lightweight single-page application built on Vite and React, pre-rendered and served from Vercel edge CDN nodes.',
        layers: [
          {
            layerName: '01. Client Interface',
            description: 'Vite-bundled React application optimized for mobile browsing.',
            components: [
              {
                name: 'Service Showcase',
                role: 'Clear presentation of visa and admissions services',
                status: 'current',
                tech: 'React + Tailwind',
              },
              {
                name: 'Inquiry Capture Form',
                role: 'Direct inquiry submission for prospective students',
                status: 'current',
                tech: 'React State',
              },
            ],
          },
          {
            layerName: '02. Edge CDN & Hosting',
            description: 'Vercel edge network providing static asset caching.',
            components: [
              {
                name: 'Vercel Edge CDN',
                role: 'High-speed global content distribution',
                status: 'current',
                tech: 'Vercel Edge Network',
              },
            ],
          },
        ],
        dataFlow: [
          {
            step: 1,
            title: 'Static Asset Delivery',
            detail: 'User requests site; Vercel edge node serves minified HTML, CSS, and JS.',
            protocol: 'HTTP/2 + TLS',
          },
          {
            step: 2,
            title: 'Interactive Consultation Capture',
            detail: 'Visitor submits academic criteria and contact number for callback scheduling.',
            protocol: 'Form POST',
          },
        ],
        verifiedComponents: ['React Vite frontend', 'Vercel edge hosting', 'Responsive mobile layouts'],
        plannedComponents: ['Automated CRM lead webhook integration'],
      },
      engineeringDecisions: [
        {
          title: 'Vite over Heavy Application Frameworks for Client Showcase',
          context:
            'A lightweight marketing and lead capture site does not require complex server-side orchestration.',
          decision:
            'Utilized Vite for minimal bundle overhead, near-instant dev server cold starts, and lean production outputs.',
          tradeOffs:
            'Lacks server-side rendering, but achieves sub-second time-to-interactive on mobile devices.',
          evidence:
            'Verified via vite.config.js and minimal bundle footprint in repository.',
        },
      ],
      keyChallenges: [
        {
          challenge: 'Ensuring High Readability and Visual Polish on Low-End Mobile Screens',
          solution:
            'Implemented fluid typography and high-contrast color pairings tested across varied screen widths.',
        },
      ],
      currentStatus:
        'Live and publicly deployed on Vercel at https://white-stone-consultant-three.vercel.app.',
      futureRoadmap: [
        'Direct CRM webhook integration for automated lead routing.',
      ],
    },
    relatedSlugs: ['keyabroad', 'leadmachine'],
  },
];

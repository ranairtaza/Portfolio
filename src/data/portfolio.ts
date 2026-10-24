import {
  Project,
  SkillCategoryGroup,
  JourneyMilestone,
  BeyondCodeItem,
  ServiceArea,
  Certification,
} from '../types/portfolio';
import { PROJECTS_DATA } from './projects';

export const PERSONAL_INFO = {
  name: 'Rana Irtaza Ali Khan',
  handle: 'ranairtaza',
  systemTitle: 'RANA.OS // Professional Identity & Engineering Portfolio',
  headline: 'I build software that solves real problems.',
  role: 'Full-Stack Developer | SaaS Products | AI Integrations & Business Automation',
  intro:
    'I build web applications and explore AI-powered software products that solve practical business problems. My interests span full-stack development, SaaS architecture, intelligent automation, and reliable software systems.',
  supportingText:
    'I build web applications and explore AI-powered software products that solve practical business problems. My interests span full-stack development, SaaS architecture, intelligent automation, and reliable software systems.',
  aboutNarrative: [
    'I hold a Bachelor of Science in Information Technology (completion June 2026, CGPA 3.1/4.00), giving me a solid grounding in computing principles, relational database design, network architecture, and software development.',
    'At KeyAbroad Consultants, I worked on software development contributions including web application functionality, internal business systems, biometric hardware integrations, and technical SEO to streamline operational workflows.',
    'I am keenly interested in building practical SaaS products and useful business software that automate manual bottlenecks, reduce human error, and deliver measurable operational clarity.',
    'My ongoing focus is on deepening practical engineering skills—emphasizing type safety, clean API contracts, resilient data storage, and deterministic automation.',
    'Beyond day-to-day web development, I actively explore applied artificial intelligence, business automation, cybersecurity fundamentals, cloud computing, and software entrepreneurship.',
  ],
  educationSummary: 'BS Information Technology • Completion June 2026 • CGPA 3.1/4.00',
  location: 'Pakistan (Available for Remote / Hybrid Work)',
  // Configurable email field:
  // Direct email actions (mailto buttons, copy email) are rendered ONLY when a verified email is provided here or via NEXT_PUBLIC_CONTACT_EMAIL.
  // Kept empty by default to prevent displaying unverified or placeholder email addresses.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'irtaza841@gmail.com',
  github: 'https://github.com/ranairtaza',
  linkedin: 'https://linkedin.com/in/rana-irtaza-ali-khan-849859227/',
  bookingUrl: 'https://calendar.app.google/c2aHvSbZivHms8St6',
  status: 'Available for Full-Stack Roles & SaaS Collaborations',
  // Configurable résumé asset location:
  // Place your verified PDF at public/resume.pdf and set hasResumePdf to true (or set NEXT_PUBLIC_HAS_RESUME=true).
  // The download action remains hidden until a real PDF is confirmed to exist.
  resumeUrl: '/resume.pdf',
  hasResumePdf: process.env.NEXT_PUBLIC_HAS_RESUME === 'true' || false,
  avatarUrl: '/avatar.png', // Verified real portrait photo
  education: {
    degree: 'BS Information Technology',
    completion: 'June 2026',
    cgpa: '3.1/4.00',
    extensibleDetails: [
      { label: 'Degree Program', value: 'Bachelor of Science in Information Technology' },
      { label: 'Completion Date', value: 'June 2026' },
      { label: 'Cumulative GPA', value: '3.1 / 4.00' },
      { label: 'Field of Study', value: 'Information Technology & Software Systems' },
    ],
  },
};

export const PROJECTS: Project[] = PROJECTS_DATA;

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-ai-job-search-specialization',
    title: 'Google AI in Job Search Specialization',
    issuer: 'Google Career Certificates',
    issuerType: 'Google',
    issueDate: 'October 11, 2026',
    credentialId: 'RHYOBWVIO2AN',
    verificationUrl: 'https://coursera.org/verify/specialization/RHYOBWVIO2AN',
    certificatePdfUrl: '/certificates/google-ai-job-search-specialization.pdf',
    category: 'ai',
    isFeatured: true,
    summary:
      '4-course advanced specialization authorized by Google and offered through Coursera, focusing on applied artificial intelligence, prompt engineering, structured workflow automation, and intelligent career assistance.',
    skills: [
      'Generative AI Applications',
      'Prompt Structuring',
      'AI Workflow Automation',
      'Strategic Problem Solving',
      'Interview & Communication Prep',
    ],
    subCourses: [
      {
        title: 'Uncover Your Transferable Skills with AI',
        credentialId: '4MOPD30R3JBY',
        verificationUrl: 'https://coursera.org/verify/4MOPD30R3JBY',
        pdfUrl: '/certificates/google-ai-power-skills.pdf',
      },
      {
        title: 'Plan Your Job Search with AI',
        credentialId: '7F54L0U3HDVE',
        verificationUrl: 'https://coursera.org/verify/7F54L0U3HDVE',
        pdfUrl: '/certificates/google-ai-job-search-plan.pdf',
      },
      {
        title: 'Manage Your Job Applications with AI',
        credentialId: '9GD38B1WHVRN',
        verificationUrl: 'https://coursera.org/verify/9GD38B1WHVRN',
        pdfUrl: '/certificates/google-ai-job-applications.pdf',
      },
      {
        title: 'Prepare and Practice for Interviews with AI',
        credentialId: 'CGUVN7DN8BMK',
        verificationUrl: 'https://coursera.org/verify/CGUVN7DN8BMK',
        pdfUrl: '/certificates/google-ai-interview-preparation.pdf',
      },
    ],
  },
  {
    id: 'outskill-generative-ai',
    title: 'Generative AI Mastermind',
    issuer: 'Outskill',
    issuerType: 'Outskill',
    issueDate: 'October 2026',
    certificateImageUrl: '/certificates/outskill-generative-ai.jpg',
    certificatePdfUrl: '/certificates/outskill-generative-ai.pdf',
    category: 'ai',
    isFeatured: true,
    summary:
      'Comprehensive masterclass on generative artificial intelligence, LLM orchestration, intelligent agent frameworks, and applied business automation led by Vaibhav Sisinty.',
    skills: [
      'Generative AI Systems',
      'LLM Integrations',
      'AI Agent Architectures',
      'Productivity Automation',
      'Intelligent Workflows',
    ],
  },
  {
    id: 'cisco-it-customer-support',
    title: 'IT Customer Support Basics',
    issuer: 'Cisco Networking Academy',
    issuerType: 'Cisco',
    issueDate: 'August 31, 2026',
    certificatePdfUrl: '/certificates/cisco-it-customer-support-basics.pdf',
    certificateImageUrl: '/certificates/cisco-it-customer-support-badge.png',
    category: 'networking-support',
    isFeatured: true,
    summary:
      'Official verified credential from the Cisco Networking Academy program certifying expertise in IT support fundamentals, computer troubleshooting, network connectivity triage, and customer technical resolution.',
    skills: [
      'IT Support Fundamentals',
      'System Diagnostics & Troubleshooting',
      'Network Connectivity Triage',
      'Incident Escalation',
      'Customer Technical Support',
    ],
  },
  {
    id: 'google-high-performance-team',
    title: 'Create a High-Performing Team',
    issuer: 'Google Career Certificates',
    issuerType: 'Google',
    issueDate: 'October 9, 2026',
    credentialId: '6WDAJG7BZHSY',
    verificationUrl: 'https://coursera.org/verify/6WDAJG7BZHSY',
    certificatePdfUrl: '/certificates/google-high-performance-team.pdf',
    category: 'business-leadership',
    isFeatured: true,
    summary:
      'Executive course authorized by Google and offered through Coursera focusing on team dynamics, agile cross-functional collaboration, psychological safety, and accountability in high-velocity tech environments.',
    skills: [
      'Cross-Functional Leadership',
      'Agile Team Dynamics',
      'Target Alignment & Execution',
      'Engineering Collaboration',
      'Psychological Safety',
    ],
  },
  {
    id: 'talkpool-internship-experience',
    title: 'Talkpool Pakistan — Engineering Internship Experience',
    issuer: 'Talkpool Pakistan Pvt. Ltd.',
    issuerType: 'Talkpool',
    issueDate: 'July 2026',
    certificatePdfUrl: '/certificates/talkpool-experience-letter.pdf',
    category: 'internship',
    isFeatured: true,
    summary:
      'Official Experience & Verification Letter certifying Rana Irtaza Ali Khan tenure as an Internee at Talkpool Pakistan Pvt. Ltd., actively contributing towards project milestones with dedication and professionalism.',
    skills: [
      'Telecommunications & Network Operations',
      'Hardware & Field Systems',
      'Project Milestones Execution',
      'Enterprise Collaboration',
    ],
  },
  {
    id: 'coursera-google-ads',
    title: 'Google Ads for Beginners',
    issuer: 'Coursera Project Network',
    issuerType: 'Coursera',
    issueDate: 'December 16, 2023',
    credentialId: 'B4RKDEXHYJL2',
    verificationUrl: 'https://coursera.org/verify/B4RKDEXHYJL2',
    certificateImageUrl: '/certificates/coursera-google-ads-for-beginners.png',
    category: 'marketing',
    isFeatured: false,
    summary:
      'Hands-on verified project covering Google Ads campaign design, conversion tracking, keyword optimization, and digital customer acquisition funnel architecture.',
    skills: [
      'Google Ads Campaign Setup',
      'Search Keyword Targeting',
      'Conversion Rate Optimization',
      'PPC Campaign Architecture',
      'Funnel Analytics',
    ],
  },
  {
    id: 'coursera-typeform-ticket-management',
    title: 'Ticket Management with Typeform',
    issuer: 'Coursera Project Network',
    issuerType: 'Coursera',
    issueDate: 'October 11, 2026',
    credentialId: '19PHNSFJE6D3',
    verificationUrl: 'https://coursera.org/verify/19PHNSFJE6D3',
    certificatePdfUrl: '/certificates/coursera-ticket-management-typeform.pdf',
    category: 'business-leadership',
    isFeatured: false,
    summary:
      'Practical guided project implementing structured inbound request forms, automated ticket routing, customer response categorization, and webhook workflows.',
    skills: [
      'Inbound Ticket Routing',
      'Form Architecture & Webhooks',
      'Workflow Automation',
      'CRM & Helpdesk Integrations',
    ],
  },
];


export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'User interface development, client-side state management, and modern component ecosystems.',
    iconName: 'Layout',
    skills: [
      {
        name: 'HTML',
        usageExplanation: 'Semantic DOM architecture, accessible landmarks, form inputs, and SEO-friendly document structures.',
        highlight: 'Semantic HTML5 & Accessibility',
        projects: ['keyabroad', 'leadmachine', 'white-stone', 'biometric-attendance'],
      },
      {
        name: 'CSS',
        usageExplanation: 'Responsive grid & flexbox layouts, Tailwind CSS design systems, dark-mode color tokens, and smooth micro-interactions.',
        highlight: 'Tailwind CSS & Responsive Layouts',
        projects: ['keyabroad', 'leadmachine', 'white-stone'],
      },
      {
        name: 'JavaScript',
        usageExplanation: 'Modern ESNext syntax, asynchronous promises, event loop execution, DOM manipulation, and browser APIs.',
        highlight: 'ESNext & Async Runtimes',
        projects: ['keyabroad', 'leadmachine', 'biometric-attendance', 'white-stone'],
      },
      {
        name: 'React',
        usageExplanation: 'Functional components, hooks, reactive state handling, memoization, and component composition.',
        highlight: 'React 19 & Custom Hooks',
        projects: ['keyabroad', 'leadmachine', 'white-stone'],
      },
      {
        name: 'Next.js',
        usageExplanation: 'App Router architecture, React Server Components, server-side data fetching, dynamic routing, and API route handlers.',
        highlight: 'Next.js App Router & SSR',
        projects: ['keyabroad', 'leadmachine', 'white-stone'],
      },
      {
        name: 'TypeScript',
        usageExplanation: 'Strict type contracts, API request/response validation interfaces, generics, and compile-time error prevention.',
        highlight: 'Strict Typing & Interface Contracts',
        projects: ['leadmachine', 'keyabroad', 'biometric-attendance'],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend and APIs',
    description: 'Server runtimes, HTTP endpoint design, business logic implementation, and system integrations.',
    iconName: 'Server',
    skills: [
      {
        name: 'Node.js',
        usageExplanation: 'Asynchronous event-driven backend runtimes, background scripts, file stream processing, and server-side utilities.',
        highlight: 'Async I/O & Server Handlers',
        projects: ['biometric-attendance', 'keyabroad', 'leadmachine'],
      },
      {
        name: 'REST APIs',
        usageExplanation: 'Resource-oriented HTTP services, JSON payloads, structured error responses, status codes, and webhook consumers.',
        highlight: 'Resource Modeling & Webhooks',
        projects: ['keyabroad', 'leadmachine', 'biometric-attendance'],
      },
      {
        name: 'Server-side application development',
        usageExplanation: 'Developing secure application routes, authentication verification, session validation, and database operations.',
        highlight: 'Auth & Server-Side Handlers',
        projects: ['keyabroad', 'leadmachine'],
      },
      {
        name: 'IT Customer Support & Systems Diagnostics',
        usageExplanation: 'Hardware troubleshooting, operating system triage, network diagnostic commands, and technical customer resolution.',
        highlight: 'Cisco Networking Academy Certified',
        projects: ['biometric-attendance'],
      },
      {
        name: 'Inbound Ticket Management & Webhooks',
        usageExplanation: 'Structured inquiry routing, event webhooks, automated triage pipelines, and CRM/helpdesk synchronization.',
        highlight: 'Coursera & Typeform Certified',
        projects: ['leadmachine', 'keyabroad'],
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases and data access',
    description: 'Relational data modeling, data access layers, query structures, and secure data storage.',
    iconName: 'Database',
    skills: [
      {
        name: 'SQL',
        usageExplanation: 'Writing relational queries, joins, filtering, aggregations, transactional consistency, and data updates.',
        highlight: 'Relational Queries & Joins',
        projects: ['keyabroad', 'biometric-attendance', 'leadmachine'],
      },
      {
        name: 'PostgreSQL',
        usageExplanation: 'Production relational database modeling, relational schemas, constraints, foreign keys, and Row-Level Security policies.',
        highlight: 'Relational Schemas & RLS',
        projects: ['leadmachine', 'keyabroad', 'biometric-attendance'],
      },
      {
        name: 'Oracle',
        usageExplanation: 'Enterprise relational database concepts, schema tables, structured queries, and academic database foundations.',
        highlight: 'Enterprise Database Concepts',
        projects: ['biometric-attendance'],
      },
      {
        name: 'Supabase',
        usageExplanation: 'Managed PostgreSQL infrastructure, authentication, Row-Level Security rule configuration, and secure document storage.',
        highlight: 'Managed Postgres & File Storage',
        projects: ['keyabroad', 'leadmachine'],
      },
      {
        name: 'Prisma',
        usageExplanation: 'Type-safe object-relational mapping, declarative database schemas, relation definitions, and schema migrations.',
        highlight: 'Type-Safe ORM & Migrations',
        projects: ['leadmachine'],
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI and automation',
    description: 'LLM API integration, structured automated workflows, and operational business process elimination.',
    iconName: 'Workflow',
    skills: [
      {
        name: 'LLM integrations',
        usageExplanation: 'Calling language model APIs with prompt constraints, temperature control, and deterministic JSON schema extraction.',
        highlight: 'Structured JSON & Prompts',
        projects: ['leadmachine'],
      },
      {
        name: 'Generative AI & LLM Systems',
        usageExplanation: 'Architecting generative AI applications, model parameter tuning, system instruction design, and AI agent frameworks.',
        highlight: 'Outskill & Google AI Certified',
        projects: ['leadmachine'],
      },
      {
        name: 'Prompt Engineering & Structured JSON Output',
        usageExplanation: 'Designing constrained zero-shot and few-shot prompts with deterministic schema extraction and validation fallbacks.',
        highlight: 'Google AI Specialization Certified',
        projects: ['leadmachine'],
      },
      {
        name: 'AI-assisted workflows',
        usageExplanation: 'Embedding AI assistance into operational pipelines for automated lead triage, summary generation, and task sorting.',
        highlight: 'Pipeline Enrichment & Triage',
        projects: ['leadmachine'],
      },
      {
        name: 'Business process automation',
        usageExplanation: 'Replacing manual data entry and repetitive recordkeeping with event triggers, webhooks, and automated synchronization.',
        highlight: 'Workflow Digitization & Sync',
        projects: ['biometric-attendance', 'keyabroad'],
      },
    ],
  },
  {
    id: 'dev-deployment',
    title: 'Development and deployment',
    description: 'Version control discipline, deployment workflows, technical SEO standards, and application quality assurance.',
    iconName: 'ShieldCheck',
    skills: [
      {
        name: 'Git',
        usageExplanation: 'Branching, staging, committing, merging, resolving conflicts, and maintaining clean commit histories.',
        highlight: 'Version Control & Branching',
        projects: ['leadmachine', 'keyabroad', 'biometric-attendance', 'white-stone'],
      },
      {
        name: 'GitHub',
        usageExplanation: 'Repository management, pull requests, automated webhooks, release tags, and collaborative code reviews.',
        highlight: 'Repository & Code Reviews',
        projects: ['leadmachine', 'keyabroad', 'white-stone'],
      },
      {
        name: 'Vercel',
        usageExplanation: 'Continuous deployment of Next.js applications, preview environments, domain routing, and serverless hosting.',
        highlight: 'Edge Hosting & CI/CD',
        projects: ['leadmachine', 'keyabroad', 'white-stone'],
      },
      {
        name: 'Technical SEO',
        usageExplanation: 'Implementing semantic metadata tags, OpenGraph previews, canonical URLs, robots.txt, and sitemap generation.',
        highlight: 'Metadata & Search Crawlability',
        projects: ['keyabroad', 'white-stone'],
      },
      {
        name: 'Application testing',
        usageExplanation: 'Testing critical application flows, form validation constraints, API status code contracts, and error states.',
        highlight: 'Flow Verification & Quality Checks',
        projects: ['leadmachine', 'keyabroad', 'biometric-attendance'],
      },
      {
        name: 'High-Performance Team Collaboration',
        usageExplanation: 'Agile team dynamics, cross-functional engineering alignment, objective-driven sprints, and psychological safety.',
        highlight: 'Google Certified',
        projects: ['keyabroad'],
      },
      {
        name: 'Google Ads & Digital Funnel Architecture',
        usageExplanation: 'PPC campaign configuration, search keyword targeting, conversion funnel tracking, and landing page alignment.',
        highlight: 'Coursera Project Certified',
        projects: ['white-stone', 'keyabroad'],
      },
    ],
  },
  {
    id: 'exploring',
    title: 'Currently Learning / Exploring',
    description:
      'Active areas of ongoing exploration and technical curiosity. Maintained separately to distinguish active learning from established professional proficiency.',
    iconName: 'Compass',
    isExploringGroup: true,
    skills: [
      {
        name: 'Python',
        usageExplanation: 'Studying Python syntax, scripting utilities, data processing libraries, and backend service integration.',
        highlight: 'Scripting & Data Utilities',
        isExploring: true,
      },
      {
        name: 'Cybersecurity',
        usageExplanation: 'Exploring application security fundamentals, zero-trust patterns, defensive input sanitization, and OWASP top risks.',
        highlight: 'Security Principles & Defense',
        isExploring: true,
      },
      {
        name: 'Networking',
        usageExplanation: 'Deepening understanding of TCP/IP protocol layers, socket programming mechanics, routing tables, and DNS flow.',
        highlight: 'Protocols & Network Sockets',
        isExploring: true,
      },
      {
        name: 'Cloud computing',
        usageExplanation: 'Investigating distributed cloud architectures, container fundamentals, and cloud service configuration.',
        highlight: 'Cloud Architecture Concepts',
        isExploring: true,
      },
      {
        name: 'DevSecOps',
        usageExplanation: 'Studying automated dependency auditing, vulnerability screening in CI/CD pipelines, and secure delivery patterns.',
        highlight: 'Automated Pipeline Security',
        isExploring: true,
      },
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'journey-education',
    type: 'education',
    title: 'BS Information Technology',
    organization: 'Undergraduate Degree Program',
    location: 'Pakistan',
    period: 'Completed June 2026',
    badge: 'CGPA 3.1/4.00',
    summary:
      'Completed a four-year degree in Information Technology covering foundational computer science, relational database management, computer networks, and software engineering.',
    scopeOfContribution:
      'Core academic curriculum focused on systems architecture, data structures, relational query optimization, and networked systems.',
    outcomes: [
      'Degree: Bachelor of Science in Information Technology.',
      'Completed: June 2026 with a verified Cumulative GPA of 3.1 / 4.00.',
      'Studied core computer science topics including Database Systems, Computer Networks, Software Engineering, and Operating Systems.',
      'Built a solid analytical foundation applied to real-world software development and socket-based systems.',
    ],
    stackTags: ['BS Information Technology', 'RDBMS & SQL', 'Computer Networks', 'Software Engineering', 'System Security'],
    extensibleDetails: [
      { label: 'Degree', value: 'BS Information Technology' },
      { label: 'Completion', value: 'June 2026' },
      { label: 'CGPA', value: '3.1 / 4.00' },
      { label: 'Focus Area', value: 'Information Technology & Systems' },
    ],
  },
  {
    id: 'journey-keyabroad',
    type: 'experience',
    title: 'Software Developer',
    organization: 'KeyAbroad Consultants',
    location: 'Faisalabad, Pakistan',
    period: '2024 (Completed)',
    badge: 'Software Development',
    summary:
      'Contributed to software development, web application functionality, internal business systems, and hardware data synchronization to modernize manual operations.',
    scopeOfContribution:
      'Individual software development contributions included developing web interfaces, implementing administrative dashboard features, constructing a biometric hardware integration bridge, and optimizing technical SEO. Broader educational consulting operations belong to the organization.',
    outcomes: [
      'Developed web application functionality and internal dashboard views for student application tracking.',
      'Constructed biometric hardware synchronization engine to bridge physical device punches to a centralized PostgreSQL database.',
      'Configured cloud database access controls, secure document storage with signed URLs, and authenticated counselor workflows.',
      'Implemented technical SEO enhancements, metadata optimization, and responsive user interfaces.',
    ],
    stackTags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'REST APIs', 'Technical SEO', 'Tailwind CSS'],
  },
  {
    id: 'journey-talkpool',
    type: 'experience',
    title: 'Engineering Internee',
    organization: 'Talkpool Pakistan Pvt. Ltd.',
    location: 'Pakistan',
    period: 'July 2026',
    badge: 'Verified Experience Letter',
    summary:
      'Completed an engineering internship at Talkpool Pakistan Pvt. Ltd., actively contributing to project objectives and demonstrating professionalism in technical enterprise operations.',
    scopeOfContribution:
      'Assisted technical team in achieving project deliverables, collaborating on operational targets, and acquiring hands-on enterprise communications engineering exposure.',
    outcomes: [
      'Awarded official Experience Letter from Talkpool Pakistan Pvt. Ltd.',
      'Contributed actively to achieve targets assigned across active enterprise infrastructure projects.',
      'Demonstrated high dedication, technical aptitude, and cross-functional team execution.',
    ],
    stackTags: ['Telecommunications', 'Systems Operations', 'Field Systems', 'Enterprise Infrastructure'],
    extensibleDetails: [
      { label: 'Role', value: 'Internee' },
      { label: 'Company', value: 'Talkpool Pakistan Pvt. Ltd.' },
      { label: 'Document', value: 'Official Experience Letter (PDF Available)' },
    ],
  },
  {
    id: 'journey-saas-experiment',
    type: 'saas-experiment',
    title: 'SaaS Product Experimentation — LeadMachine',
    organization: 'Independent Project (Open Source / Prototype)',
    location: 'Remote',
    period: '2024',
    badge: 'SaaS Architecture Prototype',
    summary:
      'Engineered an AI-powered lead management prototype to explore multi-tenant data architecture, prompt-engineered scoring pipelines, and clean Next.js App Router interfaces.',
    scopeOfContribution:
      'Sole developer responsible for system design, database modeling, Next.js frontend, API endpoints, and LLM structured output parsing.',
    outcomes: [
      'Designed multi-tenant relational schemas with organization-scoped data isolation using PostgreSQL and Prisma ORM.',
      'Integrated LLM endpoints to parse and qualify incoming lead attributes into deterministic JSON responses.',
      'Built interactive pipeline management dashboards with real-time UI updates and responsive controls.',
    ],
    stackTags: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'LLM Integrations', 'Tailwind CSS'],
  },
  {
    id: 'journey-current-focus',
    type: 'current-focus',
    isCurrentFocus: true,
    title: 'Continuous Technical Learning & Systems Exploration',
    organization: 'Self-Directed Engineering Focus',
    location: 'Independent',
    period: 'Current Focus',
    badge: 'Undated / Active Focus',
    summary:
      'An ongoing, undated learning track focused on expanding practical software engineering capabilities, infrastructure understanding, and systems resilience.',
    scopeOfContribution:
      'Active self-study, hands-on experimentation with tools, and building prototype services to broaden technical range.',
    outcomes: [
      'Deepening practical knowledge of Python for backend data services and LLM integration tooling.',
      'Studying cybersecurity fundamentals, secure network architectures, and defensive programming standards.',
      'Investigating cloud computing concepts, containerization, and reliable serverless deployments.',
      'Exploring event-driven workflow automation pipelines and API reliability patterns.',
    ],
    stackTags: ['Python', 'Cybersecurity', 'Cloud Computing', 'Workflow Automation', 'Networking', 'DevSecOps'],
  },
];

export const BEYOND_CODE: BeyondCodeItem[] = [
  {
    id: 'beyond-ai',
    title: 'Artificial Intelligence',
    domain: 'Applied Systems',
    description:
      'Curious about practical applications of language models, prompt structuring, deterministic JSON outputs, and embedding AI assistance into real business software.',
    currentNote: 'Focusing on reliable prompt constraints and error fallbacks rather than open-ended hype.',
    iconName: 'Cpu',
  },
  {
    id: 'beyond-saas',
    title: 'SaaS Entrepreneurship',
    domain: 'Product Strategy',
    description:
      'Interested in how sustainable software products are built and distributed—studying self-serve onboarding, multi-tenant billing models, and solving specific operational pains.',
    currentNote: 'Analyzing multi-tenant tenancy tradeoffs (isolated schemas vs. shared tables with RLS).',
    iconName: 'Building2',
  },
  {
    id: 'beyond-security-networking',
    title: 'Cybersecurity and Networking',
    domain: 'Infrastructure & Defense',
    description:
      'Exploring computer networking fundamentals, TCP/IP socket mechanics, identity verification, API attack surfaces, and defensive security measures.',
    currentNote: 'Gaining an appreciation for zero-trust architectures and Row-Level Security policies.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'beyond-cloud',
    title: 'Cloud Computing',
    domain: 'Systems & Hosting',
    description:
      'Investigating modern cloud platforms, edge compute functions, serverless databases, caching hierarchies, and continuous deployment pipelines.',
    currentNote: 'Studying how modern edge networks and serverless runtimes scale reliably.',
    iconName: 'Cloud',
  },
  {
    id: 'beyond-automation',
    title: 'Workflow Automation',
    domain: 'Operational Efficiency',
    description:
      'Drawn to eliminating manual friction in daily operations—connecting webhooks, background tasks, and scheduled jobs to replace error-prone manual spreadsheets.',
    currentNote: 'Designing automated event sync loops with retry queues for resilient handoffs.',
    iconName: 'Workflow',
  },
  {
    id: 'beyond-fitness',
    title: 'Fitness and Personal Development',
    domain: 'Personal Discipline',
    description:
      'Valuing physical fitness, structured training, and consistent personal routines as key ingredients for mental clarity, resilience, and sustained engineering focus.',
    currentNote: 'Maintaining consistent physical training to balance intense computer problem-solving.',
    iconName: 'Dumbbell',
  },
];

export const SERVICES_DATA: ServiceArea[] = [
  {
    id: 'business-websites',
    title: 'Business Websites & Web Applications',
    badge: 'Web Systems',
    description:
      'Performant, responsive web applications engineered with Next.js, React, and modern CSS. Built with semantic SEO, accessible components, and clean client-server data flow.',
    deliverables: [
      'Responsive, high-conversion web interfaces',
      'Client portals & multi-page applications',
      'Core Web Vitals & performance optimization',
      'Technical SEO, OpenGraph & semantic metadata',
    ],
    suggestedStack: ['Next.js App Router', 'React 19', 'Tailwind CSS', 'TypeScript'],
    iconName: 'Globe',
  },
  {
    id: 'saas-mvps',
    title: 'SaaS MVPs & Product Interfaces',
    badge: 'Product Engineering',
    description:
      'Translating product ideas into production-ready software prototypes with modular UI components, secure authentication, and relational data architecture.',
    deliverables: [
      'Multi-tenant data modeling & schema architecture',
      'Session management & role-based access flows',
      'Interactive product dashboards & onboarding steps',
      'Billing & subscription interface integration',
    ],
    suggestedStack: ['Next.js', 'PostgreSQL', 'Prisma ORM', 'Supabase'],
    iconName: 'Layers',
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Internal Tools',
    badge: 'Operations',
    description:
      'Custom operational control panels that eliminate spreadsheet confusion, centralize organization records, and provide clear administrative visibility.',
    deliverables: [
      'Operational status monitors & metric widgets',
      'Filterable data tables with bulk actions & export',
      'Role-governed CRUD forms & validation schemas',
      'Activity audit trails & operational tracking',
    ],
    suggestedStack: ['React', 'PostgreSQL', 'REST APIs', 'TypeScript'],
    iconName: 'LayoutDashboard',
  },
  {
    id: 'api-integrations',
    title: 'API Integrations & Backend Services',
    badge: 'Backend Architecture',
    description:
      'Connecting external services, building resilient HTTP handlers, consuming webhooks, and synchronizing distributed business records.',
    deliverables: [
      'RESTful endpoints with strict JSON contracts',
      'Webhook receivers & idempotent event processors',
      'Third-party software & cloud storage bridges',
      'Request sanitization & structured error handling',
    ],
    suggestedStack: ['Node.js', 'Next.js Route Handlers', 'TypeScript', 'PostgreSQL'],
    iconName: 'Cpu',
  },
  {
    id: 'ai-workflows',
    title: 'AI-Assisted Business Workflows',
    badge: 'Applied AI',
    description:
      'Embedding deterministic language model workflows into practical business operations: prompt structuring, schema validation, and automated record categorization.',
    deliverables: [
      'Structured LLM prompts with deterministic JSON outputs',
      'Automated inquiry triage & content classification',
      'Pipeline data enrichment & key extraction',
      'API rate-limit handling & graceful fallback routines',
    ],
    suggestedStack: ['LLM APIs', 'Node.js', 'TypeScript', 'Zod / JSON Schema'],
    iconName: 'Sparkles',
  },
];

export const RECRUITER_DOSSIER = {
  headline: 'Professional Summary for Recruiters & Hiring Managers',
  summary:
    'Full-stack developer focused on building reliable web applications, exploring SaaS architectures, and implementing deterministic AI-assisted automation. Strong analytical grounding from BS Information Technology combined with hands-on software development experience at KeyAbroad Consultants.',
  coreCompetencies: [
    {
      area: 'Full-Stack Web Development',
      detail:
        'TypeScript, Next.js App Router, React 19, Node.js, and modern CSS/Tailwind design systems with strict adherence to accessibility, type safety, and clean API contracts.',
    },
    {
      area: 'SaaS Product Architecture',
      detail:
        'Multi-tenant relational schemas (PostgreSQL, Prisma, Supabase), role-based access control, organization isolation, and responsive product interfaces.',
    },
    {
      area: 'AI Integrations & Business Automation',
      detail:
        'Practical LLM API integrations with structured JSON extraction, automated event synchronization, and hardware-to-cloud data bridging.',
    },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology',
    status: 'Completed June 2026',
    cgpa: '3.1 / 4.00',
    curriculum:
      'Relational Database Systems, Computer Networks, Software Engineering, Operating Systems, Systems Architecture.',
  },
  verifiedExperience: {
    role: 'Software Developer',
    organization: 'KeyAbroad Consultants',
    location: 'Faisalabad, Pakistan',
    tenure: '2024 (Completed)',
    verifiedContributions: [
      'Developed web application functionality and internal dashboard views for student application tracking.',
      'Constructed biometric hardware synchronization engine bridging device punches to a centralized PostgreSQL database.',
      'Configured cloud database access controls, secure document storage with signed URLs, and authenticated counselor workflows.',
      'Implemented technical SEO enhancements, metadata optimization, and responsive user interfaces.',
    ],
  },
  verifiedProfiles: {
    github: 'https://github.com/ranairtaza',
    linkedin: 'https://linkedin.com/in/rana-irtaza-ali-khan-849859227/',
    booking: 'https://calendar.app.google/c2aHvSbZivHms8St6',
  },
  integrityDisclaimer:
    'RANA.OS adheres to factual engineering integrity. In accordance with strict portfolio standards, no phone numbers, exact employment dates, salary expectations, unverified certifications, or unsupported work authorization claims are displayed.',
};

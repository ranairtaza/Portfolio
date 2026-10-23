export type ProjectCategory = 'all' | 'saas' | 'enterprise' | 'automation' | 'client';

export type ProjectStatus =
  | 'Live'
  | 'Prototype'
  | 'Internal Production'
  | 'In Development'
  | 'Production Architecture'
  | 'Shipped'
  | 'Active Development';

export type RepoAccessType = 'public' | 'private-enterprise' | 'proprietary-onprem' | 'concept';

export interface ArchitectureComponent {
  name: string;
  role: string;
  status: 'current' | 'planned';
  tech: string;
  notes?: string;
}

export interface ArchitectureLayer {
  layerName: string;
  description: string;
  components: ArchitectureComponent[];
}

export interface ArchitectureDataFlowStep {
  step: number;
  title: string;
  detail: string;
  protocol?: string;
}

export interface ArchitectureSpec {
  summary: string;
  layers: ArchitectureLayer[];
  dataFlow: ArchitectureDataFlowStep[];
  verifiedComponents: string[];
  plannedComponents: string[];
}

export interface EngineeringDecision {
  title: string;
  context: string;
  decision: string;
  tradeOffs: string;
  evidence: string;
}

export interface SecurityReliabilityItem {
  area:
    | 'Tenant Isolation'
    | 'Authentication & RBAC'
    | 'Input Validation & Rate Limiting'
    | 'Data Protection & Cryptography'
    | 'Hardware & Network Fault Tolerance'
    | 'Auditability & Logging';
  control: string;
  scopeOfVerification: string;
}

export interface ProjectEvidence {
  repoName?: string;
  repoOwner?: string;
  verifiedCommits?: number;
  primaryLanguage?: string;
  license?: string;
  hasAutomatedTests?: boolean;
  testingDetails?: string;
  verifiedFiles?: string[];
  publicDeployUrl?: string;
  unverifiedClaimsNotice?: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problemStatement: string;
  targetUsers?: string;
  roleAndContributions?: string[];
  techStack?: { category: string; items: string[] }[];
  architecture?: ArchitectureSpec;
  architectureNotes?: string[];
  dataFlow?: string[];
  engineeringDecisions?: EngineeringDecision[];
  keyChallenges: Array<string | { challenge: string; solution: string }>;
  securityReliability?: SecurityReliabilityItem[];
  testingVerification?: Array<{ method: string; scope: string; artifact?: string }>;
  currentStatus: string;
  futureRoadmap: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  statusBadge: string;
  description: string;
  problemStatement: string;
  solutionSummary?: string;
  role?: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  repoAccessType?: RepoAccessType;
  repoAccessLabel?: string;
  liveUrl?: string;
  previewImageMock?: {
    accentColor: string;
    routeEndpoint: string;
    terminalSnippet: string;
  };
  isFeatured: boolean;
  evidence?: ProjectEvidence;
  caseStudy: ProjectCaseStudy;
  relatedSlugs?: string[];
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai-automation'
  | 'dev-deployment'
  | 'exploring';

export interface SkillItem {
  name: string;
  usageExplanation: string;
  highlight?: string;
  isExploring?: boolean;
  projects?: string[];
}

export interface SkillCategoryGroup {
  id: SkillCategory;
  title: string;
  description: string;
  iconName: string;
  isExploringGroup?: boolean;
  skills: SkillItem[];
}

export interface JourneyMilestone {
  id: string;
  type: 'experience' | 'education' | 'saas-experiment' | 'current-focus';
  title: string;
  organization: string;
  location?: string;
  period?: string;
  badge?: string;
  summary: string;
  scopeOfContribution?: string;
  outcomes: string[];
  stackTags: string[];
  isCurrentFocus?: boolean;
  extensibleDetails?: Array<{ label: string; value: string }>;
}

export interface BeyondCodeItem {
  id: string;
  title: string;
  domain: string;
  description: string;
  currentNote: string;
  iconName: string;
}

export type GraphicsMode = '3d-high' | '3d-low' | '2d-ambient';

export interface ServiceArea {
  id: string;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  suggestedStack: string[];
  iconName: string;
}

export type ContactInquiryType = 'career' | 'project' | 'collaboration' | 'general';


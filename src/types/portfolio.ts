export type ProjectCategory = 'all' | 'saas' | 'enterprise' | 'automation';

export type ProjectStatus = 'Prototype' | 'Shipped' | 'Production Architecture' | 'Active Development';

export interface ProjectLink {
  label: string;
  url: string;
  isExternal: boolean;
  type: 'github' | 'live' | 'case-study';
}

export interface ProjectCaseStudy {
  overview: string;
  problemStatement: string;
  architectureNotes: string[];
  techStack: string[];
  dataFlow: string[];
  keyChallenges: string[];
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
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewImageMock?: {
    accentColor: string;
    routeEndpoint: string;
    terminalSnippet: string;
  };
  isFeatured: boolean;
  caseStudy: ProjectCaseStudy;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai-automation'
  | 'infrastructure'
  | 'product-engineering';

export interface SkillItem {
  name: string;
  level?: string;
  highlight?: string;
}

export interface SkillCategoryGroup {
  id: SkillCategory;
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface JourneyMilestone {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  badge?: string;
  summary: string;
  outcomes: string[];
  stackTags: string[];
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

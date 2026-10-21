export type ProjectCategory = 'all' | 'saas' | 'enterprise' | 'automation';

export type ProjectStatus = 'Prototype' | 'Shipped' | 'Production Architecture' | 'Active Development';

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
  status: ProjectStatus;
  statusBadge: string;
  description: string;
  highlights: string[];
  technologies: string[];
  architectureDiagram?: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured: boolean;
  caseStudy: ProjectCaseStudy;
}

export type SkillCategory = 'frontend' | 'backend' | 'systems' | 'ai-automation';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency?: 'Core' | 'Advanced' | 'Practicing';
  relatedProjectIds: string[];
  description: string;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  skillsUsed: string[];
  verificationBadge?: string;
}

export interface InterestTopic {
  title: string;
  domain: string;
  description: string;
  currentExploration: string;
  iconName: string;
}

export type GraphicsMode = '3d-high' | '3d-low' | '2d-ambient';

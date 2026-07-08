// Shared domain types for the portfolio.

export interface SiteConfig {
  /** Sidebar identity */
  name: string;
  subtitle: string;
  bio: string;
  avatarUrl: string; // leave empty for the striped placeholder
  /** Info block ("à personnaliser" in the mockup) */
  location: string;
  availability: string;
  focus: string;
  email: string;
  /** Social / actions */
  githubUser: string; // used both for the link AND the repo fetch
  linkedinUrl: string;
  cvUrl: string; // empty => shows the "CV bientôt disponible" hint
  /** Repo selection */
  repos: {
    includeForks: boolean;
    includeArchived: boolean;
    /** repos to always hide (e.g. the pages repo itself) */
    exclude: string[];
    /** sort key applied client-side */
    sort: "stars" | "updated";
    /** max cards to render */
    limit: number;
  };
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  tech: string[];
  stars: number;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tech: string[];
}

/**
 * Per-repo override merged on top of the auto-fetched GitHub data.
 * Keyed by the exact GitHub repo name (e.g. "AI-nimator") in projects.json.
 * Every field is optional — only what you set replaces the auto value.
 */
export interface ProjectOverride {
  tagline?: string;
  description?: string;
  bullets?: string[];
  tech?: string[];
  hidden?: boolean; // true => never show this repo
}

export type ProjectOverrides = Record<string, ProjectOverride>;

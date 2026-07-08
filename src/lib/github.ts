import type {
  Project,
  ProjectOverride,
  ProjectOverrides,
  SiteConfig,
} from "@/data/types";

/** Raw shape of the GitHub REST repo objects we care about. */
interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  homepage: string | null;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1h — respects the 60 req/h anon limit
const cacheKey = (user: string) => `gh-repos:${user}`;

interface Cached {
  at: number;
  repos: GithubRepo[];
}

function readCache(user: string): GithubRepo[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(user));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.repos;
  } catch {
    return null;
  }
}

function writeCache(user: string, repos: GithubRepo[]) {
  try {
    localStorage.setItem(
      cacheKey(user),
      JSON.stringify({ at: Date.now(), repos } satisfies Cached)
    );
  } catch {
    /* storage full / disabled — non-fatal */
  }
}

/** Turn a repo name like "AI-nimator" / "raspberry_HatStartup" into a title. */
function humanize(name: string): string {
  return name.replace(/[-_]+/g, " ").trim();
}

/** Build the tech-tag list from the primary language + repo topics. */
function techFrom(repo: GithubRepo): string[] {
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  for (const t of repo.topics ?? []) {
    if (!tags.some((x) => x.toLowerCase() === t.toLowerCase())) tags.push(t);
  }
  return tags.slice(0, 6);
}

function relativeDate(iso: string): string {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "aujourd'hui";
  if (days < 30) return `il y a ${days} j`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${Math.floor(months / 12)} an(s)`;
}

/** Auto data from GitHub, with the projects.json override merged on top. */
function toProject(repo: GithubRepo, override?: ProjectOverride): Project {
  const autoBullets: string[] = [`Mis à jour ${relativeDate(repo.pushed_at)}`];
  if (repo.forks_count > 0) autoBullets.push(`${repo.forks_count} fork(s)`);
  if (repo.homepage) autoBullets.push(`Démo : ${repo.homepage}`);

  return {
    name: humanize(repo.name),
    tagline:
      override?.tagline ??
      (repo.language ? repo.language.toLowerCase() : "dépôt public"),
    description:
      override?.description ??
      repo.description ??
      "Pas encore de description sur ce dépôt.",
    bullets: override?.bullets ?? autoBullets,
    tech: override?.tech ?? techFrom(repo),
    stars: repo.stargazers_count,
    url: repo.html_url,
  };
}

function applySelection(
  repos: GithubRepo[],
  cfg: SiteConfig,
  overrides: ProjectOverrides
): Project[] {
  const { includeForks, includeArchived, exclude, sort, limit } = cfg.repos;
  return repos
    .filter((r) => includeForks || !r.fork)
    .filter((r) => includeArchived || !r.archived)
    .filter((r) => !exclude.includes(r.name))
    .filter((r) => !overrides[r.name]?.hidden)
    .sort((a, b) =>
      sort === "updated"
        ? +new Date(b.pushed_at) - +new Date(a.pushed_at)
        : b.stargazers_count - a.stargazers_count ||
          +new Date(b.pushed_at) - +new Date(a.pushed_at)
    )
    .slice(0, limit)
    .map((r) => toProject(r, overrides[r.name]));
}

/**
 * Fetch the user's public repos (client-side, no token). Falls back to a
 * possibly-stale cache when the network fails or the rate limit is hit.
 */
export async function fetchProjects(
  cfg: SiteConfig,
  overrides: ProjectOverrides = {}
): Promise<Project[]> {
  const user = cfg.githubUser;

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        user
      )}/repos?per_page=100&sort=pushed`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) {
      const stale = readCache(user);
      if (stale) return applySelection(stale, cfg, overrides);
      throw new Error(
        res.status === 403
          ? "Limite de l'API GitHub atteinte, réessaie dans une heure."
          : `GitHub a répondu ${res.status}.`
      );
    }
    const repos = (await res.json()) as GithubRepo[];
    writeCache(user, repos);
    return applySelection(repos, cfg, overrides);
  } catch (err) {
    const stale = readCache(user);
    if (stale) return applySelection(stale, cfg, overrides);
    throw err;
  }
}

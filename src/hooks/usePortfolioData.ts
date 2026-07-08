import { useEffect, useState } from "react";
import type {
  Experience,
  Project,
  ProjectOverrides,
  SiteConfig,
} from "@/data/types";
import { fetchProjects } from "@/lib/github";

interface State {
  config: SiteConfig | null;
  experiences: Experience[];
  projects: Project[];
  loadingProjects: boolean;
  projectsError: string | null;
  ready: boolean; // config + experiences loaded
}

/** Base path aware fetch for files served from /public/data. */
const dataUrl = (file: string) =>
  `${import.meta.env.BASE_URL}data/${file}`.replace(/\/{2,}/g, "/");

export function usePortfolioData(): State {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [overrides, setOverrides] = useState<ProjectOverrides>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Load editable JSON (config + experiences) once.
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(dataUrl("config.json")).then((r) => r.json() as Promise<SiteConfig>),
      fetch(dataUrl("experiences.json")).then(
        (r) => r.json() as Promise<Experience[]>
      ),
      // projects.json is optional — fall back to {} if missing/invalid.
      fetch(dataUrl("projects.json"))
        .then((r) => (r.ok ? (r.json() as Promise<ProjectOverrides>) : {}))
        .catch(() => ({})),
    ])
      .then(([cfg, exp, ovr]) => {
        if (cancelled) return;
        setConfig(cfg);
        setExperiences(exp);
        setOverrides(ovr as ProjectOverrides);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Once config is known, fetch GitHub repos.
  useEffect(() => {
    if (!config) return;
    let cancelled = false;
    setLoadingProjects(true);
    setProjectsError(null);
    fetchProjects(config, overrides)
      .then((p) => !cancelled && setProjects(p))
      .catch(
        (e: unknown) =>
          !cancelled &&
          setProjectsError(e instanceof Error ? e.message : "Erreur inconnue")
      )
      .finally(() => !cancelled && setLoadingProjects(false));
    return () => {
      cancelled = true;
    };
  }, [config, overrides]);

  return {
    config,
    experiences,
    projects,
    loadingProjects,
    projectsError,
    ready,
  };
}

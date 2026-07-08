import { cn } from "@/lib/utils";
import type { Experience, Project } from "@/data/types";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Skeleton } from "@/components/ui/skeleton";

type Tab = "perso" | "pro";

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  projects: Project[];
  experiences: Experience[];
  loadingProjects: boolean;
  projectsError: string | null;
}

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-border bg-surface-card p-7">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function Parcours({
  tab,
  onTabChange,
  projects,
  experiences,
  loadingProjects,
  projectsError,
}: Props) {
  const tabBtn = (value: Tab, label: string) => (
    <button
      onClick={() => onTabChange(value)}
      className={cn(
        "cursor-pointer rounded-[7px] px-4 py-[7px] text-[13px] font-medium transition-colors",
        tab === value
          ? "bg-surface-tag text-foreground"
          : "bg-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );

  return (
    <section id="parcours">
      <h2 className="mb-1 text-[22px] font-bold text-foreground">Parcours</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Projets personnels & expérience en entreprise
      </p>

      <div className="mb-5 inline-flex gap-1 rounded-[10px] border border-border bg-surface-raised p-1">
        {tabBtn("perso", "Projets perso")}
        {tabBtn("pro", "Expérience pro")}
      </div>

      {/* Sliding track: two 50% panels inside a 200% flex row. */}
      <div className="w-full overflow-hidden">
        <div
          className="flex w-[200%] transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]"
          style={{
            transform: tab === "perso" ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          {/* Projets perso (from GitHub) */}
          <div className="flex w-1/2 shrink-0 flex-col gap-5 pr-4">
            {loadingProjects ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : projectsError ? (
              <p className="font-mono text-xs text-[#f87171]">
                {projectsError}
              </p>
            ) : projects.length === 0 ? (
              <span className="font-mono text-xs text-[#52525b]">
                Aucun projet pour ce filtre.
              </span>
            ) : (
              projects.map((p) => <ProjectCard key={p.url} project={p} />)
            )}
          </div>

          {/* Expérience pro (from experiences.json) */}
          <div className="flex w-1/2 shrink-0 flex-col gap-5 pl-4">
            {experiences.length === 0 ? (
              <span className="font-mono text-xs text-[#52525b]">
                Aucune expérience pour ce filtre.
              </span>
            ) : (
              experiences.map((e, i) => (
                <ExperienceCard key={`${e.company}-${i}`} exp={e} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

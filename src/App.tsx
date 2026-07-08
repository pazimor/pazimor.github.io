import { useMemo, useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Sidebar } from "@/components/Sidebar";
import { StackFilter } from "@/components/StackFilter";
import { Parcours } from "@/components/Parcours";
import { Skeleton } from "@/components/ui/skeleton";

type Tab = "perso" | "pro";

export default function App() {
  const {
    config,
    experiences,
    projects,
    loadingProjects,
    projectsError,
    ready,
  } = usePortfolioData();

  const [tab, setTab] = useState<Tab>("perso");
  const [filter, setFilter] = useState<string | null>(null);

  // Union of every tech tag across projects + experiences.
  const allTech = useMemo(() => {
    const set: string[] = [];
    [...projects, ...experiences].forEach((item) =>
      item.tech.forEach((t) => {
        if (!set.includes(t)) set.push(t);
      })
    );
    return set;
  }, [projects, experiences]);

  const filteredProjects = useMemo(
    () => (filter ? projects.filter((p) => p.tech.includes(filter)) : projects),
    [projects, filter]
  );
  const filteredExperiences = useMemo(
    () =>
      filter ? experiences.filter((e) => e.tech.includes(filter)) : experiences,
    [experiences, filter]
  );

  const toggleFilter = (tag: string) =>
    setFilter((cur) => (cur === tag ? null : tag));

  return (
    <div className="min-h-screen bg-surface-base p-6 md:p-12 lg:p-16">
      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch overflow-hidden rounded-xl border border-border bg-surface-panel shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] md:flex-row">
        {ready && config ? (
          <Sidebar config={config} />
        ) : (
          <div className="w-80 shrink-0 border-r border-border p-8">
            <Skeleton className="h-[72px] w-[72px] rounded-full" />
            <Skeleton className="mt-6 h-8 w-40" />
            <Skeleton className="mt-3 h-4 w-full" />
          </div>
        )}

        <main className="flex flex-1 flex-col gap-10 p-8 md:p-14 md:pb-10">
          {allTech.length > 0 && (
            <StackFilter
              tags={allTech}
              active={filter}
              onToggle={toggleFilter}
            />
          )}

          <Parcours
            tab={tab}
            onTabChange={setTab}
            projects={filteredProjects}
            experiences={filteredExperiences}
            loadingProjects={loadingProjects}
            projectsError={projectsError}
          />
        </main>
      </div>
    </div>
  );
}

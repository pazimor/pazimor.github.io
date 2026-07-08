import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col gap-3.5 p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
          <p className="mt-1 font-mono text-[13px] text-muted-foreground">
            {project.tagline}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1 font-mono text-xs text-[#a1a1aa]">
            <Star className="h-3.5 w-3.5" /> {project.stars}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-md border border-[#3f3f46] px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-tag/60"
          >
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[#d4d4d8]">
        {project.description}
      </p>

      {project.bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13px] leading-relaxed text-[#a1a1aa]"
            >
              <span className="shrink-0 font-mono text-primary">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {project.tech.length > 0 && (
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="tech">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}

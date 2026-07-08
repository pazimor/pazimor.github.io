import type { Experience } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <Card className="flex flex-col gap-3.5 p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
          <p className="mt-1 font-mono text-[13px] text-muted-foreground">
            {exp.company}
          </p>
        </div>
        <Badge variant="period" className="shrink-0">
          {exp.period}
        </Badge>
      </div>

      <ul className="flex flex-col gap-1.5">
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-2 text-[13px] leading-relaxed text-[#a1a1aa]"
          >
            <span className="shrink-0 font-mono text-primary">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {exp.tech.length > 0 && (
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <Badge key={t} variant="tech">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}

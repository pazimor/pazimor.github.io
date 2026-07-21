import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  tags: string[];
  active: string | null;
  onToggle: (tag: string) => void;
}

/** The clickable tech-tag row that filters projects & experiences. */
export function StackFilter({ tags, active, onToggle }: Props) {
  return (
    <section id="stack">
      <h2 className="mb-1 text-xl font-bold text-foreground">Tech stack</h2>
      <p className="mb-3.5 text-[13px] text-muted-foreground">
        Click a tag to filter the projects and experience below
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = active === tag;
          return (
            <Button
              key={tag}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => onToggle(tag)}
              aria-pressed={isActive}
              className={cn(
                "h-auto rounded-full px-3 py-[5px] font-mono text-xs",
                !isActive && "bg-transparent"
              )}
            >
              {tag}
            </Button>
          );
        })}
      </div>
      {active && (
        <span className="mt-2 block font-mono text-[11px] text-primary">
          Filter active — click the tag again to clear it
        </span>
      )}
    </section>
  );
}

import { cn } from "@/lib/utils";

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
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-[5px] font-mono text-xs transition-colors",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-[#3f3f46] bg-transparent text-foreground hover:border-[#52525b]"
              )}
            >
              {tag}
            </button>
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

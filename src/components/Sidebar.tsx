import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Menu as MenuIcon,
  Diamond,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import type { SiteConfig } from "@/data/types";

interface Props {
  config: SiteConfig;
}

/** Shared sizing for the three icon actions (GitHub / LinkedIn / Email). */
const ACTION_BTN = "h-auto flex-1 gap-1.5 px-1.5 py-2.5";

const NAV = [
  { href: "#stack", label: "Stack", icon: MenuIcon },
  { href: "#parcours", label: "Work", icon: Diamond },
];

export function Sidebar({ config }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [cvHint, setCvHint] = useState(false);
  const expanded = !collapsed;

  const onDownloadCV = () => {
    if (config.cvUrl) {
      // Absolute URLs pass through; a relative path (e.g. "cv.pdf") is
      // resolved against the site's base so it works on GitHub Pages.
      const isAbsolute = /^https?:\/\//.test(config.cvUrl);
      const href = isAbsolute
        ? config.cvUrl
        : `${import.meta.env.BASE_URL}${config.cvUrl}`.replace(/\/{2,}/g, "/");
      window.open(href, "_blank");
      return;
    }
    setCvHint(true);
    window.setTimeout(() => setCvHint(false), 3000);
  };

  const infoRow = (label: string, value: React.ReactNode) => (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[11px] text-[#52525b]">{label}</span>
      <span className="text-[13px] text-[#d4d4d8]">{value}</span>
    </div>
  );

  return (
    <aside
      className={cn(
        // mobile: compact horizontal bar (wraps into a few short rows)
        "relative flex w-full shrink-0 flex-row flex-wrap items-center gap-4 border-b border-border px-5 py-4",
        // md+: retractable vertical sidebar
        "md:w-auto md:flex-col md:flex-nowrap md:gap-6 md:overflow-hidden md:border-b-0 md:border-r md:py-12 md:transition-[width,padding] md:duration-300 md:ease-in-out",
        expanded
          ? "md:w-80 md:items-stretch md:px-8"
          : "md:w-[84px] md:items-center md:px-5"
      )}
    >
      {/* collapse toggle — dedicated button at the top of the sidebar (desktop) */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "hidden h-8 w-8 shrink-0 bg-surface-card text-[#a1a1aa] hover:text-foreground md:inline-flex",
          expanded ? "md:self-end" : "md:self-center"
        )}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>

      {/* avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border md:h-[72px] md:w-[72px]">
        {config.avatarUrl ? (
          <img
            src={config.avatarUrl}
            alt={config.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "repeating-linear-gradient(135deg, #18181b, #18181b 6px, #1f1f23 6px, #1f1f23 12px)",
            }}
          >
            <span className="font-mono text-[10px] text-[#52525b]">
              {config.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <>
          <div className="min-w-0 flex-1 md:flex-none">
            <h1 className="mb-1.5 text-xl font-extrabold text-foreground md:text-2xl">
              {config.name}
            </h1>
            <p className="font-mono text-[13px] text-primary">
              {config.subtitle}
            </p>
          </div>

          <p className="hidden text-sm leading-relaxed text-[#a1a1aa] md:block">
            {config.bio}
          </p>

          <div className="hidden w-full md:block">
            <Separator />
            <div className="flex flex-col gap-2.5 py-4">
              {infoRow("Location", config.location)}
              {infoRow("Availability", config.availability)}
              {infoRow("Focus", config.focus)}
              {infoRow("Email", config.email)}
            </div>
            <Separator />
          </div>
        </>
      )}

      {/* nav */}
      <nav className="flex w-full flex-row flex-wrap justify-center gap-1 md:flex-col md:justify-start">
        {NAV.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-1 py-2 text-sm text-[#d4d4d8] transition-colors hover:bg-surface-tag/50",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {expanded && <span>{label}</span>}
          </a>
        ))}
      </nav>

      {/* actions */}
      <div className="flex w-full flex-col gap-2 md:mt-auto">
        <div className={cn("flex gap-2", collapsed && "flex-col")}>
          <Button asChild size="sm" className={ACTION_BTN}>
            <a
              href={`https://github.com/${config.githubUser}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={githubIcon} alt="" className="h-4 w-4 shrink-0" />
              {expanded && <span>GitHub</span>}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(ACTION_BTN, "bg-transparent")}
          >
            <a href={config.linkedinUrl} target="_blank" rel="noreferrer">
              <img
                src={linkedinIcon}
                alt=""
                className="h-[15px] w-[15px] shrink-0 rounded-[3px]"
              />
              {expanded && <span>LinkedIn</span>}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(ACTION_BTN, "bg-transparent")}
          >
            <a href={`mailto:${config.email}`}>
              <Mail className="h-4 w-4 shrink-0" />
              {expanded && <span>Email</span>}
            </a>
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onDownloadCV}
          className="h-auto w-full bg-transparent px-3.5 py-2.5 text-[13px]"
        >
          <Download />
          {expanded && <span>Download CV</span>}
        </Button>
        {cvHint && expanded && (
          <span className="text-center font-mono text-[11px] text-muted-foreground">
            CV coming soon
          </span>
        )}
      </div>
    </aside>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { WebProject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";

interface WebTabProps {
  project: WebProject;
  active: boolean;
  onSelect: () => void;
}

/** Project card; the active one expands (grid-rows 0fr→1fr) to show tags + KPIs. */
export function WebTab({ project, active, onSelect }: WebTabProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border p-5 transition duration-300",
        active
          ? "border-[color-mix(in_srgb,var(--c)_60%,transparent)] bg-panel shadow-[0_20px_50px_-30px_var(--c)]"
          : "border-line bg-white/2 hover:border-line-hi",
      )}
      style={{ "--c": project.color }}
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={active}
          className="flex-1 text-left"
        >
          <span className="label text-muted normal-case">{project.url}</span>
          <h3 className="text-[22px] font-extrabold tracking-[-0.03em]">{project.name}</h3>
        </button>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live site`}
            className={cn(
              "grid size-[34px] flex-none place-items-center rounded-full transition duration-300",
              active ? "bg-(--c) text-black" : "bg-white/6",
            )}
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-400",
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={!active}>
          <div className="flex flex-wrap gap-1.5 pt-3.5">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <dl className="flex gap-5 pt-3.5">
            {project.kpis.map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-[11px] text-muted">{label}</dt>
                <dd className="text-lg font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

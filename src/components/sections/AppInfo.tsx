import type { MobileApp } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/ui/StoreBadge";
import { Tag } from "@/components/ui/Tag";

interface AppInfoProps {
  apps: MobileApp[];
  active: number;
}

/** Stacked info cards; the active one cross-fades and slides up. */
export function AppInfo({ apps, active }: AppInfoProps) {
  return (
    <div className="relative h-[190px] max-desk:order-3 desk:h-80">
      {apps.map((app, i) => (
        <div
          key={app.slug}
          aria-hidden={i !== active}
          inert={i !== active}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center transition duration-600 ease-brand desk:items-start desk:gap-4 desk:text-left",
            i === active ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0",
          )}
          style={{ "--c": app.color, "--c2": app.color2 }}
        >
          <div className="flex items-center gap-3.5">
            <span className="grid size-[46px] place-items-center rounded-[13px] bg-linear-135 from-(--c) to-(--c2) text-xl shadow-[0_12px_30px_-10px_var(--c)] desk:size-16 desk:rounded-[18px] desk:text-[28px]">
              {app.emoji}
            </span>
            <div className="text-left">
              <h3 className="text-[26px] leading-none font-extrabold tracking-[-0.04em] desk:text-4xl">
                {app.name}
              </h3>
              <p className="mt-1 text-[13px] text-muted">{app.category}</p>
            </div>
          </div>
          <dl className="hidden gap-[22px] border-y border-line py-3.5 desk:flex">
            {[
              [app.rating, "Rating"],
              [app.downloads, "Downloads"],
              [app.platforms, "Platforms"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-[11px] text-muted">{label}</dt>
                <dd className="text-xl font-extrabold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap justify-center gap-1.5 desk:justify-start">
            {app.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="hidden gap-2 desk:flex">
            {app.appStore && <StoreBadge store="apple" href={app.appStore} appName={app.name} />}
            {app.playStore && <StoreBadge store="google" href={app.playStore} appName={app.name} />}
          </div>
        </div>
      ))}
    </div>
  );
}

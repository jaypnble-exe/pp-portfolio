import { Check, Globe } from "lucide-react";
import type { MobileApp } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/AppIcon";
import { StoreBadge } from "@/components/ui/StoreBadge";
import { Tag } from "@/components/ui/Tag";

/** Only the stats the app actually has (rating/downloads are omitted for new apps). */
const stats = (app: MobileApp): [value: string, label: string][] =>
  (
    [
      [app.rating, "Rating"],
      [app.downloads, "Downloads"],
      [app.platforms, "Platforms"],
    ] as [string | undefined, string][]
  ).filter((s): s is [string, string] => Boolean(s[0]));

interface AppInfoProps {
  apps: MobileApp[];
  active: number;
}

/** Stacked info cards; the active one cross-fades and slides up. */
export function AppInfo({ apps, active }: AppInfoProps) {
  return (
    <div className="relative h-[190px] max-desk:order-3 desk:h-[440px]">
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
            <AppIcon
              app={app}
              px={64}
              className="size-[46px] rounded-[13px] text-xl shadow-[0_12px_30px_-10px_var(--c)] desk:size-16 desk:rounded-[18px] desk:text-[28px]"
            />
            <div className="text-left">
              <h3 className="text-[26px] leading-none font-extrabold tracking-[-0.04em] desk:text-4xl">
                {app.name}
              </h3>
              <p className="mt-1 text-[13px] text-muted">{app.category}</p>
            </div>
          </div>
          {app.highlight && (
            <p className="hidden items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1.5 text-xs font-semibold text-green desk:inline-flex">
              <Check className="size-3.5" aria-hidden="true" />
              {app.highlight}
            </p>
          )}
          {app.description && (
            <p className="max-w-[400px] text-sm leading-normal text-text/80 desk:text-[15px]">
              {app.description}
            </p>
          )}
          <dl className="hidden gap-[22px] border-y border-line py-3.5 desk:flex">
            {stats(app).map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-[11px] text-muted">{label}</dt>
                <dd className="text-xl font-extrabold">{value}</dd>
              </div>
            ))}
          </dl>
          {/* Tags are desktop-only: on phones the description needs the room. */}
          <div className="hidden flex-wrap gap-1.5 desk:flex">
            {app.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="hidden gap-2 desk:flex">
            {app.appStore && <StoreBadge store="apple" href={app.appStore} appName={app.name} />}
            {app.playStore && <StoreBadge store="google" href={app.playStore} appName={app.name} />}
            {app.website && (
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${app.name} website`}
                className="inline-flex h-[42px] items-center gap-2 rounded-xl border border-line-hi bg-white/8 px-3.5 text-xs font-bold transition hover:-translate-y-0.5"
              >
                <Globe className="size-4" aria-hidden="true" />
                Website
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

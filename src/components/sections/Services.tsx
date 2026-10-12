import { services } from "@/data/services";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const SPAN = {
  hero: "col-span-2 desk:row-span-2",
  wide: "col-span-2",
};

/** Bento grid: 4 columns on desktop, 2 on tablets and phones. */
export function Services() {
  return (
    <section id="services" className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap">
        <SectionHead label="Services" title="What I build" muted="for you." />
        <div className="grid grid-cols-2 gap-3.5 desk:auto-rows-[200px] desk:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              index={i}
              className={cn(service.size && SPAN[service.size])}
            >
              <ServiceTile service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceTile({ service }: { service: Service }) {
  const hero = service.size === "hero";
  const wide = service.size === "wide";

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[160px] flex-col justify-between gap-5 overflow-hidden rounded-[30px] border border-line bg-panel p-[22px] transition duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--c)_45%,transparent)]",
        hero && "p-7 desk:p-8",
        wide && "desk:flex-row desk:items-center",
      )}
      style={{ "--c": service.color }}
    >
      {/* Accent glow from the top-left corner; brightens on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -left-1/4 aspect-square w-[90%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--c)_32%,transparent),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-[52px] flex-none place-items-center rounded-[15px] bg-(--c) text-2xl shadow-[0_10px_30px_-8px_var(--c)]",
          hero && "desk:size-16 desk:rounded-[18px] desk:text-[30px]",
        )}
      >
        {service.emoji}
      </span>

      <div className={cn("relative", wide && "desk:flex-1")}>
        <h3
          className={cn(
            "text-lg leading-tight font-extrabold tracking-[-0.03em] [hyphens:none] xs:text-[22px]",
            hero && "text-[26px] xs:text-[30px] desk:text-[38px] desk:leading-[1.05]",
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-1 text-[13px] text-muted",
            hero && "mt-2 max-w-[440px] text-[15px] leading-normal",
          )}
        >
          {service.subtitle}
        </p>
      </div>

      {service.points && (
        <ul className={cn("relative flex flex-wrap gap-1.5", wide && "desk:justify-end")}>
          {service.points.map((p) => (
            <li
              key={p}
              className="rounded-full border border-[color-mix(in_srgb,var(--c)_35%,transparent)] bg-[color-mix(in_srgb,var(--c)_12%,transparent)] px-3 py-1.5 text-xs font-semibold text-text/90"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

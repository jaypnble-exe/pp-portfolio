import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/** Four iOS-style widgets. */
export function Services() {
  return (
    <section id="services" className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap">
        <SectionHead label="Services" title="What I build" muted="for you." />
        <div className="grid grid-cols-2 gap-3.5 desk:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} index={i}>
              <div
                className="flex min-h-[170px] flex-col justify-between gap-6 overflow-hidden rounded-[30px] border border-line bg-[linear-gradient(160deg,color-mix(in_srgb,var(--c)_22%,var(--panel)),var(--panel)_70%)] p-[22px] transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.01] xs:aspect-square"
                style={{ "--c": service.color }}
              >
                <span
                  aria-hidden="true"
                  className="grid size-[52px] place-items-center rounded-[15px] bg-(--c) text-2xl shadow-[0_10px_30px_-8px_var(--c)]"
                >
                  {service.emoji}
                </span>
                <div>
                  <h3 className="text-[22px] font-extrabold tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-1 text-[13px] text-muted">{service.subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

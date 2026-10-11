import { ArrowRight } from "lucide-react";
import { contacts } from "@/data/profile";
import { IPhone } from "@/components/device/IPhone";
import { LockScreen } from "@/components/screens/LockScreen";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap grid items-center gap-[50px] pb-[60px] desk:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <span className="label text-muted">Contact</span>
          <h2 className="mt-3.5 text-[clamp(44px,6vw,84px)] leading-[.95] font-extrabold tracking-display">
            Your app
            <br />
            <span className="text-gradient">is next.</span>
          </h2>
          <ul className="mt-8 grid max-w-[460px] gap-2.5">
            {contacts.map((c) => (
              <li key={c.hint + c.label}>
                <a
                  href={c.href}
                  {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-3.5 rounded-[18px] border border-line bg-panel px-4 py-3.5 transition duration-250 hover:translate-x-1.5 hover:border-line-hi"
                  style={{ "--c": c.color }}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-11 flex-none place-items-center rounded-[13px] bg-(--c) text-xl"
                  >
                    {c.emoji}
                  </span>
                  <span className="min-w-0">
                    <b className="block truncate text-base">{c.label}</b>
                    <span className="text-xs text-muted">{c.hint}</span>
                  </span>
                  <ArrowRight className="ml-auto size-4 flex-none text-muted" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal
          index={1}
          className="grid place-items-center [--lock-w:240px] perspective-[1400px] xs:[--lock-w:290px]"
        >
          <div style={{ transform: "rotateY(12deg) rotateX(4deg)", transformStyle: "preserve-3d" }}>
            <IPhone width="var(--lock-w)" showTime={false}>
              <LockScreen />
            </IPhone>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

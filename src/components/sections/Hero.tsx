import { heroChips, profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { HeroPhone } from "./HeroPhone";

const STATS = [
  [profile.stats.apps, "Apps on stores"],
  [profile.stats.projects, "Projects"],
  [profile.stats.years, "Years"],
  [profile.stats.rating, "Avg rating"],
];

const CHIP_POSITIONS = [
  "top-[14%] left-0",
  "top-[40%] right-0 xs:-right-[2%] [animation-delay:-1.5s]",
  "bottom-[12%] left-[6%] [animation-delay:-3s]",
];

export function Hero() {
  const chips = heroChips.map((chip, i) => (
    <div
      key={chip.title}
      className={`absolute z-3 flex animate-[float_5s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl border border-line-hi bg-[rgba(18,20,28,.75)] py-2 pr-2.5 pl-2 text-[11px] font-bold whitespace-nowrap backdrop-blur-[14px] xs:py-2.5 xs:pr-3.5 xs:pl-2.5 xs:text-[13px] ${CHIP_POSITIONS[i]}`}
      style={{ "--c": chip.color }}
    >
      <span className="grid size-[26px] place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--c)_18%,transparent)] font-mono text-[11px] text-(--c) xs:size-8">
        {chip.short}
      </span>
      <div>
        {chip.title}
        <small className="block text-[11px] font-medium text-muted">{chip.subtitle}</small>
      </div>
    </div>
  ));

  return (
    <section id="top" className="grid min-h-screen items-center pt-[120px] pb-[60px]">
      <div className="site-wrap grid items-center gap-10 desk:grid-cols-[1.1fr_1fr]">
        <div className="animate-rise">
          {profile.available && (
            <p className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 py-[7px] pr-3.5 pl-2 text-[13px] font-semibold">
              <b className="rounded-full bg-green px-2 py-[3px] text-[11px] text-black">OPEN</b>
              Taking new projects
            </p>
          )}
          <h1 className="text-[clamp(46px,6.6vw,92px)] leading-[.95] font-extrabold tracking-display">
            {/* nowrap: at ≥1380px the line is ~25px wider than its column; it spills into the gap */}
            <span className="whitespace-nowrap">Apps that live in</span>
            <br />
            <span className="text-gradient">your pocket.</span>
          </h1>
          <p className="mt-[22px] mb-8 text-[19px] font-medium text-muted">
            <b className="text-text">{profile.name}</b> — {profile.role} building {profile.tagline}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#apps" size="lg">
              Explore apps ↓
            </Button>
            <Button href="#contact" size="lg" variant="secondary">
              Let&apos;s talk
            </Button>
          </div>
          <dl className="mt-[46px] flex flex-wrap gap-7">
            {STATS.map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="text-[13px] text-muted">{label}</dt>
                <dd className="text-[28px] font-extrabold tracking-[-0.03em]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroPhone chips={chips}>
          <ProfileScreen />
        </HeroPhone>
      </div>
    </section>
  );
}

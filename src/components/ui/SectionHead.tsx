import { Reveal } from "./Reveal";

interface SectionHeadProps {
  label: string;
  title: string;
  muted: string;
}

/** Centered mono label (tinted by --glow) + h2 with a muted tail. */
export function SectionHead({ label, title, muted }: SectionHeadProps) {
  return (
    <Reveal className="mb-10 text-center">
      <span className="label text-glow transition-colors duration-1000">{label}</span>
      <h2 className="mt-3 text-[clamp(36px,5vw,64px)] leading-none font-extrabold tracking-heading">
        {title} <span className="text-muted">{muted}</span>
      </h2>
    </Reveal>
  );
}

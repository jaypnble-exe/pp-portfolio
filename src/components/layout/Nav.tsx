import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const LINKS = [
  ["Apps", "#apps"],
  ["Web", "#web"],
  ["Stack", "#stack"],
  ["Services", "#services"],
];

/** Floating glass bar. Plain anchors, so it stays a Server Component. */
export function Nav() {
  return (
    <nav
      aria-label="Main"
      className="fixed top-3.5 left-1/2 z-60 flex w-[min(1200px,100%-24px)] -translate-x-1/2 items-center justify-between rounded-[18px] border border-line bg-[rgba(13,15,21,.65)] py-2.5 pr-2.5 pl-5 backdrop-blur-[18px] backdrop-saturate-160"
    >
      <a href="#top" className="flex items-center gap-2.5 font-extrabold tracking-[-0.02em]">
        <Logo className="h-8 w-auto" />
        {profile.name}
      </a>
      <div className="hidden gap-[26px] text-sm text-muted desk:flex">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} className="transition-colors hover:text-text">
            {label}
          </a>
        ))}
      </div>
      <Button href="#contact">Hire me</Button>
    </nav>
  );
}

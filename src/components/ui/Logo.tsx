import { useId } from "react";

/**
 * "<//>" mark: each slash is a P stem with a chevron bowl on its top half —
 * a mirrored P on the left and a P on the right (Pejay Paronable, as a code tag).
 * Decorative: pair it with the visible name.
 */
export function Logo({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 72 64" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="8" y1="10" x2="64" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset=".5" stopColor="#b56bff" />
          <stop offset="1" stopColor="#ff6b9d" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 54 L32 10 L8 21 L27 32" />
        <path d="M33 54 L43 10 L64 21 L38 32" />
      </g>
    </svg>
  );
}

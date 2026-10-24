# CLAUDE.md — Pejay Paronable Portfolio

Personal portfolio for **Pejay Paronable**, Full Stack Developer (React Native + Next.js).
Design direction: **"Phone-first showcase"**. A dark, Apple-product-page style site where a 3D iPhone is the hero and mobile apps are shown through a scroll-driven phone.

> The approved visual reference is `design/reference.html` (the static HTML prototype).
> When unsure how something should look or move, open it and match it. Do not invent a new style.

---

## 1. Golden rules

1. **Minimal text.** Clients scan; they don't read. Prefer numbers, tags, icons and visuals over sentences. No paragraph longer than one line in UI.
2. **Data-driven.** All content (apps, web projects, stack, services, contact) lives in `src/data/*.ts`. Components never hardcode portfolio content.
3. **Match the reference.** Colors, spacing, radii, motion and layout come from `design/reference.html`.
4. **Performance first.** Server Components by default. Only animated or interactive pieces are Client Components (`"use client"`).
5. **Mobile works perfectly.** Every section must look intentional at 375px wide.
6. **Accessible.** Respect `prefers-reduced-motion`, keyboard focus states, alt text, semantic HTML.

---

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router, latest stable), TypeScript strict |
| Styling | Tailwind CSS (latest) + CSS variables for theme tokens |
| Animation | `motion` (Framer Motion) for scroll/transform animations |
| Fonts | `next/font/google`: **Plus Jakarta Sans** (UI), **JetBrains Mono** (labels) |
| Images | `next/image` for all screenshots and the profile photo |
| Icons | `lucide-react` + inline SVG for App Store / Google Play logos |
| Contact form (optional) | Server Action + Resend |
| Deploy | Vercel |
| Lint/format | ESLint (next config) + Prettier |

Package manager: **pnpm**.

```bash
pnpm dev        # start dev server
pnpm build      # production build — must pass with zero errors
pnpm lint       # must pass before committing
```

---

## 3. Folder structure

```
/
├─ CLAUDE.md
├─ design/
│  └─ reference.html            # approved HTML prototype (source of truth for visuals)
├─ public/
│  ├─ profile.jpg               # Pejay's photo (portrait, ~800×1000)
│  ├─ cv.pdf
│  ├─ og.png                    # 1200×630 social preview
│  └─ screens/
│     ├─ apps/                  # mobile screenshots, portrait ~1170×2532
│     └─ web/                   # web screenshots, 16:10 ~1600×1000
└─ src/
   ├─ app/
   │  ├─ layout.tsx             # fonts, metadata, ambient background
   │  ├─ page.tsx               # composes all sections
   │  ├─ globals.css            # tokens + Tailwind
   │  ├─ opengraph-image.tsx    # (optional) dynamic OG image
   │  ├─ sitemap.ts
   │  └─ robots.ts
   ├─ components/
   │  ├─ layout/    Nav.tsx, Footer.tsx, Ambient.tsx
   │  ├─ device/    IPhone.tsx, MacBook.tsx, StatusBar.tsx
   │  ├─ screens/   ProfileScreen.tsx, FitnessScreen.tsx, RideScreen.tsx,
   │  │             FoodScreen.tsx, ChatScreen.tsx, LockScreen.tsx,
   │  │             WebShop.tsx, WebDashboard.tsx, WebBooking.tsx
   │  ├─ sections/  Hero.tsx, AppShowcase.tsx, WebShowcase.tsx,
   │  │             StackDock.tsx, Services.tsx, Contact.tsx
   │  └─ ui/        Button.tsx, Tag.tsx, StoreBadge.tsx, Reveal.tsx, LiveClock.tsx
   ├─ data/
   │  ├─ profile.ts
   │  ├─ apps.ts
   │  ├─ web.ts
   │  ├─ stack.ts
   │  └─ services.ts
   ├─ hooks/        useGlow.ts, useReducedMotion.ts
   └─ lib/          utils.ts (cn helper), types.ts
```

---

## 4. Design tokens

Define in `globals.css` as CSS variables, then map them into the Tailwind theme.

```css
:root {
  --bg: #05060a;
  --panel: #0d0f15;
  --line: rgba(255,255,255,0.08);
  --line-hi: rgba(255,255,255,0.16);
  --text: #f4f5f8;
  --muted: #8b90a0;
  --glow: #5b8cff;          /* changes with the active app */

  --blue: #5b8cff;
  --violet: #b56bff;
  --pink: #ff6b9d;
  --green: #30d158;
  --orange: #ff9f0a;
  --yellow: #ffd60a;
}
```

- **Brand gradient:** `linear-gradient(100deg, #5b8cff, #b56bff 50%, #ff6b9d)`. Used on gradient headline words only.
- **Radii:** buttons 13–16px · cards 20–30px · pills 99px.
- **Headings:** weight 800, tracking `-0.045em` to `-0.05em`, line-height ~0.95.
- **Labels:** JetBrains Mono, 12px, uppercase, tracking `.04em`.
- **Easing:** `cubic-bezier(.2,.8,.2,1)` for all reveal/slide transitions.
- **Background:** near-black with a faint star field, plus a fixed radial "ambient" glow tinted by `--glow`.
- Dark theme only. No light mode.

---

## 5. Data models (`src/lib/types.ts`)

```ts
export type AppScreen = 'fitness' | 'ride' | 'food' | 'chat';
export type WebScreen = 'shop' | 'dash' | 'book';

export interface MobileApp {
  slug: string;
  name: string;
  emoji: string;            // app icon glyph
  category: string;         // "Health & Fitness"
  color: string;            // primary accent
  color2: string;           // secondary accent
  screen: AppScreen;        // placeholder UI if no screenshot
  screenshot?: string;      // /screens/apps/xxx.png overrides placeholder
  rating: string;           // "4.8★"
  downloads: string;        // "10k+"
  platforms: string;        // "iOS · Android"
  tech: string[];
  appStore?: string;
  playStore?: string;
}

export interface WebProject {
  slug: string;
  name: string;
  url: string;              // display domain
  color: string;
  color2: string;
  screen: WebScreen;
  screenshot?: string;      // /screens/web/xxx.png
  tech: string[];
  kpis: [value: string, label: string][];
  live?: string;
  repo?: string;
}

export interface StackItem { name: string; short: string; color: string; }
export interface StackGroup { title: string; color: string; items: StackItem[]; }

export interface Service { title: string; subtitle: string; emoji: string; color: string; }
```

### `src/data/profile.ts`

```ts
export const profile = {
  name: 'Pejay Paronable',
  initials: 'PP',
  role: 'Full Stack Developer',
  tagline: 'React Native apps & Next.js web',
  email: 'pjparonable@gmail.com',
  phone: '+966544773176',
  phoneDisplay: '+966 54 477 3176',
  whatsapp: 'https://wa.me/966544773176',
  timezone: 'Asia/Riyadh',
  available: true,
  photo: '/profile.jpg',
  cv: '/cv.pdf',
  stats: { apps: '12', projects: '40+', years: '5+', rating: '4.8★' },
  socials: { github: '', linkedin: '', x: '' }, // TODO: fill in
};
```

Seed `apps.ts`, `web.ts`, `stack.ts` and `services.ts` with the placeholder data from `design/reference.html` (FitTrack, RideNow, Foodie, Chatly / ShopFlow, Pulse Analytics, ClinicBook). Mark every placeholder with `// TODO: replace with real project`.

---

## 6. Sections (in page order)

### 6.1 Nav — `Nav.tsx` (client)
- Floating, centered, rounded-18 bar with glass blur, fixed 14px from the top.
- Left: `<Logo>` (the "<//>" mark: two mirrored P's as a code tag; also the favicon via `app/icon.svg`) + name. Center: Apps · Web · Stack · Services (hidden under 1000px). Right: white "Hire me" button that links to `#contact`.

### 6.2 Hero — `Hero.tsx`
- Two columns (one column under 1000px).
- **Left:** "OPEN" green pill + "Taking new projects"; headline `Apps that live in` / gradient `your pocket.`; one-line lead; two CTAs (Explore apps ↓, Let's talk); stat row (12 apps, 40+ projects, 5+ years, 4.8★).
- **Right:** `<HeroPortrait>`: `profile.jpg` (a monochrome side profile on black) with no frame or background. A radial mask fades its black backdrop into the page so no edge shows. No phone mockup (owner decision).
- Three floating glass "orbit" chips around the portrait: React Native, Next.js, Shipped to stores.
- **Scroll-scrubbed scenes (owner decision, overrides the above when present):** clips of Pejay link the sections. `pnpm frames <video> <name>` writes `public/scenes/<name>/`; scenes are configured in `src/data/scenes.ts` and rendered by `<ScrubScene>` (`components/scene/`) as full-screen pinned stages with HUD and `<SceneLayer>` overlays timed by scroll range. `intro` (hero + phone) replaces the two-column hero (stat cards in `src/data/hero.ts`); `laptop` sits between Apps and Web. A scene’s `handoff` fades the site’s own IPhone/MacBook mockup in over the filmed device (hand-measured `keys`; re-measure when a clip is replaced), then glides it onto the next section’s `[data-handoff]` device: the scene section overlaps the next one by 100dvh so both line up at the swap. Frames load only when a scene is near. Reduced motion falls back to the static hero and hides the other scenes.

### 6.3 App Showcase — `AppShowcase.tsx` (client) — **the signature section**
- Wrapper height = `apps.length * 90vh + 40vh`. Inner container is `position: sticky; top: 0; height: 100vh`.
- Use `useScroll({ target })` from `motion` to get progress 0→1, then:
  - `activeIndex = floor(progress * apps.length)`
  - `local = fractional progress within the current app`
- Desktop grid has three columns:
  1. **Info panel:** app icon, name, category, rating/downloads/platforms row, tech tags, App Store + Google Play badges. It cross-fades and slides up on change.
  2. **Phone:** `<IPhone>`. Screens sit in a horizontal track and slide with `translateX((i - active) * 105%)`. The phone rotates `rotateY((0.5 - local) * 22deg)` as you scroll.
  3. **App list:** clickable rows with an emoji icon, a progress bar under the active row (width = `local`), and a click that scrolls to that app's segment.
- On change, update `--glow` on `<html>` to the active app's color (via the `useGlow` hook) so the ambient light shifts.
- **Mobile (<1000px):** stack the title, phone (`min(46vw, 210px)` wide) and a compact centered info panel. Hide the list and show pagination dots.
- **Reduced motion:** disable the rotation and swap instantly instead of sliding.
- Screen rendering: if `app.screenshot` exists, render `next/image` filling the screen; otherwise render the placeholder component for `app.screen`.

### 6.4 Web Showcase — `WebShowcase.tsx` (client)
- Section header: mono label "WEB · NEXT.JS" + `On the big screen` / muted `too.`
- Left: stacked tab cards. The active card expands (grid-rows 0fr→1fr) to show tags and KPIs, with a ↗ link to the live site.
- Right: `<MacBook>` with a browser bar showing the project URL. Screens cross-fade and scale (1.03→1).
- Auto-rotate every 4.5s; stop auto-rotating after the user clicks a tab. Pause while the section is offscreen.

### 6.5 Stack — `StackDock.tsx` (client)
- macOS-style dock: glass bar holding rounded-square icons with a short code (e.g. "RN") in the tech's color, separated by group dividers.
- Magnification on hover (desktop pointer only): `scale = 1 + max(0, 1 - distance/150) * 0.55`, `transform-origin: bottom`.
- A tooltip with the full name appears above each icon on hover.
- Below the dock: 4 category cards (Frontend, Mobile, Backend, DevOps), each with a colored square and tags.
- On mobile the dock wraps and has no magnification.

### 6.6 Services — `Services.tsx`
- 4 square iOS-style widgets (2 columns on tablet, auto height on mobile). Each has a colored icon tile, a title and a one-line subtitle.
- Lift on hover (`translateY(-6px)`).

### 6.7 Contact — `Contact.tsx`
- Left: label, headline `Your app` / gradient `is next.`, and three contact rows (Email, WhatsApp, Call) that link to `mailto:`, `wa.me` and `tel:`.
- Right: `<IPhone>` rotated `rotateY(12deg)` showing `<LockScreen>`: live KSA date and time (`<LiveClock>`), plus three notifications that stagger in (700ms apart) when the section enters the viewport.
- Optional: a "Send a message" form using a Server Action and Resend (name, email, message only).

### 6.8 Footer
- Mono row: © year + name on the left; GitHub · LinkedIn · X · CV ↓ on the right.

---

## 7. Shared components

- **`<IPhone width screen>`**: CSS-only device. Width comes from a `--w` CSS variable and everything inside scales from it (radius `.16w`, bezel `.035w`, dynamic island, side buttons, status bar, home indicator). Children render in the screen area. Screen content uses `em` units based on `font-size: calc(var(--w) * .042)` so placeholder UIs scale with the phone.
- **`<StatusBar>`**: live KSA time (client), signal dots and a battery glyph.
- **`<MacBook>`**: lid with bezel, 16:10 display, base with notch.
- **`<Reveal>`**: fades and slides children up 36px when they enter the viewport (`whileInView`, `once: true`), with a stagger delay prop.
- **`<LiveClock format>`**: client component; formats with `timeZone: 'Asia/Riyadh'` and updates every 10s. Render a placeholder on the server to avoid hydration mismatch.
- **`<StoreBadge store="apple" | "google">`**: App Store badge is white, Google Play badge is dark glass.

---

## 8. SEO & metadata

- `metadata` in `layout.tsx`: title `Pejay Paronable — Mobile & Web Developer`, a short description, `openGraph` with `/og.png`, and a twitter card.
- JSON-LD `Person` schema (name, jobTitle, email, sameAs socials).
- `sitemap.ts` and `robots.ts`.
- One `<h1>` (the hero headline). Each section has an `<h2>`.

---

## 9. Performance checklist

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO.
- Only these are Client Components: Nav, AppShowcase, WebShowcase, StackDock, LiveClock, Reveal, Contact notifications.
- Load the profile photo and first app screenshot with `priority`; lazy-load everything else.
- Pure CSS animations (float, typing dots, dashed route) stay in CSS, not JS.
- No layout shift: every device and image has a fixed aspect ratio.
- Wrap all motion in reduced-motion checks.

---

## 10. Conventions

- Components: PascalCase, one per file, named exports.
- Use `cn()` (clsx + tailwind-merge) for conditional classes.
- Per-item accent colors go through inline CSS variables (`style={{ '--c': app.color }}`), not dynamic Tailwind class names.
- No `any`. Props are typed with interfaces from `lib/types.ts`.
- Keep components under ~150 lines. Split screen placeholders into their own files.
- Commit messages: conventional commits (`feat:`, `fix:`, `style:`, `refactor:`).

---

## 11. Build order

1. Scaffold the Next.js app, Tailwind, fonts, tokens and the ambient/star background.
2. Data files + types.
3. `IPhone`, `MacBook`, `StatusBar` + all placeholder screens (check them on a test page).
4. Hero → AppShowcase → WebShowcase → StackDock → Services → Contact → Footer.
5. Responsive pass (375 / 768 / 1280 / 1536).
6. Reduced-motion + accessibility pass.
7. SEO, OG image, sitemap.
8. Lighthouse check, then deploy to Vercel.

---

## 12. Owner TODOs (content to supply)

- [ ] `public/profile.jpg`: portrait photo
- [ ] Real app screenshots in `public/screens/apps/` and real web screenshots in `public/screens/web/`
- [ ] Real project names, stats, store links and live URLs in `src/data/`
- [ ] GitHub / LinkedIn / X URLs in `profile.ts`
- [ ] `public/cv.pdf`
- [ ] Domain + Resend API key (if the contact form is enabled)

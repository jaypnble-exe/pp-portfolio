import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IPhone } from "@/components/device/IPhone";
import { MacBook } from "@/components/device/MacBook";
import { LockScreen } from "@/components/screens/LockScreen";
import { MobileAppScreen } from "@/components/screens/MobileAppScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { WebProjectScreen } from "@/components/screens/WebProjectScreen";
import { apps } from "@/data/apps";
import { webProjects } from "@/data/web";

export const metadata: Metadata = { title: "Devices (dev)", robots: { index: false } };

/** Dev-only test page for devices + placeholder screens. 404s in production. */
export default function DevicesPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto grid w-[min(1200px,100%-32px)] gap-16 py-16">
      <section className="grid gap-6">
        <h1 className="label text-muted">Phones · 260px</h1>
        <div className="flex flex-wrap gap-10">
          <IPhone width="260px" label="Profile">
            <ProfileScreen />
          </IPhone>
          {apps.map((app, i) => (
            <IPhone key={app.slug} width="260px" label={app.name}>
              <MobileAppScreen app={app} preload={i === 0} />
            </IPhone>
          ))}
          <IPhone width="260px" showTime={false} label="Lock screen">
            <LockScreen />
          </IPhone>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="label text-muted">Scaling · 210px / 340px</h2>
        <div className="flex flex-wrap items-end gap-10">
          <IPhone width="min(46vw, 210px)" label={apps[0].name}>
            <MobileAppScreen app={apps[0]} />
          </IPhone>
          <IPhone width="340px" label={apps[apps.length - 1].name}>
            <MobileAppScreen app={apps[apps.length - 1]} />
          </IPhone>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="label text-muted">MacBook</h2>
        <div className="grid gap-16 lg:grid-cols-2">
          {webProjects.map((project) => (
            <MacBook key={project.slug} url={project.url} label={project.name}>
              <WebProjectScreen project={project} />
            </MacBook>
          ))}
        </div>
      </section>
    </main>
  );
}

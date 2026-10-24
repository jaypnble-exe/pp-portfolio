import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { LaptopScene } from "@/components/sections/LaptopScene";
import { Services } from "@/components/sections/Services";
import { StackDock } from "@/components/sections/StackDock";
import { WebShowcase } from "@/components/sections/WebShowcase";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-4 left-4 z-70 -translate-y-24 rounded-xl bg-text px-4 py-2.5 text-sm font-bold text-black focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <AppShowcase />
        <LaptopScene />
        <WebShowcase />
        <StackDock />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

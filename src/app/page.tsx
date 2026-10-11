import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { StackDock } from "@/components/sections/StackDock";
import { WebShowcase } from "@/components/sections/WebShowcase";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AppShowcase />
        <WebShowcase />
        <StackDock />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

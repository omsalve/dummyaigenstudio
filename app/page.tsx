import { About } from "@/components/home/About";
import { Discretion } from "@/components/home/Discretion";
import { Hero } from "@/components/home/Hero";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Lab } from "@/components/home/Lab";
import { Platforms } from "@/components/home/Platforms";
import { Services } from "@/components/home/Services";
import { ServicesSection } from "@/components/home/ServicesSection";

// Order: Hero → MassField (ServicesSection: services and industries as one
// field) → About → Services (the index, closing on the consultation tile) →
// StringChapter (IndustriesSection, #work) → Platforms → From the Lab →
// Discretion (#discretion) → Contact CTA.
// The hero's photograph, then glossy white throughout, broken once by About's
// band of Citrus lime; edge to edge with no gradients between sections.
// [SCAFFOLD] The Contact CTA wasn't in this repo; its slot is marked below.
export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <About />
      <Services />
      <IndustriesSection />
      <Platforms />
      <Lab />
      <Discretion />
      {/* [SCAFFOLD] Contact CTA */}
    </main>
  );
}

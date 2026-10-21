import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ServicesSection } from "@/components/home/ServicesSection";

// Order: Hero/HeroReel → Positioning → MassField (services) →
// StringChapter (industries) → Engagements → Contact CTA.
// [SCAFFOLD] Positioning, Engagements and Contact CTA weren't in this repo;
// their slots are marked below. There was no triptych slot to remove.
export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <About />
      <IndustriesSection />
      {/* [SCAFFOLD] Engagements */}
      {/* [SCAFFOLD] Contact CTA */}
    </main>
  );
}

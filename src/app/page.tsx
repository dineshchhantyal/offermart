import { HeroSection } from "@/components/sections/hero";
import { ImpactSection } from "@/components/sections/impact";
import { MissionSection } from "@/components/sections/mission";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { FeaturesSection } from "@/components/sections/features";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <MissionSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}

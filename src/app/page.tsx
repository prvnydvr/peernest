import { redirect } from "next/navigation";

import { Features } from "@/components/site/features";
import { FinalCTA } from "@/components/site/final-cta";
import { FloatingNav } from "@/components/site/floating-nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { ManifestoSplit } from "@/components/site/manifesto-split";
import { MarqueeBand } from "@/components/site/marquee-band";
import { ProductShowcase } from "@/components/site/product-showcase";
import { SocialProof } from "@/components/site/social-proof";
import { StatsBand } from "@/components/site/stats-band";
import { Testimonials } from "@/components/site/testimonials";
import { SectionDivider } from "@/components/site/visual/section-divider";
import { getCurrentUser } from "@/lib/auth";

export default async function MarketingPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/feed");
  }

  return (
    <main className="landing-page relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      <FloatingNav />
      <Hero />
      <SocialProof />
      <MarqueeBand />
      <SectionDivider label="Built for builders" />
      <Features />
      <div aria-hidden className="pointer-events-none relative h-20 sm:h-28">
        <div className="fog-bottom absolute inset-0" />
      </div>
      <StatsBand />
      <div aria-hidden className="pointer-events-none relative h-16 sm:h-24">
        <div className="line-glow absolute inset-x-0 top-1/2 -translate-y-1/2" />
      </div>
      <SectionDivider label="A glimpse inside" />
      <ProductShowcase />
      <ManifestoSplit />
      <div aria-hidden className="pointer-events-none relative h-16 sm:h-20">
        <div className="line-glow absolute inset-x-0 top-1/2 -translate-y-1/2" />
      </div>
      <SectionDivider label="What students say" />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}

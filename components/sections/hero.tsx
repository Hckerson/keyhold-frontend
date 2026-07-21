import { SectionShell } from "@/components/sections/section-shell";
import { HeroSearch } from "@/components/sections/hero-search";
import { CityChips } from "@/components/sections/city-chips";

const HERO_IMAGE =
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80";

export function HeroSection() {
    return (
        <section className="bg-background-alt flex min-h-[70vh] items-center py-20 md:py-24">
            <SectionShell>
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                    <div>
                        <p className="text-text-muted text-caption font-mono tracking-[0.14em] uppercase">
                            Curated Luxury Real Estate
                        </p>
                        <h1 className="font-display text-text text-h2 mt-5 mb-6 max-w-[12ch] leading-[1.08] font-light tracking-tight">
                            Find the home that finds{" "}
                            <span className="text-accent italic">you.</span>
                        </h1>
                        <p className="text-text-secondary mb-8 max-w-[44ch] text-lg">
                            A quiet, considered approach to extraordinary
                            property. Off-market estates and architectural
                            landmarks, presented with discretion.
                        </p>

                        <HeroSearch />
                        <CityChips />
                    </div>

                    <div className="relative hidden justify-self-end lg:block">
                        <div
                            aria-hidden="true"
                            className="bg-highlight/15 pointer-events-none absolute -right-8 -bottom-8 h-3/5 w-3/4 rounded-full blur-[70px]"
                        />
                        <img
                            src={HERO_IMAGE}
                            alt=""
                            aria-hidden="true"
                            className="relative h-[540px] w-[420px] translate-x-3.5 rounded-2xl object-cover shadow-2xl"
                        />
                    </div>
                </div>
            </SectionShell>
        </section>
    );
}

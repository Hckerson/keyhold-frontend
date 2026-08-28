import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { HeroSearch } from "@/components/sections/home/hero-search";
import { CityChips } from "@/components/sections/home/city-chips";
import { Button } from "@/components/ui/button";
import { propertyImage } from "@/lib/data/sample-images";

const HERO_IMAGE = propertyImage(0);

const HERO_CAPTION = {
    place: "Bel Air · Off-market",
    name: "The Ridge House",
};

export function HeroSection() {
    return (
        <section className="section-padb bg-background-alt relative isolate -mt-[88px] flex min-h-[70vh] items-center overflow-hidden pt-[112px]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--color-text)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000,transparent)] bg-[size:32px_32px] opacity-[0.04]"
            />

            <SectionShell>
                <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-4">
                            <SectionEyebrow tone="muted">
                                Curated luxury real estate
                            </SectionEyebrow>
                            <h1 className="font-display text-text text-h1 max-w-[11ch] leading-[1.02] font-light tracking-tight">
                                Find the home that finds{" "}
                                <span className="text-accent italic">you.</span>
                            </h1>
                            <p className="text-text-secondary max-w-[46ch] text-xs leading-[1.9]">
                                A quiet, considered approach to extraordinary
                                property. Off-market estates and architectural
                                landmarks, presented with discretion.
                            </p>
                        </div>

                        <HeroSearch />

                        <div className="flex flex-wrap items-center gap-3">
                            <Link href="/signup">
                                <Button variant="secondary" size="sm">
                                    Sign Up
                                    <ArrowUpRight
                                        size={13}
                                        strokeWidth={1.5}
                                        className="ml-1.5"
                                    />
                                </Button>
                            </Link>
                            <span className="text-text-muted text-xs">
                                Free to join · Save listings and track offers
                            </span>
                        </div>

                        <CityChips />
                    </div>

                    <div className="desk-only relative justify-self-end">
                        <div
                            aria-hidden="true"
                            className="bg-highlight/15 pointer-events-none absolute -right-8 -bottom-8 h-3/5 w-3/4 rounded-full blur-[70px]"
                        />
                        <img
                            src={HERO_IMAGE}
                            alt=""
                            aria-hidden="true"
                            className="relative h-130 w-102 translate-x-3.5 rounded-xl object-cover shadow-2xl"
                        />
                        <div className="bg-sidebar/80 border-sidebar-border absolute right-1 bottom-5 flex flex-col gap-1 rounded-xl border px-3.5 py-2.5 shadow-lg backdrop-blur-md">
                            <span className="text-highlight-light font-mono text-[10px] tracking-[0.14em] uppercase">
                                {HERO_CAPTION.place}
                            </span>
                            <span className="text-text-inverse text-xs font-semibold">
                                {HERO_CAPTION.name}
                            </span>
                        </div>
                    </div>
                </div>
            </SectionShell>
        </section>
    );
}

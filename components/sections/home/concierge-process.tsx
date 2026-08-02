"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CONCIERGE_STEPS } from "@/lib/data/home-concierge";
import { ConciergeProgress } from "@/components/sections/home/concierge-progress";
import { ConciergeStepPanel } from "@/components/sections/home/concierge-step-panel";

const ACTIVE_BAND_MARGIN = "-45% 0px -45% 0px";

export function ConciergeProcess({ children }: { children: ReactNode }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const panelsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const panels: Element[] = panelsRef.current.filter(
            (panel) => panel !== null,
        );
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const index = panels.indexOf(entry.target);
                    if (index !== -1) setActiveIdx(index);
                }
            },
            { rootMargin: ACTIVE_BAND_MARGIN },
        );
        panels.forEach((panel) => observer.observe(panel));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="grid gap-10 lg:grid-cols-[36%_1fr] lg:gap-16">
            <div className="flex flex-col gap-8 lg:sticky lg:top-22 lg:self-start lg:py-10">
                {children}
                <ConciergeProgress
                    steps={CONCIERGE_STEPS}
                    activeIdx={activeIdx}
                />
            </div>

            <ol className="flex flex-col gap-4 lg:gap-6">
                {CONCIERGE_STEPS.map((step, index) => (
                    <ConciergeStepPanel
                        key={step.idx}
                        step={step}
                        active={index === activeIdx}
                        ref={(panel) => {
                            panelsRef.current[index] = panel;
                        }}
                    />
                ))}
            </ol>
        </div>
    );
}

ConciergeProcess.displayName = "ConciergeProcess";

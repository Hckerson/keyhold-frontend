import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MEDIA = {
    motion: "(prefers-reduced-motion: no-preference)",
    still: "(prefers-reduced-motion: reduce)",
};

interface StageTimeline {
    compose: (film: gsap.core.Timeline, still: boolean) => void;
    peak: string;
    defaults: gsap.TweenVars;
}

export const useStageTimeline = (
    trackRef: RefObject<HTMLElement | null>,
    { compose, peak, defaults }: StageTimeline,
) =>
    useGSAP(
        () => {
            const track = trackRef.current;
            if (!track) return;
            const media = gsap.matchMedia();
            media.add(MEDIA, (context) => {
                const still = context.conditions?.still ?? false;
                const film = gsap.timeline(
                    still
                        ? { defaults, paused: true }
                        : {
                              defaults,
                              scrollTrigger: {
                                  trigger: track,
                                  start: "top top",
                                  end: "bottom bottom",
                                  scrub: true,
                              },
                          },
                );
                compose(film, still);
                if (still) film.seek(peak);
            });
            return () => media.revert();
        },
        { scope: trackRef, dependencies: [compose, peak, defaults] },
    );

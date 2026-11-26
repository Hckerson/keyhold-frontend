"use client";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

const syncScrollTrigger = () => ScrollTrigger.update();

interface Props {
    options: LenisOptions;
    children: ReactNode;
}

export default function StageScrollProvider({ options, children }: Props) {
    const still = useReducedMotion() ?? false;
    const lenis = useLenis(syncScrollTrigger);

    useEffect(() => {
        if (!lenis) return;
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick, false, true);
        gsap.ticker.lagSmoothing(0);
        return () => gsap.ticker.remove(tick);
    }, [lenis]);

    if (still) return children;

    return (
        <ReactLenis root options={{ ...options, autoRaf: false }}>
            {children}
        </ReactLenis>
    );
}

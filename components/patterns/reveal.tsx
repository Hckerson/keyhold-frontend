"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { REVEAL_MOTION, REVEAL_VIEWPORT } from "@/lib/config/public-motion";

export interface RevealProps {
    children: ReactNode;
    className?: string;
}

export function Reveal({ children, className }: RevealProps) {
    return (
        <m.div
            data-reveal=""
            variants={REVEAL_MOTION}
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            className={className}
        >
            {children}
        </m.div>
    );
}

Reveal.displayName = "Reveal";

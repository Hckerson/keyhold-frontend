"use client";

import type { ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { CONTENT_SWAP_MOTION } from "@/lib/config/motion";

export interface PresenceSwapProps {
    swapKey: string;
    children: ReactNode;
    className?: string;
}

export function PresenceSwap({
    swapKey,
    children,
    className,
}: PresenceSwapProps) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            <m.div key={swapKey} {...CONTENT_SWAP_MOTION} className={className}>
                {children}
            </m.div>
        </AnimatePresence>
    );
}

PresenceSwap.displayName = "PresenceSwap";

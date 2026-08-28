"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { PAGE_SWAP_MOTION } from "@/lib/config/motion";

export interface PageSwapProps {
    swapKey: string | number;
    children: ReactNode;
    className?: string;
}

export function PageSwap({ swapKey, children, className }: PageSwapProps) {
    return (
        <m.div key={swapKey} {...PAGE_SWAP_MOTION} className={className}>
            {children}
        </m.div>
    );
}

PageSwap.displayName = "PageSwap";

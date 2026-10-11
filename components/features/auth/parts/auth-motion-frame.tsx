"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { FrozenRoute } from "@/components/features/auth/parts/frozen-route";

export interface AuthMotionFrameProps {
    children: ReactNode;
}

export function AuthMotionFrame({ children }: AuthMotionFrameProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <FrozenRoute key={pathname}>{children}</FrozenRoute>
        </AnimatePresence>
    );
}

AuthMotionFrame.displayName = "AuthMotionFrame";

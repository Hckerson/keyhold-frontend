"use client";

import { useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnimatePresence } from "motion/react";

function FrozenRoute({ children }: { children: ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const [frozen] = useState(context);

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

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

"use client";

import { useContext, useState, type ReactNode } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface FrozenRouteProps {
    children: ReactNode;
}

export function FrozenRoute({ children }: FrozenRouteProps) {
    const context = useContext(LayoutRouterContext);
    const [frozen] = useState(context);

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

FrozenRoute.displayName = "FrozenRoute";

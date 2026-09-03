"use client";

import type { ReactNode } from "react";
import { useSessionSync } from "@/lib/hooks/use-session-sync";

export function SessionProvider({ children }: { children: ReactNode }) {
    useSessionSync();
    return <>{children}</>;
}

SessionProvider.displayName = "SessionProvider";

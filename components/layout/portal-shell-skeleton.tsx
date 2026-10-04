import type { ReactNode } from "react";
import { ConsoleCanvas } from "@/components/layout/console-canvas";

export function PortalShellSkeleton({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background-alt flex h-screen" aria-busy="true">
            <div className="desk-only bg-sidebar border-sidebar-border w-52 shrink-0 border-r" />
            <main className="scroll-page min-w-0 flex-1">
                <div className="border-border bg-background h-14 border-b" />
                <ConsoleCanvas>{children}</ConsoleCanvas>
            </main>
        </div>
    );
}

PortalShellSkeleton.displayName = "PortalShellSkeleton";

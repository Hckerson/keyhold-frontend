"use client";

import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";

export default function DashboardError({ reset }: { reset: () => void }) {
    return (
        <ConsoleUnavailable
            fallback={CONSOLE_FALLBACKS.buyerPortal}
            onRetry={reset}
        />
    );
}

"use client";

import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";

export default function AgentError({ reset }: { reset: () => void }) {
    return (
        <ConsoleUnavailable
            fallback={CONSOLE_FALLBACKS.agentPortal}
            onRetry={reset}
        />
    );
}

"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import type { ConsoleFallback } from "@/lib/config/console-fallbacks";

const RETRY_LABEL = "Retry";

export interface ConsoleUnavailableProps {
    fallback: ConsoleFallback;
    onRetry: () => void;
}

export function ConsoleUnavailable({
    fallback,
    onRetry,
}: ConsoleUnavailableProps) {
    return (
        <Panel title={fallback.panel}>
            <EmptyState
                icon={TriangleAlert}
                title={fallback.title}
                description={fallback.description}
                action={
                    <Button type="button" size="sm" onClick={onRetry}>
                        {RETRY_LABEL}
                    </Button>
                }
            />
        </Panel>
    );
}

ConsoleUnavailable.displayName = "ConsoleUnavailable";

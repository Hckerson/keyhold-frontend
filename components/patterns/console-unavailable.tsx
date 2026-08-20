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
        <Panel title={fallback.panel} description={fallback.description}>
            <EmptyState
                icon={TriangleAlert}
                title={fallback.title}
                description={fallback.description}
            />
            <div className="flex justify-center pb-4">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onRetry}
                >
                    {RETRY_LABEL}
                </Button>
            </div>
        </Panel>
    );
}

ConsoleUnavailable.displayName = "ConsoleUnavailable";

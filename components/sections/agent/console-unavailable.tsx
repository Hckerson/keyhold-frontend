"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";

const TITLE = "We couldn't load your portfolio";
const LEDE =
    "The listing service is unreachable right now. Try again in a moment.";

export interface ConsoleUnavailableProps {
    onRetry: () => void;
}

export function ConsoleUnavailable({ onRetry }: ConsoleUnavailableProps) {
    return (
        <Panel title="Listing Book" description={LEDE}>
            <EmptyState icon={TriangleAlert} title={TITLE} description={LEDE} />
            <div className="flex justify-center pb-4">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onRetry}
                >
                    Retry
                </Button>
            </div>
        </Panel>
    );
}

ConsoleUnavailable.displayName = "ConsoleUnavailable";

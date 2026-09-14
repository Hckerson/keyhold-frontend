"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SearchResultsErrorProps {
    onRetry: () => void;
}

export function SearchResultsError({ onRetry }: SearchResultsErrorProps) {
    return (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
            <TriangleAlert
                size={16}
                strokeWidth={1.5}
                className="text-text-muted"
            />
            <p className="text-text text-xs font-medium">
                We couldn&apos;t load these residences
            </p>
            <p className="text-text-muted max-w-80 text-xs">
                The collection service is unreachable right now. Try again in a
                moment.
            </p>
            <Button type="button" onClick={onRetry}>
                Retry
            </Button>
        </div>
    );
}

SearchResultsError.displayName = "SearchResultsError";

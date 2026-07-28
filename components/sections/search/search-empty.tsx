"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

interface SearchEmptyProps {
    onReset: () => void;
}

export function SearchEmpty({ onReset }: SearchEmptyProps) {
    return (
        <EmptyState
            icon={SearchX}
            title="No listings found"
            description="Nothing matches this combination. Try widening the price band, dropping a bedroom, or clearing the location."
            action={
                <Button variant="secondary" size="sm" onClick={onReset}>
                    Clear all filters
                </Button>
            }
        />
    );
}

SearchEmpty.displayName = "SearchEmpty";

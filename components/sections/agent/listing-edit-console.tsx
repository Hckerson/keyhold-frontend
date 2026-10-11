"use client";

import { ListingFormConsole } from "@/components/sections/agent/listing-form-console";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useProperty } from "@/lib/hooks/use-properties";

export interface ListingEditConsoleProps {
    listingId: string;
}

export function ListingEditConsole({ listingId }: ListingEditConsoleProps) {
    const property = useProperty(listingId);

    if (property.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentListings}
                onRetry={() => void property.refetch()}
            />
        );

    if (!property.data) return <ConsoleSkeleton variant="form" />;

    return <ListingFormConsole property={property.data} />;
}

ListingEditConsole.displayName = "ListingEditConsole";

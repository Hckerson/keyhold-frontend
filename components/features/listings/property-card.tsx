"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PropertyCardMedia } from "@/components/features/listings/property-card-media";
import {
    PropertyCardBody,
    type PropertyAgent,
} from "@/components/features/listings/property-card-body";
import type { PropertyStatus } from "@/lib/enums/enums";

export type { PropertyStatus, PropertyAgent };

export interface Property {
    id: string;
    price: number;
    address: string;
    locality: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    status?: PropertyStatus;
    featured?: boolean;
    agent?: PropertyAgent;
}

export interface PropertyCardProps {
    property: Property;
    saved?: boolean;
    onSaveChange?: (saved: boolean) => void;
    onView?: (id: string) => void;
    href?: string;
    className?: string;
}

export function PropertyCard({
    property,
    saved,
    onSaveChange,
    onView,
    href,
    className,
}: PropertyCardProps) {
    const [internalSaved, setInternalSaved] = useState(false);
    const isSaved = saved ?? internalSaved;

    const toggleSave = () => {
        const next = !isSaved;
        onSaveChange?.(next);
        if (saved === undefined) setInternalSaved(next);
    };

    return (
        <article
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                className,
            )}
        >
            <PropertyCardMedia
                imageUrl={property.imageUrl}
                address={property.address}
                price={property.price}
                status={property.status}
                featured={property.featured}
                saved={isSaved}
                onToggleSave={toggleSave}
            />

            <PropertyCardBody
                address={property.address}
                locality={property.locality}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                agent={property.agent}
                href={href}
                onView={() => onView?.(property.id)}
            />
        </article>
    );
}

PropertyCard.displayName = "PropertyCard";

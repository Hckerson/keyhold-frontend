"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { PropertySpecs } from "@/components/ui/property-specs";
import { PROPERTY_STATUS_LABELS, type PropertyStatus } from "@/lib/enums/enums";

/* --------------------------------- Types --------------------------------- */

export type { PropertyStatus };

export interface PropertyAgent {
    name: string;
    avatarUrl?: string;
}

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

/* ------------------------------- Save button ------------------------------ */

function SaveButton({
    saved,
    onToggle,
}: {
    saved: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save property"}
            className="bg-background/80 text-text hover:text-highlight border-border-light ease-smooth flex size-9 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-200"
        >
            <Heart
                size={16}
                strokeWidth={1.5}
                className={cn(saved && "fill-highlight text-highlight")}
            />
        </button>
    );
}

/* ---------------------------------- Media --------------------------------- */

function PropertyMedia({
    property,
    saved,
    onToggleSave,
}: {
    property: Property;
    saved: boolean;
    onToggleSave: () => void;
}) {
    return (
        <div className="relative aspect-[4/3] overflow-hidden">
            <img
                src={property.imageUrl}
                alt={property.address}
                className="ease-smooth size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 top-4 flex items-start justify-between">
                <div className="flex flex-col items-start gap-2">
                    {property.status && (
                        <span className="bg-background/80 text-text-secondary border-border-light text-caption rounded-full border px-3 py-1 font-medium tracking-wide uppercase backdrop-blur-sm">
                            {PROPERTY_STATUS_LABELS[property.status]}
                        </span>
                    )}
                    {property.featured && (
                        <span className="bg-highlight text-text-inverse text-caption rounded-full px-3 py-1 font-medium tracking-wide uppercase">
                            Featured
                        </span>
                    )}
                    {saved && (
                        <span className="bg-accent text-text-inverse text-caption rounded-full px-3 py-1 font-medium tracking-wide uppercase">
                            Saved
                        </span>
                    )}
                </div>
                <SaveButton saved={saved} onToggle={onToggleSave} />
            </div>
        </div>
    );
}

/* -------------------------------- Property -------------------------------- */

const viewDetailsClass =
    "group/btn text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200";

const viewDetailsArrow = (
    <ArrowUpRight
        size={12}
        strokeWidth={1.5}
        className="ease-smooth transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
    />
);

function AgentByline({ agent }: { agent: PropertyAgent }) {
    return (
        <div className="flex min-w-0 items-center gap-2">
            <Avatar
                size="sm"
                src={agent.avatarUrl}
                alt={agent.name}
                initials={agent.name.charAt(0)}
            />
            <span className="text-text-secondary truncate text-xs">
                {agent.name}
            </span>
        </div>
    );
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
            <PropertyMedia
                property={property}
                saved={isSaved}
                onToggleSave={toggleSave}
            />

            <div className="flex flex-col gap-3 p-3">
                <div className="space-y-1">
                    <p className="text-h5 font-display text-text font-light tracking-tight tabular-nums">
                        ${property.price.toLocaleString()}
                    </p>
                    <div className="text-text-secondary flex items-center gap-1.5 text-xs">
                        <MapPin
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-muted shrink-0"
                        />
                        <span className="truncate">
                            {property.address}, {property.locality}
                        </span>
                    </div>
                </div>

                <PropertySpecs
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    className="border-border border-t pt-3"
                />

                <div className="border-border flex items-center justify-between gap-3 border-t pt-3">
                    {property.agent ? (
                        <AgentByline agent={property.agent} />
                    ) : (
                        <span />
                    )}

                    {href ? (
                        <Link href={href} className={viewDetailsClass}>
                            View details
                            {viewDetailsArrow}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onView?.(property.id)}
                            className={viewDetailsClass}
                        >
                            View details
                            {viewDetailsArrow}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

PropertyCard.displayName = "PropertyCard";

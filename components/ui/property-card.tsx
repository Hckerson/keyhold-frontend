"use client";

import { useState } from "react";
import {
    BedDouble,
    Bath,
    Ruler,
    Heart,
    MapPin,
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

export type PropertyStatus = "for-sale" | "for-rent" | "new" | "sold";

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
}

export interface PropertyCardProps {
    property: Property;
    saved?: boolean;
    onSaveChange?: (saved: boolean) => void;
    onView?: (id: string) => void;
    className?: string;
}

const statusLabels: Record<PropertyStatus, string> = {
    "for-sale": "For Sale",
    "for-rent": "For Rent",
    new: "New Listing",
    sold: "Sold",
};

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

/* -------------------------------- Spec list ------------------------------- */

function SpecList({
    beds,
    baths,
    sqft,
}: Pick<Property, "beds" | "baths" | "sqft">) {
    const specs = [
        { icon: BedDouble, value: beds, label: beds === 1 ? "Bed" : "Beds" },
        { icon: Bath, value: baths, label: baths === 1 ? "Bath" : "Baths" },
        { icon: Ruler, value: sqft.toLocaleString(), label: "Sq Ft" },
    ];
    return (
        <div className="border-border-light flex items-center gap-5 border-t pt-4">
            {specs.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="text-text-secondary text-sm">
                        <span className="text-text font-medium">{value}</span>{" "}
                        {label}
                    </span>
                </div>
            ))}
        </div>
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
                            {statusLabels[property.status]}
                        </span>
                    )}
                    {property.featured && (
                        <span className="bg-highlight text-text-inverse text-caption rounded-full px-3 py-1 font-medium tracking-wide uppercase">
                            Featured
                        </span>
                    )}
                </div>
                <SaveButton saved={saved} onToggle={onToggleSave} />
            </div>
        </div>
    );
}

/* -------------------------------- Property -------------------------------- */

export function PropertyCard({
    property,
    saved,
    onSaveChange,
    onView,
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

            <div className="flex flex-col gap-2 p-4">
                <div className="space-y-1">
                    <p className="text-h4 font-display text-text font-light tracking-tight">
                        ${property.price.toLocaleString()}
                    </p>
                    <div className="text-text-secondary flex items-center gap-1.5 text-sm">
                        <MapPin
                            size={14}
                            strokeWidth={1.5}
                            className="text-text-muted shrink-0"
                        />
                        <span className="truncate">
                            {property.address}, {property.locality}
                        </span>
                    </div>
                </div>

                <SpecList
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                />

                <button
                    type="button"
                    onClick={() => onView?.(property.id)}
                    className="group/btn text-accent hover:text-accent-dark ease-smooth mt-1 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                >
                    View details
                    <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                        className="ease-smooth transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                </button>
            </div>
        </article>
    );
}

PropertyCard.displayName = "PropertyCard";

"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUS_LABELS, type PropertyStatus } from "@/lib/enums/enums";

export interface PropertyCardMediaProps {
    imageUrl: string;
    address: string;
    status?: PropertyStatus;
    featured?: boolean;
    saved: boolean;
    onToggleSave: () => void;
}

export function PropertyCardMedia({
    imageUrl,
    address,
    status,
    featured,
    saved,
    onToggleSave,
}: PropertyCardMediaProps) {
    return (
        <div className="relative aspect-[4/3] overflow-hidden">
            <img
                src={imageUrl}
                alt={address}
                className="ease-smooth size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 top-4 flex items-start justify-between">
                <div className="flex flex-col items-start gap-2">
                    {status && (
                        <span className="bg-background/80 text-text-secondary border-border-light text-caption rounded-full border px-3 py-1 font-medium tracking-wide uppercase backdrop-blur-sm">
                            {PROPERTY_STATUS_LABELS[status]}
                        </span>
                    )}
                    {featured && (
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
                <button
                    type="button"
                    onClick={onToggleSave}
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
            </div>
        </div>
    );
}

"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUS_LABELS, type PropertyStatus } from "@/lib/enums/enums";

export interface PropertyCardMediaProps {
    imageUrl: string;
    address: string;
    price: number;
    status?: PropertyStatus;
    featured?: boolean;
    saved: boolean;
    onToggleSave: () => void;
}

const badgeBase =
    "rounded-md px-2 py-1 font-mono text-[10px] font-medium tracking-wide uppercase";

export function PropertyCardMedia({
    imageUrl,
    address,
    price,
    status,
    featured,
    saved,
    onToggleSave,
}: PropertyCardMediaProps) {
    return (
        <div className="relative aspect-4/3 overflow-hidden">
            <img
                src={imageUrl}
                alt={address}
                className="size-full object-cover"
            />

            <p className="bg-background text-text text-h5 font-display absolute bottom-3 left-3 rounded-md px-2.5 py-1 leading-none font-light">
                ${price.toLocaleString()}
            </p>

            <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-col items-start gap-1.5">
                    {status && (
                        <span
                            className={cn(
                                badgeBase,
                                "bg-background text-text-secondary",
                            )}
                        >
                            {PROPERTY_STATUS_LABELS[status]}
                        </span>
                    )}
                    {featured && (
                        <span
                            className={cn(
                                badgeBase,
                                "bg-highlight text-text-inverse",
                            )}
                        >
                            Featured
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onToggleSave}
                    aria-pressed={saved}
                    aria-label={saved ? "Remove from saved" : "Save property"}
                    className="bg-background text-text hover:text-highlight focus-visible:ring-accent ease-smooth grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Heart
                        size={14}
                        strokeWidth={1.5}
                        className={cn(saved && "fill-highlight text-highlight")}
                    />
                </button>
            </div>
        </div>
    );
}

PropertyCardMedia.displayName = "PropertyCardMedia";

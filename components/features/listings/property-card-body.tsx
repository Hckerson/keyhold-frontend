"use client";

import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { PropertySpecs } from "@/components/features/listings/property-specs";

export interface PropertyAgent {
    name: string;
    avatarUrl?: string;
}

export interface PropertyCardBodyProps {
    price: number;
    address: string;
    locality: string;
    beds: number;
    baths: number;
    sqft: number;
    agent?: PropertyAgent;
    href?: string;
    onView?: () => void;
}

const viewDetailsClass =
    "group/btn text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200";

const viewDetailsArrow = (
    <ArrowUpRight
        size={12}
        strokeWidth={1.5}
        className="ease-smooth transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
    />
);

export function PropertyCardBody({
    price,
    address,
    locality,
    beds,
    baths,
    sqft,
    agent,
    href,
    onView,
}: PropertyCardBodyProps) {
    return (
        <div className="flex flex-col gap-3 p-3">
            <div className="space-y-1">
                <p className="text-h5 font-display text-text font-light tracking-tight tabular-nums">
                    ${price.toLocaleString()}
                </p>
                <div className="text-text-secondary flex items-center gap-1.5 text-xs">
                    <MapPin
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="truncate">
                        {address}, {locality}
                    </span>
                </div>
            </div>

            <PropertySpecs
                beds={beds}
                baths={baths}
                sqft={sqft}
                className="border-border border-t pt-3"
            />

            <div className="border-border flex items-center justify-between gap-3 border-t pt-3">
                {agent ? (
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
                        onClick={onView}
                        className={viewDetailsClass}
                    >
                        View details
                        {viewDetailsArrow}
                    </button>
                )}
            </div>
        </div>
    );
}

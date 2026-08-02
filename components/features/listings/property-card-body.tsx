"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { PropertySpecs } from "@/components/features/listings/property-specs";

export interface PropertyAgent {
    name: string;
    avatarUrl?: string;
}

export interface PropertyCardBodyProps {
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
    "group/btn text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth inline-flex shrink-0 items-center gap-1 rounded text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

const viewDetailsArrow = (
    <ArrowUpRight
        size={12}
        strokeWidth={1.5}
        className="ease-smooth transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
    />
);

export function PropertyCardBody({
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
        <div className="flex flex-col gap-2 p-3">
            <div className="min-w-0">
                <p className="text-text truncate text-xs font-medium">
                    {address}
                </p>
                <p className="text-text-muted mt-0.5 truncate text-xs">
                    {locality}
                </p>
            </div>

            <PropertySpecs
                beds={beds}
                baths={baths}
                sqft={sqft}
                className="bg-background-alt rounded-md px-2.5 py-2"
            />

            <div className="flex items-center justify-between gap-2">
                {agent ? (
                    <div className="flex min-w-0 items-center gap-1.5">
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
                        View
                        {viewDetailsArrow}
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={onView}
                        className={viewDetailsClass}
                    >
                        View
                        {viewDetailsArrow}
                    </button>
                )}
            </div>
        </div>
    );
}

PropertyCardBody.displayName = "PropertyCardBody";

"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { PanelLink } from "@/components/features/shared/panel-link";
import { InterestStatusGlyph } from "@/components/features/dashboard/interest-status-glyph";
import { InterestTractionChip } from "@/components/features/dashboard/interest-traction-chip";
import { INTEREST_STATUSES } from "@/lib/config/interest-tones";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { isOpen, tractionOf } from "@/lib/data/interests";
import { BUYER_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";
import type { Interest } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";

const NO_AGENCY = "Independent";
const MESSAGE_ACTION = "Message";

export interface InterestRowProps {
    interest: Interest;
}

export function InterestRow({ interest }: InterestRowProps) {
    const status = INTEREST_STATUSES[interest.status];

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth h-11 transition-colors",
                interest.status === "pending"
                    ? "bg-background-muted/30"
                    : "hover:bg-background-muted",
            )}
        >
            <td className="py-0">
                <span className="flex min-w-0 items-center gap-2">
                    <InterestStatusGlyph status={interest.status} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {status.label}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                <Link
                    href={PUBLIC_ROUTES.listing(interest.listingId)}
                    className="group flex min-w-0 items-center gap-2"
                >
                    <ListingThumb src={interest.photo} alt={interest.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {interest.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {interest.locality}
                        </span>
                    </span>
                </Link>
            </td>
            <td className="py-0 pl-3">
                <span className="min-w-0 truncate text-xs">
                    <span className="text-text-secondary">
                        {interest.agent}
                    </span>
                    <span className="text-text-muted">
                        {" · "}
                        {interest.agency ?? NO_AGENCY}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                <InterestTractionChip traction={tractionOf(interest)} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(interest.listPrice, 2)}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatAge(interest.minutesAgo)}
            </td>
            <td className="py-0 pl-3 text-right">
                {isOpen(interest) ? (
                    <PanelLink
                        href={BUYER_ROUTES.messages}
                        label={MESSAGE_ACTION}
                    />
                ) : (
                    <span className="micro-label">{status.label}</span>
                )}
            </td>
        </m.tr>
    );
}

InterestRow.displayName = "InterestRow";

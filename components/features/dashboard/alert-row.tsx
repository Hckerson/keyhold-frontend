"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { AlertChannelMark } from "@/components/features/dashboard/alert-channel-mark";
import { AlertTypeGlyph } from "@/components/features/dashboard/alert-type-glyph";
import { ALERT_TYPES } from "@/lib/config/alert-tones";
import type { Alert } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { PUBLIC_ROUTES } from "@/lib/constants";

const READ_LABEL = "Read";
const MARK_LABEL = "Mark read";
const NO_VALUE = "—";

export interface AlertRowProps {
    alert: Alert;
    onMarkRead: (id: string) => void;
}

function AlertSubject({ alert }: { alert: Alert }) {
    const body = (
        <>
            <ListingThumb src={alert.photo} alt={alert.address} />
            <span className="min-w-0 truncate text-xs">
                <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                    {alert.address}
                </span>
                {alert.locality && (
                    <span className="text-text-muted">
                        {" · "}
                        {alert.locality}
                    </span>
                )}
            </span>
        </>
    );

    return alert.listingId ? (
        <Link
            href={PUBLIC_ROUTES.listing(alert.listingId)}
            className="group flex min-w-0 items-center gap-2"
        >
            {body}
        </Link>
    ) : (
        <span className="group flex min-w-0 items-center gap-2">{body}</span>
    );
}

AlertSubject.displayName = "AlertSubject";

export function AlertRow({ alert, onMarkRead }: AlertRowProps) {
    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth h-11 transition-colors",
                alert.read ? "hover:bg-background-muted" : "bg-accent-light/40",
            )}
        >
            <td className="py-0">
                <span className="flex min-w-0 items-center gap-2">
                    <AlertTypeGlyph type={alert.type} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {ALERT_TYPES[alert.type].label}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                <AlertSubject alert={alert} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {alert.price === null
                    ? NO_VALUE
                    : formatMillions(alert.price, 2)}
            </td>
            <td className="py-0 pl-3">
                <AlertChannelMark channel={alert.channel} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatAge(alert.minutesAgo)}
            </td>
            <td className="py-0 pl-3 text-right">
                {alert.read ? (
                    <span className="micro-label">{READ_LABEL}</span>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkRead(alert.id)}
                    >
                        {MARK_LABEL}
                    </Button>
                )}
            </td>
        </m.tr>
    );
}

AlertRow.displayName = "AlertRow";

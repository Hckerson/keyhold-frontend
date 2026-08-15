"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { MoveChip } from "@/components/patterns/move-chip";
import { AlertChannelMark } from "@/components/features/dashboard/alert-channel-mark";
import { AlertTypeGlyph } from "@/components/features/dashboard/alert-type-glyph";
import { ALERT_TYPES } from "@/lib/config/alert-tones";
import { movePercent } from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";

const READ_LABEL = "Read";
const MARK_LABEL = "Mark read";

export interface AlertRowProps {
    alert: Alert;
    onMarkRead: (id: string) => void;
}

export function AlertRow({ alert, onMarkRead }: AlertRowProps) {
    return (
        <tr
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
                <Link
                    href={`/listing/${alert.listingId}`}
                    className="group flex min-w-0 items-center gap-2"
                >
                    <ListingThumb src={alert.photo} alt={alert.address} />
                    <span className="min-w-0 truncate text-xs">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {alert.address}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {alert.locality}
                        </span>
                    </span>
                </Link>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(alert.price, 2)}
            </td>
            <td className="py-0 pl-3 text-right">
                <MoveChip percent={movePercent(alert)} />
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
        </tr>
    );
}

AlertRow.displayName = "AlertRow";

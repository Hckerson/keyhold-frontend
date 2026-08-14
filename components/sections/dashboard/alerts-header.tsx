"use client";

import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const ALERTS_TITLE = "Alerts";
const ALERTS_LEDE =
    "Price moves, new matches and replies across your saved book";
const MARK_ALL_ACTION = "Mark All Read";

export interface AlertsHeaderProps {
    summary: string;
    unread: number;
    onMarkAllRead: () => void;
}

export function AlertsHeader({
    summary,
    unread,
    onMarkAllRead,
}: AlertsHeaderProps) {
    return (
        <PortalHeader
            title={ALERTS_TITLE}
            lede={ALERTS_LEDE}
            summary={summary}
            action={
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={unread === 0}
                    onClick={onMarkAllRead}
                >
                    <CheckCheck
                        className="mr-1.5 size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {MARK_ALL_ACTION}
                </Button>
            }
        />
    );
}

AlertsHeader.displayName = "AlertsHeader";

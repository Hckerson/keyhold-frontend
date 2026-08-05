"use client";

import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {ALERTS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {ALERTS_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
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
            </div>
        </header>
    );
}

AlertsHeader.displayName = "AlertsHeader";

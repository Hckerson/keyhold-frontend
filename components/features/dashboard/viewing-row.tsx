import Link from "next/link";
import { Phone, CalendarClock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import type { Viewing } from "@/lib/types";

export interface ViewingRowProps {
    viewing: Viewing;
    messageHref?: string;
    onReschedule?: (id: string) => void;
    onCancel?: (id: string) => void;
    className?: string;
}

const statusTone = {
    confirmed: "success",
    pending: "warning",
    cancelled: "error",
} as const;

export function formatViewingDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

export function ViewingRow({
    viewing,
    messageHref = "/dashboard/messages",
    onReschedule,
    onCancel,
    className,
}: ViewingRowProps) {
    const { id, address, date, time, agent, agentPhone, status } = viewing;
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    const isActive = status !== "cancelled";

    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                    {address}
                </h3>
                <StatusBadge tone={statusTone[status]}>
                    {statusLabel}
                </StatusBadge>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                    <p className="micro-label">Date &amp; Time</p>
                    <p className="text-text mt-0.5 text-xs font-medium tabular-nums">
                        {formatViewingDate(date)} at {time}
                    </p>
                </div>
                <div>
                    <p className="micro-label">Agent</p>
                    <p className="text-text mt-0.5 text-xs font-medium">
                        {agent}
                    </p>
                    <p className="text-text-muted text-xs tabular-nums">
                        {agentPhone}
                    </p>
                </div>
            </div>

            <div className="border-border-light mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
                <a href={`tel:${agentPhone}`}>
                    <Button variant="secondary" size="sm">
                        <Phone size={12} strokeWidth={1.5} className="mr-1.5" />
                        Call Agent
                    </Button>
                </a>
                {isActive && onReschedule && (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onReschedule(id)}
                    >
                        <CalendarClock
                            size={12}
                            strokeWidth={1.5}
                            className="mr-1.5"
                        />
                        Reschedule
                    </Button>
                )}
                {isActive && onCancel && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error"
                        onClick={() => onCancel(id)}
                    >
                        Cancel
                    </Button>
                )}
                <Link
                    href={messageHref}
                    className="text-accent hover:text-accent-dark ease-smooth ml-auto inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                    <MessageSquare size={12} strokeWidth={1.5} />
                    Send message to agent
                </Link>
            </div>
        </article>
    );
}

ViewingRow.displayName = "ViewingRow";

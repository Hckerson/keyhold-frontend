import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type ViewingStatus = "confirmed" | "pending" | "cancelled";

export interface Viewing {
    id: string;
    address: string;
    date: string;
    time: string;
    agent: string;
    agentPhone: string;
    status: ViewingStatus;
}

export interface ViewingRowProps {
    viewing: Viewing;
    className?: string;
}

const statusTone = {
    confirmed: "success",
    pending: "warning",
    cancelled: "error",
} as const;

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

export function ViewingRow({ viewing, className }: ViewingRowProps) {
    const { address, date, time, agent, agentPhone, status } = viewing;
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-text min-w-0 flex-1 truncate text-sm font-medium">
                    {address}
                </h3>
                <StatusBadge tone={statusTone[status]}>
                    {statusLabel}
                </StatusBadge>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                        Date &amp; Time
                    </p>
                    <p className="text-text mt-0.5 text-sm font-medium tabular-nums">
                        {formatDate(date)} at {time}
                    </p>
                </div>
                <div>
                    <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                        Agent
                    </p>
                    <p className="text-text mt-0.5 text-sm font-medium">
                        {agent}
                    </p>
                    <p className="text-text-muted text-xs tabular-nums">
                        {agentPhone}
                    </p>
                </div>
            </div>

            <div className="border-border-light mt-4 flex gap-2 border-t pt-4">
                <a href={`tel:${agentPhone}`}>
                    <Button variant="secondary" size="sm">
                        <Phone size={14} strokeWidth={1.5} className="mr-1.5" />
                        Call Agent
                    </Button>
                </a>
                {status === "confirmed" && (
                    <Button variant="ghost" size="sm">
                        Cancel
                    </Button>
                )}
            </div>
        </article>
    );
}

ViewingRow.displayName = "ViewingRow";

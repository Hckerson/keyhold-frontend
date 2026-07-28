import Link from "next/link";
import {
    TrendingDown,
    Sparkles,
    Home,
    BarChart3,
    FileText,
    CalendarCheck,
    Bell,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatMillions } from "@/lib/utils";
import type { Alert, AlertType } from "@/lib/types";

export interface AlertRowProps {
    alert: Alert;
    onMarkRead?: (id: string) => void;
    className?: string;
}

const typeConfig: Record<AlertType, { icon: LucideIcon; tint: string }> = {
    "price-drop": { icon: TrendingDown, tint: "bg-success/10 text-success" },
    "new-listing": { icon: Sparkles, tint: "bg-accent-light text-accent" },
    "under-offer": { icon: Home, tint: "bg-warning/10 text-warning" },
    "status-change": { icon: BarChart3, tint: "bg-info/10 text-info" },
    "offer-response": { icon: FileText, tint: "bg-info/10 text-info" },
    "viewing-confirmation": {
        icon: CalendarCheck,
        tint: "bg-success/10 text-success",
    },
};

export function AlertRow({ alert, onMarkRead, className }: AlertRowProps) {
    const {
        id,
        listingId,
        type,
        title,
        description,
        address,
        price,
        previousPrice,
        timestamp,
        read,
    } = alert;
    const { icon: Icon, tint } = typeConfig[type] ?? {
        icon: Bell,
        tint: "bg-background-muted text-text-muted",
    };

    return (
        <article
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md",
                !read && "border-l-accent border-l-2",
                className,
            )}
        >
            <div className="flex gap-3">
                <span
                    className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg",
                        tint,
                    )}
                >
                    <Icon size={16} strokeWidth={1.5} />
                </span>

                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                    <div className="min-w-0">
                        <Link
                            href={`/listing/${listingId}`}
                            className="text-text hover:text-accent ease-smooth text-xs font-medium transition-colors"
                        >
                            {title}
                        </Link>
                        <p className="text-text-secondary mt-0.5 text-xs">
                            {description}
                        </p>
                        <p className="text-text-muted mt-1 truncate text-xs">
                            {address}
                        </p>
                        {price !== undefined && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="font-display text-accent text-lg font-light tabular-nums">
                                    {formatMillions(price, 2)}
                                </span>
                                {previousPrice !== undefined && (
                                    <span className="text-text-muted text-xs tabular-nums line-through">
                                        {formatMillions(previousPrice, 2)}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-text-muted text-xs">
                            {timestamp}
                        </span>
                        {!read && onMarkRead && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onMarkRead(id)}
                            >
                                Mark read
                            </Button>
                        )}
                        {!read && !onMarkRead && (
                            <span className="bg-accent size-2 rounded-full" />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

AlertRow.displayName = "AlertRow";

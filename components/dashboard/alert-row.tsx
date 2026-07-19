import Link from "next/link";
import {
    TrendingDown,
    Sparkles,
    Home,
    BarChart3,
    Bell,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertType =
    | "price-drop"
    | "new-listing"
    | "under-offer"
    | "status-change";

export interface Alert {
    id: string;
    type: AlertType;
    title: string;
    description: string;
    address: string;
    price?: number;
    previousPrice?: number;
    timestamp: string;
    read: boolean;
}

export interface AlertRowProps {
    alert: Alert;
    className?: string;
}

const typeConfig: Record<AlertType, { icon: LucideIcon; tint: string }> = {
    "price-drop": { icon: TrendingDown, tint: "bg-success/10 text-success" },
    "new-listing": { icon: Sparkles, tint: "bg-accent-light text-accent" },
    "under-offer": { icon: Home, tint: "bg-warning/10 text-warning" },
    "status-change": { icon: BarChart3, tint: "bg-info/10 text-info" },
};

const toMillions = (value: number) => `$${(value / 1_000_000).toFixed(2)}M`;

export function AlertRow({ alert, className }: AlertRowProps) {
    const {
        id,
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
        <Link
            href={`/listing/${id}`}
            className={cn(
                "group bg-background-muted border-border-light hover:border-border ease-smooth block rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md",
                !read && "border-l-accent border-l-2",
                className,
            )}
        >
            <div className="flex gap-4">
                <span
                    className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        tint,
                    )}
                >
                    <Icon size={16} strokeWidth={1.5} />
                </span>

                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-text group-hover:text-accent ease-smooth text-sm font-medium transition-colors">
                            {title}
                        </h3>
                        <p className="text-text-secondary mt-0.5 text-sm">
                            {description}
                        </p>
                        <p className="text-text mt-1 truncate text-sm font-medium">
                            {address}
                        </p>
                        {price !== undefined && (
                            <div className="mt-2 flex items-center gap-3">
                                <span className="text-text text-sm font-medium tabular-nums">
                                    {toMillions(price)}
                                </span>
                                {previousPrice !== undefined && (
                                    <span className="text-text-muted text-xs tabular-nums line-through">
                                        {toMillions(previousPrice)}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-text-muted text-xs">
                            {timestamp}
                        </span>
                        {!read && (
                            <span className="bg-accent size-2 rounded-full" />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

AlertRow.displayName = "AlertRow";

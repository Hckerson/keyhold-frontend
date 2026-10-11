import type { ReactNode } from "react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

export interface StatBodyProps extends StatItem {
    badge?: ReactNode;
}

export function StatBody({
    label,
    value,
    icon: Icon,
    change,
    trend,
    caption,
    badge,
    featured,
}: StatBodyProps) {
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <p className="micro-label truncate">{label}</p>
                {Icon && (
                    <span
                        className={cn(
                            "ease-smooth grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                            featured
                                ? "border-accent/40 text-accent"
                                : "border-border-light text-text-muted group-hover:border-accent/40 group-hover:text-accent",
                        )}
                    >
                        <Icon className="size-3" strokeWidth={1.5} />
                    </span>
                )}
            </div>

            <div className="flex items-end justify-between gap-3">
                <p
                    className={cn(
                        "font-display text-text leading-none font-light tabular-nums",
                        featured ? "text-h4" : "text-h5",
                    )}
                >
                    {value}
                </p>
                {change && (
                    <DeltaChip value={change} direction={trend} size="sm" />
                )}
            </div>

            {badge}

            {caption && (
                <p className="text-text-muted truncate text-xs">{caption}</p>
            )}
        </>
    );
}

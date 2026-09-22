import Link from "next/link";
import type { ReactNode } from "react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

export interface StatCardProps extends StatItem {
    badge?: ReactNode;
    className?: string;
}

function StatBody({
    label,
    value,
    icon: Icon,
    change,
    trend,
    caption,
    badge,
    featured,
}: StatCardProps) {
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <p className="micro-label truncate">{label}</p>
                {Icon && (
                    <span
                        className={cn(
                            "ease-smooth grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                            featured
                                ? "border-highlight/40 text-highlight"
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

export function StatCard(props: StatCardProps) {
    const { href, featured, className } = props;
    const shell = cn(
        "group ease-smooth flex flex-col gap-2 rounded-xl border transition-colors duration-200",
        featured
            ? "bg-background border-highlight/30 p-4 shadow-md"
            : "bg-background-muted border-border-light p-3 shadow-sm",
        href &&
            "focus-visible:ring-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none",
        href && !featured && "hover:border-border",
        className,
    );

    return href ? (
        <Link href={href} className={shell}>
            <StatBody {...props} />
        </Link>
    ) : (
        <div className={shell}>
            <StatBody {...props} />
        </div>
    );
}

StatCard.displayName = "StatCard";

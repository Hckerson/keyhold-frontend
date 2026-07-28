import Link from "next/link";
import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Sparkline } from "@/components/ui/charts/sparkline";
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
    series,
    featured,
}: StatCardProps) {
    return (
        <div className="relative z-10">
            <div className="flex items-center justify-between gap-2">
                <p className="text-text-muted text-caption font-mono tracking-wide uppercase">
                    {label}
                </p>
                {Icon && (
                    <span
                        className={cn(
                            "ease-smooth grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
                            featured
                                ? "border-highlight/40 text-highlight"
                                : "border-border-light text-text-muted group-hover:border-accent/40 group-hover:text-accent",
                        )}
                    >
                        <Icon size={14} strokeWidth={1.5} />
                    </span>
                )}
            </div>

            <div className="mt-3 flex items-end justify-between gap-3">
                <p
                    className={cn(
                        "font-display text-text font-light tabular-nums",
                        featured ? "text-h4" : "text-h5",
                    )}
                >
                    {value}
                </p>
                {change && (
                    <span
                        className={cn(
                            "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                            trend === "down"
                                ? "bg-error/10 text-error"
                                : "bg-success/10 text-success",
                        )}
                    >
                        {trend === "down" ? (
                            <TrendingDown size={12} strokeWidth={1.5} />
                        ) : (
                            <TrendingUp size={12} strokeWidth={1.5} />
                        )}
                        {change}
                    </span>
                )}
            </div>

            {badge && <div className="mt-2">{badge}</div>}

            {caption && (
                <p className="text-text-muted mt-1 text-xs">{caption}</p>
            )}

            {series && series.length > 1 && (
                <Sparkline data={series} className="mt-3" />
            )}
        </div>
    );
}

export function StatCard(props: StatCardProps) {
    const { href, featured, className } = props;
    const shell = cn(
        "group ease-smooth relative flex flex-col overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5",
        featured
            ? "bg-background border-highlight/30 ring-highlight/15 shadow-md ring-1"
            : "bg-background-muted border-border-light hover:border-border shadow-sm hover:shadow-md",
        className,
    );

    const content = (
        <>
            {featured && (
                <div
                    aria-hidden="true"
                    className="from-highlight/[0.07] pointer-events-none absolute inset-0 bg-linear-to-b to-transparent"
                />
            )}
            <StatBody {...props} />
        </>
    );

    return href ? (
        <Link href={href} className={shell}>
            {content}
        </Link>
    ) : (
        <div className={shell}>{content}</div>
    );
}

StatCard.displayName = "StatCard";

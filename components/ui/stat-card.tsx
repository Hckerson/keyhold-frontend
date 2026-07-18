import Link from "next/link";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { Sparkline } from "@/components/ui/sparkline";
import { cn } from "@/lib/utils";

export interface StatCardProps {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    change?: string;
    trend?: "up" | "down";
    caption?: string;
    series?: number[];
    href?: string;
    className?: string;
}

function StatBody({
    label,
    value,
    icon: Icon,
    change,
    trend,
    caption,
    series,
}: StatCardProps) {
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                    {label}
                </p>
                {Icon && (
                    <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted group-hover:text-accent ease-smooth shrink-0 transition-colors"
                    />
                )}
            </div>

            <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-h5 font-display text-text font-light tabular-nums">
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

            {caption && (
                <p className="text-text-muted mt-1 text-xs">{caption}</p>
            )}

            {series && series.length > 1 && (
                <Sparkline data={series} className="mt-3" />
            )}
        </>
    );
}

export function StatCard(props: StatCardProps) {
    const { href, className } = props;
    const shell = cn(
        "group bg-background-muted border-border-light hover:border-border ease-smooth flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
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

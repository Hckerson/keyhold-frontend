import Link from "next/link";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    change?: string;
    trend?: "up" | "down";
    href?: string;
    className?: string;
}

function StatBody({ label, value, icon: Icon, change, trend }: StatCardProps) {
    return (
        <>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-text-secondary truncate text-sm">
                        {label}
                    </p>
                    <p className="text-h5 font-display text-text mt-2 font-light">
                        {value}
                    </p>
                </div>
                {Icon && (
                    <span className="bg-accent-light text-accent group-hover:bg-accent group-hover:text-text-inverse ease-smooth grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-200">
                        <Icon size={16} strokeWidth={1.5} />
                    </span>
                )}
            </div>
            {change && (
                <p
                    className={cn(
                        "mt-3 flex items-center gap-1 text-xs",
                        trend === "down" ? "text-error" : "text-success",
                    )}
                >
                    {trend === "down" ? (
                        <TrendingDown size={12} strokeWidth={1.5} />
                    ) : (
                        <TrendingUp size={12} strokeWidth={1.5} />
                    )}
                    {change}
                </p>
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

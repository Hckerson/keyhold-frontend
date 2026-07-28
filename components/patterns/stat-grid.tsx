import { StatCard } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

export interface StatGridProps {
    stats: readonly StatItem[];
    columns?: 2 | 3 | 4 | 5;
    gap?: "sm" | "md";
    className?: string;
}

const columnClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
} as const;

const gapClass = {
    sm: "gap-3",
    md: "gap-4",
} as const;

export function StatGrid({
    stats,
    columns = 4,
    gap = "sm",
    className,
}: StatGridProps) {
    return (
        <div
            className={cn(
                "grid",
                gapClass[gap],
                columnClass[columns],
                className,
            )}
        >
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
}

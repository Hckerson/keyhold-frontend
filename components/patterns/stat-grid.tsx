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
    2: "stat-grid--2",
    3: "stat-grid--3",
    4: "stat-grid--4",
    5: "stat-grid--5",
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
                "stat-grid",
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

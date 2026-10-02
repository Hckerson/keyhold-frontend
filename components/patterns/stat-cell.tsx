import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface StatDatum {
    id: string;
    icon: LucideIcon;
    label: string;
    value: string;
    tone: ChartTone;
    href?: string;
}

export interface StatCellProps {
    stat: StatDatum;
}

export const STAT_CELL = "flex h-14 items-center gap-2 px-3";

export function StatCell({ stat }: StatCellProps) {
    const Icon = stat.icon;

    const body = (
        <>
            <Icon
                className={cn("size-3 shrink-0", chartToneText[stat.tone])}
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <span className="micro-label min-w-0 truncate">{stat.label}</span>
            <span className="font-display text-text text-h6 ml-auto shrink-0 leading-none font-light tabular-nums">
                {stat.value}
            </span>
        </>
    );

    if (!stat.href) return <div className={STAT_CELL}>{body}</div>;

    return (
        <Link
            href={stat.href}
            className={cn(
                STAT_CELL,
                "hover:bg-background-alt focus-visible:ring-accent ease-smooth transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
            )}
        >
            {body}
        </Link>
    );
}

StatCell.displayName = "StatCell";

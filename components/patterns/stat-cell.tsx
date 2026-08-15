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

const CELL = "flex h-14 min-w-0 flex-1 items-center gap-2 px-3";

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
            <span
                className={cn(
                    "bg-background ml-auto shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                    chartToneText[stat.tone],
                )}
            >
                {stat.value}
            </span>
        </>
    );

    if (!stat.href) return <div className={CELL}>{body}</div>;

    return (
        <Link
            href={stat.href}
            className={cn(
                CELL,
                "hover:bg-background-alt ease-smooth transition-colors",
            )}
        >
            {body}
        </Link>
    );
}

StatCell.displayName = "StatCell";

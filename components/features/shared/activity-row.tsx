import {
    CalendarDays,
    FileText,
    MessageSquare,
    Eye,
    Home,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";
import type { ActivityEntry, ActivityType } from "@/lib/types";

const typeIcon: Record<ActivityType, LucideIcon> = {
    viewing: CalendarDays,
    offer: FileText,
    message: MessageSquare,
    showing: Eye,
    listing: Home,
};

const typeTone: Record<ActivityType, ChartTone> = {
    viewing: "info",
    offer: "highlight",
    message: "neutral",
    showing: "info",
    listing: "accent",
};

export interface ActivityRowProps {
    entry: ActivityEntry;
}

export function ActivityRow({ entry }: ActivityRowProps) {
    const Icon = typeIcon[entry.type];

    return (
        <li className="flex h-9 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full",
                    chartToneSoft[typeTone[entry.type]],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text shrink-0 text-xs font-medium">
                {entry.title}
            </span>
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {entry.description}
            </span>
            <span className="micro-label shrink-0">{entry.time}</span>
        </li>
    );
}

ActivityRow.displayName = "ActivityRow";

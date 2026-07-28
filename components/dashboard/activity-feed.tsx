import {
    CalendarDays,
    FileText,
    MessageSquare,
    Eye,
    Home,
    Bell,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ActivityType =
    | "viewing"
    | "offer"
    | "message"
    | "showing"
    | "listing";

export interface ActivityEntry {
    id: string | number;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
}

const typeIcon: Record<ActivityType, LucideIcon> = {
    viewing: CalendarDays,
    offer: FileText,
    message: MessageSquare,
    showing: Eye,
    listing: Home,
};

function ActivityItem({ entry }: { entry: ActivityEntry }) {
    const Icon = typeIcon[entry.type] ?? Bell;
    return (
        <li className="border-border-light flex gap-3 border-b pb-3 last:border-b-0 last:pb-0">
            <span className="bg-accent-light text-accent grid size-7 shrink-0 place-items-center rounded-full">
                <Icon size={14} strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
                <h4 className="text-text text-xs font-medium">{entry.title}</h4>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {entry.description}
                </p>
                <p className="text-text-muted mt-1 text-xs">{entry.time}</p>
            </div>
        </li>
    );
}

export function ActivityFeed({
    entries,
    className,
}: {
    entries: ActivityEntry[];
    className?: string;
}) {
    return (
        <ul className={cn("space-y-3", className)}>
            {entries.map((entry) => (
                <ActivityItem key={entry.id} entry={entry} />
            ))}
        </ul>
    );
}

ActivityFeed.displayName = "ActivityFeed";

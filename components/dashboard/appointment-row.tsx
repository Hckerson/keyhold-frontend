import {
    Eye,
    Briefcase,
    Search,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type AppointmentType = "showing" | "meeting" | "inspection" | "closing";

type Tone = "info" | "neutral" | "warning" | "success";

export interface AppointmentRowProps {
    type: AppointmentType;
    title: string;
    property: string;
    client: string;
    time: string;
    duration: string;
    notes: string;
    className?: string;
}

const typeConfig: Record<
    AppointmentType,
    { icon: LucideIcon; tint: string; tone: Tone; label: string }
> = {
    showing: {
        icon: Eye,
        tint: "bg-info/10 text-info",
        tone: "info",
        label: "Showing",
    },
    meeting: {
        icon: Briefcase,
        tint: "bg-background-alt text-text-secondary",
        tone: "neutral",
        label: "Meeting",
    },
    inspection: {
        icon: Search,
        tint: "bg-warning/10 text-warning",
        tone: "warning",
        label: "Inspection",
    },
    closing: {
        icon: CheckCircle2,
        tint: "bg-success/10 text-success",
        tone: "success",
        label: "Closing",
    },
};

export function AppointmentRow({
    type,
    title,
    property,
    client,
    time,
    duration,
    notes,
    className,
}: AppointmentRowProps) {
    const { icon: Icon, tint, tone, label } = typeConfig[type];
    return (
        <div
            className={cn(
                "border-border-light flex gap-4 border-b pb-4 last:border-b-0 last:pb-0",
                className,
            )}
        >
            <span
                className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg",
                    tint,
                )}
            >
                <Icon size={16} strokeWidth={1.5} />
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h4 className="text-text text-sm font-medium">
                            {title}
                        </h4>
                        <p className="text-text-secondary mt-0.5 text-xs">
                            {property}
                        </p>
                    </div>
                    <StatusBadge tone={tone} dot>
                        {label}
                    </StatusBadge>
                </div>

                <div className="text-text-secondary mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span className="text-text font-medium tabular-nums">
                        {time}
                    </span>
                    <span>{client}</span>
                    <span className="tabular-nums">{duration}</span>
                </div>

                <p className="text-text-muted mt-1 text-xs">{notes}</p>
            </div>

            <Button variant="ghost" size="sm" className="shrink-0">
                Edit
            </Button>
        </div>
    );
}

AppointmentRow.displayName = "AppointmentRow";

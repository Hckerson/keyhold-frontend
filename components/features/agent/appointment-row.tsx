import {
    Eye,
    Briefcase,
    Search,
    CheckCircle2,
    PhoneCall,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export type AppointmentType =
    | "showing"
    | "meeting"
    | "inspection"
    | "closing"
    | "follow-up";

type Tone = "info" | "neutral" | "warning" | "success";

export interface Appointment {
    id: string;
    type: AppointmentType;
    title: string;
    property: string;
    client: string;
    date: string;
    time: string;
    duration: string;
    notes: string;
}

export interface AppointmentRowProps {
    appointment: Appointment;
    className?: string;
}

export const APPOINTMENT_TYPES: Record<
    AppointmentType,
    {
        icon: LucideIcon;
        tint: string;
        accent: string;
        tone: Tone;
        label: string;
    }
> = {
    showing: {
        icon: Eye,
        tint: "bg-info/10 text-info",
        accent: "text-info",
        tone: "info",
        label: "Showing",
    },
    meeting: {
        icon: Briefcase,
        tint: "bg-background-alt text-text-secondary",
        accent: "text-text-secondary",
        tone: "neutral",
        label: "Meeting",
    },
    inspection: {
        icon: Search,
        tint: "bg-warning/10 text-warning",
        accent: "text-warning",
        tone: "warning",
        label: "Inspection",
    },
    closing: {
        icon: CheckCircle2,
        tint: "bg-success/10 text-success",
        accent: "text-success",
        tone: "success",
        label: "Closing",
    },
    "follow-up": {
        icon: PhoneCall,
        tint: "bg-accent-light text-accent",
        accent: "text-accent",
        tone: "neutral",
        label: "Follow-up",
    },
};

export function AppointmentRow({
    appointment,
    className,
}: AppointmentRowProps) {
    const { type, title, property, client, time, duration, notes } =
        appointment;
    const { icon: Icon, tint, tone, label } = APPOINTMENT_TYPES[type];

    return (
        <div
            className={cn(
                "border-border flex gap-3 border-b pb-3 last:border-b-0 last:pb-0",
                className,
            )}
        >
            <span
                className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg",
                    tint,
                )}
            >
                <Icon size={16} strokeWidth={1.5} />
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h4 className="text-text truncate text-xs font-medium">
                            {title}
                        </h4>
                        <p className="text-text-secondary mt-0.5 truncate text-xs">
                            {property}
                        </p>
                    </div>
                    <StatusBadge tone={tone}>{label}</StatusBadge>
                </div>

                <div className="text-text-secondary mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
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

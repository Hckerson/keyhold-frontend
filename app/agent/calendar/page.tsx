"use client";

import { useState } from "react";
import { Eye, Briefcase, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import {
    AppointmentRow,
    type Appointment,
} from "@/components/dashboard/appointment-row";
import { cn } from "@/lib/utils";

const appointments: Appointment[] = [
    {
        id: "1",
        type: "showing",
        title: "Property Showing",
        property: "456 Oak Avenue",
        client: "John Doe",
        time: "2:00 PM",
        duration: "1 hour",
        notes: "Client interested in modern updates",
    },
    {
        id: "2",
        type: "meeting",
        title: "Client Meeting",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        time: "3:30 PM",
        duration: "30 mins",
        notes: "Discuss counter-offer strategy",
    },
    {
        id: "3",
        type: "inspection",
        title: "Home Inspection",
        property: "234 Oak Street",
        client: "Michael Chen",
        time: "10:00 AM",
        duration: "2 hours",
        notes: "Professional inspector scheduled",
    },
];

const legend = [
    { icon: Eye, label: "Showing", tint: "text-info" },
    { icon: Briefcase, label: "Meeting", tint: "text-text-secondary" },
    { icon: Search, label: "Inspection", tint: "text-warning" },
    { icon: CheckCircle2, label: "Closing", tint: "text-success" },
];

const weekSummary = [
    { label: "Showings", value: "3" },
    { label: "Meetings", value: "2" },
    { label: "Inspections", value: "1" },
    { label: "Closings", value: "1", accent: true },
];

export default function AgentCalendarPage() {
    const [selected, setSelected] = useState(13);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Calendar"
                description={`${appointments.length} appointments today`}
                action={
                    <Button variant="primary" size="sm">
                        Schedule Appointment
                    </Button>
                }
            />

            <div className="grid gap-4 lg:grid-cols-4">
                <div className="space-y-4 lg:col-span-1">
                    <Panel title="July 2024">
                        <MiniCalendar
                            days={31}
                            selected={selected}
                            onSelect={setSelected}
                            marked={[13, 15, 20]}
                        />
                    </Panel>

                    <Panel title="Legend">
                        <div className="space-y-2">
                            {legend.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2 text-xs"
                                >
                                    <item.icon
                                        size={14}
                                        strokeWidth={1.5}
                                        className={item.tint}
                                    />
                                    <span className="text-text-secondary">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>

                <div className="space-y-4 lg:col-span-3">
                    <Panel
                        title="Today's Schedule"
                        description="Saturday, July 13, 2024"
                    >
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <AppointmentRow
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            ))}
                        </div>
                    </Panel>

                    <Panel title="This Week's Summary">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {weekSummary.map((metric) => (
                                <div key={metric.label}>
                                    <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                                        {metric.label}
                                    </p>
                                    <p
                                        className={cn(
                                            "font-display text-h5 mt-1 font-light tabular-nums",
                                            metric.accent
                                                ? "text-accent"
                                                : "text-text",
                                        )}
                                    >
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}

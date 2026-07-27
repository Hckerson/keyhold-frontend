"use client";

import { useMemo, useState } from "react";
import { CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MiniCalendar, monthLabel } from "@/components/dashboard/mini-calendar";
import {
    AppointmentRow,
    APPOINTMENT_TYPES,
    type Appointment,
    type AppointmentType,
} from "@/components/dashboard/appointment-row";
import { cn } from "@/lib/utils";

const ANCHOR = { year: 2024, month: 6, day: 13 };

const WEEKDAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

type ViewMode = "month" | "week";

const VIEW_MODES: { id: ViewMode; label: string }[] = [
    { id: "month", label: "Month" },
    { id: "week", label: "Week" },
];

const appointments: Appointment[] = [
    {
        id: "1",
        type: "showing",
        title: "Property Showing",
        property: "456 Oak Avenue",
        client: "John Doe",
        date: "2024-07-13",
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
        date: "2024-07-13",
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
        date: "2024-07-13",
        time: "10:00 AM",
        duration: "2 hours",
        notes: "Professional inspector scheduled",
    },
    {
        id: "4",
        type: "follow-up",
        title: "Follow-up Call",
        property: "567 Palm Drive",
        client: "Elizabeth Brown",
        date: "2024-07-11",
        time: "9:00 AM",
        duration: "15 mins",
        notes: "Check in after second viewing",
    },
    {
        id: "5",
        type: "showing",
        title: "Private Showing",
        property: "12 Canyon Ridge",
        client: "Priya Raman",
        date: "2024-07-12",
        time: "11:00 AM",
        duration: "45 mins",
        notes: "Buyer flying in from New York",
    },
    {
        id: "6",
        type: "closing",
        title: "Closing Appointment",
        property: "890 Beverly Grove",
        client: "Daniel Ortiz",
        date: "2024-07-15",
        time: "1:00 PM",
        duration: "1 hour",
        notes: "Final walkthrough before signing",
    },
    {
        id: "7",
        type: "follow-up",
        title: "Nurture Call",
        property: "234 Oak Street",
        client: "Jennifer Davis",
        date: "2024-07-16",
        time: "4:00 PM",
        duration: "20 mins",
        notes: "Send comparable sales summary",
    },
    {
        id: "8",
        type: "meeting",
        title: "Listing Presentation",
        property: "77 Hillcrest Terrace",
        client: "Robert Lang",
        date: "2024-07-20",
        time: "10:30 AM",
        duration: "1 hour",
        notes: "Bring updated pricing analysis",
    },
    {
        id: "9",
        type: "showing",
        title: "Open House",
        property: "456 Oak Avenue",
        client: "Public",
        date: "2024-07-20",
        time: "1:00 PM",
        duration: "3 hours",
        notes: "Catering and signage confirmed",
    },
    {
        id: "10",
        type: "inspection",
        title: "Appraisal Visit",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        date: "2024-07-26",
        time: "9:30 AM",
        duration: "90 mins",
        notes: "Lender-ordered appraisal",
    },
];

const isoOf = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const toDate = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const formatDay = (iso: string) => {
    const date = toDate(iso);
    const [month, year] = monthLabel(date.getFullYear(), date.getMonth()).split(
        " ",
    );
    return `${WEEKDAY_NAMES[date.getDay()]}, ${month} ${date.getDate()}, ${year}`;
};

const weekBounds = (iso: string) => {
    const date = toDate(iso);
    const start = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay(),
    );
    const end = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 6,
    );
    return { start, end };
};

const shortDate = (date: Date) => {
    const [month] = monthLabel(date.getFullYear(), date.getMonth()).split(" ");
    return `${month.slice(0, 3)} ${date.getDate()}`;
};

export default function AgentCalendarPage() {
    const [year, setYear] = useState(ANCHOR.year);
    const [month, setMonth] = useState(ANCHOR.month);
    const [selected, setSelected] = useState(ANCHOR.day);
    const [view, setView] = useState<ViewMode>("month");

    const selectedIso = isoOf(year, month, selected);

    const marked = useMemo(() => {
        const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
        return appointments
            .filter((item) => item.date.startsWith(prefix))
            .map((item) => Number(item.date.slice(8, 10)));
    }, [year, month]);

    const { start, end } = useMemo(
        () => weekBounds(selectedIso),
        [selectedIso],
    );

    const visible = useMemo(() => {
        const inRange = (iso: string) => {
            const date = toDate(iso);
            return date >= start && date <= end;
        };
        return appointments
            .filter((item) =>
                view === "month"
                    ? item.date === selectedIso
                    : inRange(item.date),
            )
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [view, selectedIso, start, end]);

    const grouped = useMemo(() => {
        const days = Array.from(new Set(visible.map((item) => item.date)));
        return days.map((date) => ({
            date,
            items: visible.filter((item) => item.date === date),
        }));
    }, [visible]);

    const weekCounts = useMemo(() => {
        const inWeek = appointments.filter((item) => {
            const date = toDate(item.date);
            return date >= start && date <= end;
        });
        return (Object.keys(APPOINTMENT_TYPES) as AppointmentType[]).map(
            (type) => ({
                type,
                label: APPOINTMENT_TYPES[type].label,
                count: inWeek.filter((item) => item.type === type).length,
            }),
        );
    }, [start, end]);

    const handleMonthChange = (nextYear: number, nextMonth: number) => {
        setYear(nextYear);
        setMonth(nextMonth);
        setSelected(1);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Calendar"
                description={`${visible.length} appointment${
                    visible.length === 1 ? "" : "s"
                } in view`}
                action={
                    <Button variant="primary" size="sm">
                        Schedule Appointment
                    </Button>
                }
            />

            <div className="grid gap-4 lg:grid-cols-4">
                <div className="space-y-4 lg:col-span-1">
                    <Panel title={monthLabel(year, month)}>
                        <MiniCalendar
                            year={year}
                            month={month}
                            selected={selected}
                            onSelect={setSelected}
                            onMonthChange={handleMonthChange}
                            marked={marked}
                            today={
                                year === ANCHOR.year && month === ANCHOR.month
                                    ? ANCHOR.day
                                    : undefined
                            }
                        />
                    </Panel>

                    <Panel title="Legend">
                        <div className="space-y-2">
                            {(
                                Object.keys(
                                    APPOINTMENT_TYPES,
                                ) as AppointmentType[]
                            ).map((type) => {
                                const {
                                    icon: Icon,
                                    accent,
                                    label,
                                } = APPOINTMENT_TYPES[type];
                                return (
                                    <div
                                        key={type}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <Icon
                                            size={12}
                                            strokeWidth={1.5}
                                            className={accent}
                                        />
                                        <span className="text-text-secondary">
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Panel>
                </div>

                <div className="space-y-4 lg:col-span-3">
                    <Panel
                        title={
                            view === "month"
                                ? "Schedule"
                                : "Week of " + shortDate(start)
                        }
                        description={
                            view === "month"
                                ? formatDay(selectedIso)
                                : `${shortDate(start)} – ${shortDate(end)}`
                        }
                        count={visible.length}
                        action={
                            <div
                                role="group"
                                aria-label="Calendar view"
                                className="border-border bg-background-alt inline-flex rounded-lg border p-0.5"
                            >
                                {VIEW_MODES.map((mode) => (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        aria-pressed={view === mode.id}
                                        onClick={() => setView(mode.id)}
                                        className={cn(
                                            "ease-smooth focus-visible:ring-accent rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                            view === mode.id
                                                ? "bg-background text-text shadow-sm"
                                                : "text-text-secondary hover:text-text",
                                        )}
                                    >
                                        {mode.label}
                                    </button>
                                ))}
                            </div>
                        }
                    >
                        {visible.length > 0 ? (
                            <div className="space-y-4">
                                {grouped.map((group) => (
                                    <div key={group.date} className="space-y-3">
                                        {view === "week" && (
                                            <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                                {formatDay(group.date)}
                                            </p>
                                        )}
                                        {group.items.map((appointment) => (
                                            <AppointmentRow
                                                key={appointment.id}
                                                appointment={appointment}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={CalendarX2}
                                title="Nothing scheduled"
                                description={
                                    view === "month"
                                        ? `No appointments on ${formatDay(selectedIso)}.`
                                        : "No appointments this week."
                                }
                                action={
                                    <Button variant="secondary" size="sm">
                                        Schedule Appointment
                                    </Button>
                                }
                            />
                        )}
                    </Panel>

                    <Panel
                        title="This Week"
                        description={`${shortDate(start)} – ${shortDate(end)}`}
                    >
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                            {weekCounts.map((metric) => (
                                <div key={metric.type}>
                                    <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                        {metric.label}
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-1 text-xs font-medium tabular-nums",
                                            metric.type === "closing"
                                                ? "text-accent"
                                                : "text-text",
                                        )}
                                    >
                                        {metric.count}
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

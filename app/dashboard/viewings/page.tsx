"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronDown, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { SummaryRow } from "@/components/ui/summary-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { StepList, type Step } from "@/components/ui/step-list";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MiniCalendar, monthLabel } from "@/components/dashboard/mini-calendar";
import {
    ViewingRow,
    formatViewingDate,
    type Viewing,
    type ViewingStatus,
} from "@/components/dashboard/viewing-row";
import { cn } from "@/lib/utils";

const TODAY = { year: 2026, month: 6, day: 26 };

const microLabel =
    "text-text-muted font-mono text-[10px] font-medium tracking-wide uppercase";

const statusTone: Record<ViewingStatus, "success" | "warning" | "error"> = {
    confirmed: "success",
    pending: "warning",
    cancelled: "error",
};

interface ViewingSurvey {
    rating: number;
    interest: string;
    notes: string;
}

interface PastViewing {
    id: string;
    address: string;
    date: string;
    time: string;
    agent: string;
    survey?: ViewingSurvey;
}

const initialViewings: Viewing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        date: "2026-07-28",
        time: "3:00 PM",
        agent: "Sarah Chen",
        agentPhone: "(310) 555-0123",
        status: "confirmed",
    },
    {
        id: "2",
        address: "234 Oak Street, Bel Air, CA",
        date: "2026-07-30",
        time: "10:00 AM",
        agent: "Michael Rodriguez",
        agentPhone: "(310) 555-0456",
        status: "confirmed",
    },
    {
        id: "3",
        address: "567 Palm Drive, Malibu, CA",
        date: "2026-08-03",
        time: "2:00 PM",
        agent: "Jennifer Martinez",
        agentPhone: "(310) 555-0789",
        status: "pending",
    },
];

const pastViewings: PastViewing[] = [
    {
        id: "p1",
        address: "789 Sunset Blvd, West Hollywood, CA",
        date: "2026-07-18",
        time: "11:00 AM",
        agent: "Sarah Chen",
        survey: {
            rating: 5,
            interest: "Preparing an offer",
            notes: "Light in the main living space is exceptional and the kitchen was renovated last year.",
        },
    },
    {
        id: "p2",
        address: "1220 Canyon Road, Bel Air, CA",
        date: "2026-07-11",
        time: "4:30 PM",
        agent: "Michael Rodriguez",
        survey: {
            rating: 3,
            interest: "Still considering",
            notes: "Great lot, but the primary suite is smaller than the listing photos suggest.",
        },
    },
    {
        id: "p3",
        address: "88 Marine Terrace, Santa Monica, CA",
        date: "2026-07-02",
        time: "9:00 AM",
        agent: "Jennifer Martinez",
    },
];

const howItWorks: Step[] = [
    {
        title: "Browse Properties",
        description: "Find properties you want to see",
    },
    {
        title: "Request a Viewing",
        description: "Select a time that works for you",
    },
    {
        title: "Get Confirmation",
        description: "Your agent confirms the appointment",
    },
];

const parseDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return { year, month: month - 1, day };
};

function SurveyResult({ survey }: { survey: ViewingSurvey }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <p className={microLabel}>Your Rating</p>
                <span
                    className="flex items-center gap-0.5"
                    aria-label={`${survey.rating} out of 5`}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={12}
                            strokeWidth={1.5}
                            className={
                                index < survey.rating
                                    ? "fill-highlight text-highlight"
                                    : "text-border-dark"
                            }
                        />
                    ))}
                </span>
            </div>
            <SummaryRow label="Interest level" value={survey.interest} />
            <div>
                <p className={microLabel}>Notes</p>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {survey.notes}
                </p>
            </div>
        </div>
    );
}

export default function ViewingsPage() {
    const [viewings, setViewings] = useState<Viewing[]>(initialViewings);
    const [calendar, setCalendar] = useState({
        year: TODAY.year,
        month: TODAY.month,
    });
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [dayModalOpen, setDayModalOpen] = useState(false);
    const [rescheduleId, setRescheduleId] = useState<string | null>(null);
    const [draft, setDraft] = useState({ date: "", time: "" });
    const [openPastId, setOpenPastId] = useState<string | null>(null);

    const markedDays = useMemo(() => {
        const days: number[] = [];
        for (const viewing of viewings) {
            if (viewing.status === "cancelled") continue;
            const parsed = parseDate(viewing.date);
            if (
                parsed.year === calendar.year &&
                parsed.month === calendar.month
            ) {
                days.push(parsed.day);
            }
        }
        return days;
    }, [viewings, calendar]);

    const selectedDateViewings = useMemo(() => {
        if (selectedDay === null) return [];
        return viewings.filter((viewing) => {
            const parsed = parseDate(viewing.date);
            return (
                parsed.year === calendar.year &&
                parsed.month === calendar.month &&
                parsed.day === selectedDay
            );
        });
    }, [viewings, calendar, selectedDay]);

    const visibleViewings =
        selectedDay === null ? viewings : selectedDateViewings;
    const confirmed = viewings.filter((v) => v.status === "confirmed").length;
    const rescheduling = viewings.find((v) => v.id === rescheduleId);

    const handleSelectDay = (day: number) => {
        if (day === selectedDay) {
            setSelectedDay(null);
            return;
        }
        setSelectedDay(day);
        if (markedDays.includes(day)) setDayModalOpen(true);
    };

    const handleMonthChange = (year: number, month: number) => {
        setCalendar({ year, month });
        setSelectedDay(null);
    };

    const openReschedule = (id: string) => {
        const target = viewings.find((viewing) => viewing.id === id);
        if (!target) return;
        setDraft({ date: target.date, time: target.time });
        setRescheduleId(id);
    };

    const confirmReschedule = () => {
        if (!rescheduleId) return;
        setViewings((prev) =>
            prev.map((viewing) =>
                viewing.id === rescheduleId
                    ? {
                          ...viewing,
                          date: draft.date || viewing.date,
                          time: draft.time || viewing.time,
                          status: "pending",
                      }
                    : viewing,
            ),
        );
        setRescheduleId(null);
    };

    const cancelViewing = (id: string) => {
        setViewings((prev) =>
            prev.map((viewing) =>
                viewing.id === id
                    ? { ...viewing, status: "cancelled" }
                    : viewing,
            ),
        );
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Scheduled Viewings"
                description={`${confirmed} confirmed viewing${
                    confirmed !== 1 ? "s" : ""
                }`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Find Properties
                        </Button>
                    </Link>
                }
            />

            <div className="grid gap-3 lg:grid-cols-3">
                <Panel title="Calendar" className="lg:col-span-1">
                    <MiniCalendar
                        year={calendar.year}
                        month={calendar.month}
                        selected={selectedDay ?? 0}
                        onSelect={handleSelectDay}
                        onMonthChange={handleMonthChange}
                        marked={markedDays}
                        today={
                            calendar.year === TODAY.year &&
                            calendar.month === TODAY.month
                                ? TODAY.day
                                : undefined
                        }
                    />
                    <p className="border-border-light text-text-muted mt-3 flex items-center gap-2 border-t pt-3 text-xs">
                        <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                        Dates with a scheduled viewing
                    </p>
                </Panel>

                <div className="space-y-3 lg:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-text text-xs font-medium">
                            {selectedDay === null
                                ? "All upcoming viewings"
                                : `Viewings on ${monthLabel(
                                      calendar.year,
                                      calendar.month,
                                  )} ${selectedDay}`}
                        </h2>
                        {selectedDay !== null && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedDay(null)}
                            >
                                <X
                                    size={12}
                                    strokeWidth={1.5}
                                    className="mr-1.5"
                                />
                                Clear date filter
                            </Button>
                        )}
                    </div>

                    {visibleViewings.length > 0 ? (
                        <div className="space-y-3">
                            {visibleViewings.map((viewing) => (
                                <ViewingRow
                                    key={viewing.id}
                                    viewing={viewing}
                                    onReschedule={openReschedule}
                                    onCancel={cancelViewing}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={CalendarDays}
                            title={
                                selectedDay === null
                                    ? "No scheduled viewings yet"
                                    : "No viewings on this date"
                            }
                            description={
                                selectedDay === null
                                    ? "Viewings you book will appear here."
                                    : "Pick another date or clear the filter."
                            }
                            action={
                                <Link href="/search">
                                    <Button variant="primary" size="sm">
                                        Browse Properties
                                    </Button>
                                </Link>
                            }
                        />
                    )}
                </div>
            </div>

            <Panel title="Past Viewings" count={pastViewings.length}>
                <Accordion>
                    {pastViewings.map((past) => {
                        const isOpen = openPastId === past.id;
                        return (
                            <AccordionItem key={past.id} value={past.id}>
                                <AccordionTrigger
                                    aria-expanded={isOpen}
                                    className="px-3 py-2 text-xs"
                                    onClick={() =>
                                        setOpenPastId(isOpen ? null : past.id)
                                    }
                                >
                                    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                                        <span className="text-text truncate text-xs font-medium">
                                            {past.address}
                                        </span>
                                        <span className="text-text-muted text-xs tabular-nums">
                                            {formatViewingDate(past.date)} at{" "}
                                            {past.time}
                                        </span>
                                        <StatusBadge
                                            tone={
                                                past.survey
                                                    ? "success"
                                                    : "neutral"
                                            }
                                        >
                                            {past.survey
                                                ? "Survey submitted"
                                                : "No survey"}
                                        </StatusBadge>
                                    </span>
                                    <ChevronDown
                                        size={12}
                                        strokeWidth={1.5}
                                        className={cn(
                                            "text-text-muted ease-smooth ml-2 shrink-0 transition-transform duration-200",
                                            isOpen && "rotate-180",
                                        )}
                                    />
                                </AccordionTrigger>
                                {isOpen && (
                                    <AccordionContent className="px-3 py-2">
                                        <div className="space-y-2">
                                            <SummaryRow
                                                label="Agent"
                                                value={past.agent}
                                            />
                                            {past.survey ? (
                                                <SurveyResult
                                                    survey={past.survey}
                                                />
                                            ) : (
                                                <p className="text-text-secondary text-xs">
                                                    You have not submitted a
                                                    survey for this viewing yet.
                                                </p>
                                            )}
                                            <div className="flex gap-2 pt-1">
                                                <Link href="/dashboard/messages">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                    >
                                                        Message agent
                                                    </Button>
                                                </Link>
                                                <Link href="/search">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        Book again
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                )}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Panel>

            <Panel title="How It Works">
                <div className="space-y-3">
                    <p className="text-text-secondary text-xs">
                        Book a viewing in three simple steps.
                    </p>
                    <StepList steps={howItWorks} />
                </div>
            </Panel>

            <Modal
                open={dayModalOpen && selectedDateViewings.length > 0}
                onOpenChange={setDayModalOpen}
            >
                <ModalHeader>
                    <ModalTitle>
                        {selectedDay === null
                            ? ""
                            : `${monthLabel(
                                  calendar.year,
                                  calendar.month,
                              )} ${selectedDay}`}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    {selectedDateViewings.map((viewing) => (
                        <div
                            key={viewing.id}
                            className="border-border-light bg-background space-y-2 rounded-lg border p-3"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-text min-w-0 truncate text-xs font-medium">
                                    {viewing.address}
                                </p>
                                <StatusBadge tone={statusTone[viewing.status]}>
                                    {viewing.status}
                                </StatusBadge>
                            </div>
                            <SummaryRow label="Time" value={viewing.time} />
                            <SummaryRow label="Agent" value={viewing.agent} />
                            <SummaryRow
                                label="Phone"
                                value={viewing.agentPhone}
                            />
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setDayModalOpen(false)}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                open={rescheduling !== undefined}
                onOpenChange={(open) => {
                    if (!open) setRescheduleId(null);
                }}
            >
                <ModalHeader>
                    <ModalTitle>Reschedule Viewing</ModalTitle>
                </ModalHeader>
                <ModalBody className="space-y-3">
                    <p className="text-text-secondary text-xs">
                        {rescheduling?.address}
                    </p>
                    <Input
                        id="reschedule-date"
                        label="New date"
                        type="date"
                        value={draft.date}
                        onChange={(event) =>
                            setDraft((prev) => ({
                                ...prev,
                                date: event.target.value,
                            }))
                        }
                    />
                    <Input
                        id="reschedule-time"
                        label="New time"
                        value={draft.time}
                        placeholder="3:00 PM"
                        onChange={(event) =>
                            setDraft((prev) => ({
                                ...prev,
                                time: event.target.value,
                            }))
                        }
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setRescheduleId(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={confirmReschedule}
                    >
                        Confirm Change
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

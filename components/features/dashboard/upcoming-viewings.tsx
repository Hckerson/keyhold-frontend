"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms/input";
import { EmptyState } from "@/components/ui/empty-state";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { ViewingRow } from "@/components/features/dashboard/viewing-row";
import { cn } from "@/lib/utils";

import type { Viewing } from "@/lib/types";
export interface UpcomingViewingsProps {
    initialViewings: Viewing[];
    limit?: number;
    className?: string;
}

export function UpcomingViewings({
    initialViewings,
    limit = 3,
    className,
}: UpcomingViewingsProps) {
    const [viewings, setViewings] = useState<Viewing[]>(initialViewings);
    const [rescheduleId, setRescheduleId] = useState<string | null>(null);
    const [draft, setDraft] = useState({ date: "", time: "" });

    const visible = viewings
        .filter((viewing) => viewing.status !== "cancelled")
        .slice(0, limit);
    const rescheduling = viewings.find(
        (viewing) => viewing.id === rescheduleId,
    );

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
        <div className={cn("space-y-3", className)}>
            {visible.length > 0 ? (
                visible.map((viewing) => (
                    <ViewingRow
                        key={viewing.id}
                        viewing={viewing}
                        onReschedule={openReschedule}
                        onCancel={cancelViewing}
                    />
                ))
            ) : (
                <EmptyState
                    icon={CalendarDays}
                    title="No upcoming viewings"
                    description="Book a tour and it will show up here."
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Browse Properties
                            </Button>
                        </Link>
                    }
                />
            )}

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
                        id="overview-reschedule-date"
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
                        id="overview-reschedule-time"
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

UpcomingViewings.displayName = "UpcomingViewings";

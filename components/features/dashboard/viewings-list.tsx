"use client";

import Link from "next/link";
import { CalendarDays, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { monthLabel } from "@/components/features/shared/mini-calendar";
import { ViewingRow } from "@/components/features/dashboard/viewing-row";
import type { Viewing } from "@/lib/types";

export interface ViewingsListProps {
    viewings: Viewing[];
    year: number;
    month: number;
    selectedDay: number | null;
    onClearDay: () => void;
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
}

export function ViewingsList({
    viewings,
    year,
    month,
    selectedDay,
    onClearDay,
    onReschedule,
    onCancel,
}: ViewingsListProps) {
    return (
        <div className="space-y-3 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-text text-xs font-medium">
                    {selectedDay === null
                        ? "All upcoming viewings"
                        : `Viewings on ${monthLabel(year, month)} ${selectedDay}`}
                </h2>
                {selectedDay !== null && (
                    <Button variant="ghost" size="sm" onClick={onClearDay}>
                        <X size={12} strokeWidth={1.5} className="mr-1.5" />
                        Clear date filter
                    </Button>
                )}
            </div>

            {viewings.length > 0 ? (
                <div className="space-y-3">
                    {viewings.map((viewing) => (
                        <ViewingRow
                            key={viewing.id}
                            viewing={viewing}
                            onReschedule={onReschedule}
                            onCancel={onCancel}
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
    );
}

ViewingsList.displayName = "ViewingsList";

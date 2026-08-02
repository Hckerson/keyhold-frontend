"use client";

import { Button } from "@/components/ui/button";
import { SummaryRow } from "@/components/ui/summary-row";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { monthLabel } from "@/components/features/shared/mini-calendar";
import type { Viewing } from "@/lib/types";

const statusTone = {
    confirmed: "success",
    pending: "warning",
    cancelled: "error",
} as const;

export interface ViewingDayModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    year: number;
    month: number;
    selectedDay: number | null;
    viewings: Viewing[];
}

export function ViewingDayModal({
    open,
    onOpenChange,
    year,
    month,
    selectedDay,
    viewings,
}: ViewingDayModalProps) {
    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalHeader>
                <ModalTitle>
                    {selectedDay === null
                        ? ""
                        : `${monthLabel(year, month)} ${selectedDay}`}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="space-y-3">
                {viewings.map((viewing) => (
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
                        <SummaryRow label="Phone" value={viewing.agentPhone} />
                    </div>
                ))}
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ViewingDayModal.displayName = "ViewingDayModal";

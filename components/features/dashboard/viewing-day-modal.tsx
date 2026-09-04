"use client";

import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ViewingAgentMark } from "@/components/features/dashboard/viewing-agent-mark";
import { ViewingModeMark } from "@/components/features/dashboard/viewing-mode-mark";
import { ViewingPropertyLink } from "@/components/features/dashboard/viewing-property-link";
import { ViewingStatusMark } from "@/components/features/dashboard/viewing-status-mark";
import { dayLabel } from "@/components/features/shared/mini-calendar";
import type { Viewing } from "@/lib/types";

const SLOT_LABEL = "Slot";
const FORMAT_LABEL = "Format";
const AGENT_LABEL = "Agent";
const PHONE_LABEL = "Direct line";
const CLOSE_ACTION = "Close";
const MINUTES_SUFFIX = "min";
const SINGULAR_NOUN = "viewing";
const PLURAL_NOUN = "viewings";

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
        <Modal open={open} onOpenChange={onOpenChange} className="max-w-lg">
            <ModalHeader className="p-4">
                <p className="micro-label">
                    {viewings.length}{" "}
                    {viewings.length === 1 ? SINGULAR_NOUN : PLURAL_NOUN}
                </p>
                <ModalTitle className="mt-0.5">
                    {selectedDay === null
                        ? ""
                        : dayLabel(year, month, selectedDay)}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="scroll-y space-y-2 p-4">
                {viewings.map((viewing) => (
                    <article
                        key={viewing.id}
                        className="border-border-light bg-background rounded-lg border p-3"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <ViewingPropertyLink viewing={viewing} />
                            <ViewingStatusMark
                                status={viewing.status}
                                className="shrink-0"
                            />
                        </div>
                        <div className="border-border-light mt-3 grid grid-cols-2 gap-3 border-t pt-3">
                            <MetricCell label={SLOT_LABEL}>
                                <span className="truncate tabular-nums">
                                    {viewing.time} · {viewing.durationMinutes}
                                    {MINUTES_SUFFIX}
                                </span>
                            </MetricCell>
                            <MetricCell label={FORMAT_LABEL}>
                                <ViewingModeMark mode={viewing.mode} />
                            </MetricCell>
                            <MetricCell label={AGENT_LABEL}>
                                <ViewingAgentMark agent={viewing.agent} />
                            </MetricCell>
                            <MetricCell label={PHONE_LABEL}>
                                <a
                                    href={`tel:${viewing.agentPhone}`}
                                    className="text-accent hover:text-accent-dark ease-smooth truncate tabular-nums transition-colors"
                                >
                                    {viewing.agentPhone}
                                </a>
                            </MetricCell>
                        </div>
                    </article>
                ))}
            </ModalBody>
            <ModalFooter className="p-4">
                <Button
                    type="button"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                >
                    {CLOSE_ACTION}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ViewingDayModal.displayName = "ViewingDayModal";

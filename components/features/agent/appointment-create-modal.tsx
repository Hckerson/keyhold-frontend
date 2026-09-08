"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import { Select, type SelectOption } from "@/components/ui/forms/select";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { Callout } from "@/components/ui/callout";
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { FilterPills } from "@/components/patterns/filter-pills";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    REQUESTABLE_MODES,
    VIEWING_DURATION_MINUTES,
    VIEWING_SLOTS,
} from "@/lib/config/viewing-request";
import { VIEWING_MODES } from "@/lib/config/viewing-tones";
import { CREATE_EVENT_COPY as COPY } from "@/lib/data/agent-calendar";
import { toDateInput, toProposedTimes } from "@/lib/data/viewing-request";
import { API_VIEWING_MODE } from "@/lib/utils/status-maps";
import type { ViewingMode } from "@/lib/types";
import type { CreateViewingInput } from "@/lib/validations/viewing";

const MODE_PILLS = REQUESTABLE_MODES.map((id) => ({
    id,
    label: VIEWING_MODES[id].label,
}));

export interface AppointmentCreateModalProps {
    open: boolean;
    clients: SelectOption<string>[];
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onSubmit: (input: CreateViewingInput) => void;
}

export function AppointmentCreateModal({
    open,
    clients,
    pending,
    failed,
    onClose,
    onSubmit,
}: AppointmentCreateModalProps) {
    const today = useMemo(() => toDateInput(new Date()), []);
    const [connectionId, setConnectionId] = useState("");
    const [date, setDate] = useState(today);
    const [slots, setSlots] = useState<string[]>([VIEWING_SLOTS[0].id]);
    const [mode, setMode] = useState<ViewingMode>(REQUESTABLE_MODES[0]);

    const proposedTimes = useMemo(
        () => toProposedTimes(date, slots),
        [date, slots],
    );

    const selected = connectionId || clients[0]?.value || "";
    const ready = selected !== "" && proposedTimes.length > 0;

    const toggleSlot = (id: string) =>
        setSlots((current) =>
            current.includes(id)
                ? current.filter((slot) => slot !== id)
                : [...current, id],
        );

    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3 p-4">
                <p className="text-text-secondary text-xs">{COPY.hint}</p>

                {clients.length > 0 ? (
                    <LabelledBlock label={COPY.client}>
                        <Select
                            label={COPY.client}
                            options={clients}
                            value={selected}
                            onChange={setConnectionId}
                        />
                    </LabelledBlock>
                ) : (
                    <Callout variant="info" title={COPY.empty} />
                )}

                <FormField
                    name="appointment-date"
                    label={COPY.date}
                    type="date"
                    variant="numeric"
                    min={today}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <LabelledBlock label={COPY.slots}>
                    <ChoiceChips
                        label={COPY.slots}
                        choices={VIEWING_SLOTS}
                        selected={slots}
                        onToggle={toggleSlot}
                    />
                </LabelledBlock>

                <LabelledBlock label={COPY.mode}>
                    <FilterPills
                        filters={MODE_PILLS}
                        active={mode}
                        onChange={setMode}
                    />
                </LabelledBlock>

                {failed && (
                    <Callout
                        variant="error"
                        title={COPY.failed}
                        description={COPY.retry}
                    />
                )}
            </ModalBody>

            <ModalFooter className="gap-2 p-4">
                <Button type="button" onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    disabled={!ready}
                    onClick={() =>
                        onSubmit({
                            connectionId: selected,
                            proposedTimes,
                            mode: API_VIEWING_MODE[mode],
                            durationMinutes: VIEWING_DURATION_MINUTES,
                        })
                    }
                >
                    {COPY.confirm}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

AppointmentCreateModal.displayName = "AppointmentCreateModal";

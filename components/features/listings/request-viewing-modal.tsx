"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
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
    VIEWING_REQUEST_COPY as COPY,
    VIEWING_SLOTS,
} from "@/lib/config/viewing-request";
import { VIEWING_MODES } from "@/lib/config/viewing-tones";
import {
    earliestViewingDate,
    toProposedTimes,
} from "@/lib/data/viewing-request";
import { API_VIEWING_MODE } from "@/lib/utils/status-maps";
import type { ViewingMode } from "@/lib/types";
import type { CreateViewingInput } from "@/lib/validations/viewing";

type ViewingDraft = Omit<CreateViewingInput, "connectionId">;

export interface RequestViewingModalProps {
    open: boolean;
    address: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onSubmit: (draft: ViewingDraft) => void;
}

const MODE_PILLS = REQUESTABLE_MODES.map((id) => ({
    id,
    label: VIEWING_MODES[id].label,
}));

export function RequestViewingModal({
    open,
    address,
    pending,
    failed,
    onClose,
    onSubmit,
}: RequestViewingModalProps) {
    const earliest = useMemo(() => earliestViewingDate(), []);
    const [date, setDate] = useState(earliest);
    const [slots, setSlots] = useState<string[]>([VIEWING_SLOTS[0].id]);
    const [mode, setMode] = useState<ViewingMode>(REQUESTABLE_MODES[0]);

    const proposedTimes = useMemo(
        () => toProposedTimes(date, slots),
        [date, slots],
    );

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
            <ModalHeader>
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3">
                <div>
                    <p className="text-text text-xs font-semibold">{address}</p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {COPY.hint}
                    </p>
                </div>

                <FormField
                    name="viewing-date"
                    label={COPY.date}
                    type="date"
                    variant="numeric"
                    min={earliest}
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

            <ModalFooter className="gap-4">
                <Button type="button" onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    disabled={proposedTimes.length === 0}
                    onClick={() =>
                        onSubmit({
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

RequestViewingModal.displayName = "RequestViewingModal";

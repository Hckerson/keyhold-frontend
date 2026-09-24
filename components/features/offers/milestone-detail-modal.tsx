"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MILESTONE_KINDS_META } from "@/lib/config/contingency-tones";
import { MILESTONE_COPY as COPY } from "@/lib/data/offer-milestones";
import { toDigits } from "@/lib/utils";
import type { MilestoneDetailsInput } from "@/lib/types";
import {
    MILESTONE_NOTE_LIMIT,
    updateMilestoneSchema,
    type DealMilestone,
} from "@/lib/validations/offer";

const VALUE_PREFIX = "$";
const APPRAISAL: DealMilestone["kind"] = "APPRAISAL";

export interface MilestoneDetailModalProps {
    milestone: DealMilestone;
    busy: boolean;
    onClose: () => void;
    onSave: (input: MilestoneDetailsInput) => void;
}

export function MilestoneDetailModal({
    milestone,
    busy,
    onClose,
    onSave,
}: MilestoneDetailModalProps) {
    const [value, setValue] = useState(
        milestone.appraisedValue?.toString() ?? "",
    );
    const [note, setNote] = useState(milestone.note ?? "");
    const [error, setError] = useState<string>();

    const valued = milestone.kind === APPRAISAL;
    const digits = toDigits(value);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        const parsed = updateMilestoneSchema.safeParse({
            note: note.trim(),
            ...(valued && digits ? { appraisedValue: Number(digits) } : {}),
        });

        if (!parsed.success) {
            setError(parsed.error.issues[0]?.message);
            return;
        }

        onSave({
            note: parsed.data.note,
            appraisedValue: parsed.data.appraisedValue,
        });
    };

    return (
        <Modal
            open
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <form onSubmit={submit}>
                <ModalHeader className="p-6">
                    <ModalTitle>{COPY.details}</ModalTitle>
                    <p className="text-text-secondary mt-1 text-xs">
                        {MILESTONE_KINDS_META[milestone.kind].label}
                    </p>
                </ModalHeader>

                <ModalBody className="flex flex-col gap-4 p-6">
                    {valued && (
                        <FormField
                            label={COPY.appraisedValue}
                            name="appraisedValue"
                            variant="numeric"
                            inputMode="numeric"
                            prefix={VALUE_PREFIX}
                            value={value}
                            disabled={busy}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    )}

                    <TextareaField
                        label={COPY.note}
                        name="note"
                        rows={4}
                        maxLength={MILESTONE_NOTE_LIMIT}
                        placeholder={COPY.notePlaceholder}
                        value={note}
                        disabled={busy}
                        onChange={(event) => setNote(event.target.value)}
                    />

                    {error && (
                        <p role="status" className="text-error text-xs">
                            {error}
                        </p>
                    )}
                </ModalBody>

                <ModalFooter className="gap-4 p-6">
                    <Button type="button" onClick={onClose}>
                        {COPY.cancel}
                    </Button>
                    <Button
                        type="submit"
                        emphasis="solid"
                        tone="accent"
                        isLoading={busy}
                    >
                        {COPY.save}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

MilestoneDetailModal.displayName = "MilestoneDetailModal";

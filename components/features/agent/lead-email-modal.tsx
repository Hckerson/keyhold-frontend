"use client";

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
import {
    LEAD_EMAIL_COPY as COPY,
    type LeadEmailDraft,
} from "@/lib/config/lead-contact";
import type { FieldErrors } from "@/lib/validations/auth";

const BODY_ROWS = 7;

export interface LeadEmailModalProps {
    open: boolean;
    recipient: string;
    draft: LeadEmailDraft;
    errors: FieldErrors;
    pending: boolean;
    onDraftChange: (draft: LeadEmailDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function LeadEmailModal({
    open,
    recipient,
    draft,
    errors,
    pending,
    onDraftChange,
    onClose,
    onSubmit,
}: LeadEmailModalProps) {
    const patch = (change: Partial<LeadEmailDraft>) =>
        onDraftChange({ ...draft, ...change });

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
                <p className="text-text-secondary text-xs">
                    {recipient} · {COPY.hint}
                </p>

                <FormField
                    name="subject"
                    label={COPY.subject}
                    placeholder={COPY.subjectPlaceholder}
                    value={draft.subject}
                    error={errors.subject}
                    onChange={(event) => patch({ subject: event.target.value })}
                />

                <TextareaField
                    name="body"
                    label={COPY.body}
                    rows={BODY_ROWS}
                    placeholder={COPY.bodyPlaceholder}
                    value={draft.body}
                    error={errors.body}
                    onChange={(event) => patch({ body: event.target.value })}
                />
            </ModalBody>

            <ModalFooter>
                <Button type="button" onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    onClick={onSubmit}
                >
                    {COPY.submit}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

LeadEmailModal.displayName = "LeadEmailModal";

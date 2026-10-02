"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FormField } from "@/components/ui/forms/form-field";
import { Select } from "@/components/ui/forms/select";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    LEAD_CAPTURE_COPY as COPY,
    type LeadDraft,
} from "@/lib/config/lead-capture";
import type { SelectOption } from "@/components/ui/forms/select";
import type { FieldErrors } from "@/lib/validations/auth";

export interface LeadCreateModalProps {
    open: boolean;
    draft: LeadDraft;
    listings: SelectOption<string>[];
    errors: FieldErrors;
    pending: boolean;
    failed: boolean;
    onDraftChange: (draft: LeadDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function LeadCreateModal({
    open,
    draft,
    listings,
    errors,
    pending,
    failed,
    onDraftChange,
    onClose,
    onSubmit,
}: LeadCreateModalProps) {
    const patch = (change: Partial<LeadDraft>) =>
        onDraftChange({ ...draft, ...change });

    return (
        <Modal
            open={open}
            locked={pending}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3">
                <p className="text-text-secondary text-xs">{COPY.hint}</p>

                {listings.length > 0 ? (
                    <>
                        <LabelledBlock label={COPY.listing}>
                            <Select
                                label={COPY.listing}
                                options={listings}
                                value={draft.propertyId}
                                onChange={(propertyId) => patch({ propertyId })}
                            />
                        </LabelledBlock>

                        <FormField
                            name="buyerEmail"
                            type="email"
                            label={COPY.email}
                            placeholder={COPY.emailPlaceholder}
                            value={draft.buyerEmail}
                            error={errors.buyerEmail}
                            onChange={(event) =>
                                patch({ buyerEmail: event.target.value })
                            }
                        />
                    </>
                ) : (
                    <Callout
                        variant="info"
                        title={COPY.emptyListings}
                        description={COPY.emptyListingsLede}
                    />
                )}

                {failed && (
                    <Callout
                        variant="error"
                        title={COPY.failed}
                        description={COPY.retry}
                    />
                )}
            </ModalBody>

            <ModalFooter>
                <Button type="button" disabled={pending} onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    disabled={listings.length === 0}
                    onClick={onSubmit}
                >
                    {COPY.submit}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

LeadCreateModal.displayName = "LeadCreateModal";

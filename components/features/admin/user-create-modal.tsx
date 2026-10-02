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
    USER_INVITE_COPY as COPY,
    USER_ROLE_OPTIONS,
    type UserInviteDraft,
} from "@/lib/config/user-invite";
import type { UserRole } from "@/lib/enums/enums";
import type { FieldErrors } from "@/lib/validations/auth";

export interface UserCreateModalProps {
    open: boolean;
    draft: UserInviteDraft;
    errors: FieldErrors;
    pending: boolean;
    failed: boolean;
    onDraftChange: (draft: UserInviteDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function UserCreateModal({
    open,
    draft,
    errors,
    pending,
    failed,
    onDraftChange,
    onClose,
    onSubmit,
}: UserCreateModalProps) {
    const patch = (change: Partial<UserInviteDraft>) =>
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

            <ModalBody className="scroll-y max-h-[60vh] space-y-3">
                <p className="text-text-secondary text-xs">{COPY.hint}</p>

                <FormField
                    name="fullName"
                    label={COPY.name}
                    value={draft.fullName}
                    error={errors.fullName}
                    onChange={(event) =>
                        patch({ fullName: event.target.value })
                    }
                />

                <FormField
                    name="email"
                    type="email"
                    label={COPY.email}
                    value={draft.email}
                    error={errors.email}
                    onChange={(event) => patch({ email: event.target.value })}
                />

                <FormField
                    name="password"
                    type="password"
                    label={COPY.password}
                    value={draft.password}
                    error={errors.password}
                    onChange={(event) =>
                        patch({ password: event.target.value })
                    }
                />

                <FormField
                    name="phoneNumber"
                    type="tel"
                    label={COPY.phone}
                    hint={COPY.optional}
                    value={draft.phoneNumber}
                    error={errors.phoneNumber}
                    onChange={(event) =>
                        patch({ phoneNumber: event.target.value })
                    }
                />

                <LabelledBlock label={COPY.role}>
                    <Select
                        label={COPY.role}
                        options={USER_ROLE_OPTIONS}
                        value={draft.role}
                        onChange={(role: UserRole) => patch({ role })}
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

UserCreateModal.displayName = "UserCreateModal";

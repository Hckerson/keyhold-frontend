"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FormField } from "@/components/ui/forms/form-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { UserPasswordField } from "@/components/features/admin/user-password-field";
import {
    USER_INVITE_COPY as COPY,
    USER_ROLE_CHOICES,
    type UserInviteDraft,
} from "@/lib/config/user-invite";
import type { FieldErrors } from "@/lib/validations/auth";

export interface UserCreateModalProps {
    open: boolean;
    draft: UserInviteDraft;
    errors: FieldErrors;
    pending: boolean;
    failure?: string;
    onDraftChange: (draft: UserInviteDraft) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export function UserCreateModal({
    open,
    draft,
    errors,
    pending,
    failure,
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
                <p className="text-text-secondary mt-1 text-xs">{COPY.lede}</p>
            </ModalHeader>

            <ModalBody className="scroll-y flex max-h-[70vh] flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                        name="fullName"
                        label={COPY.name}
                        autoComplete="off"
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
                        autoComplete="off"
                        value={draft.email}
                        error={errors.email}
                        onChange={(event) =>
                            patch({ email: event.target.value })
                        }
                    />
                </div>

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

                <div className="flex flex-col gap-1.5">
                    <p className="text-text-secondary text-xs font-medium">
                        {COPY.role}
                    </p>
                    <ChoiceChips
                        label={COPY.roleLabel}
                        choices={USER_ROLE_CHOICES}
                        selected={[draft.role]}
                        onToggle={(role) => patch({ role })}
                    />
                </div>

                <UserPasswordField
                    value={draft.password}
                    error={errors.password}
                    onChange={(password) => patch({ password })}
                />

                {failure && (
                    <Callout
                        variant="error"
                        title={COPY.failed}
                        description={failure}
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

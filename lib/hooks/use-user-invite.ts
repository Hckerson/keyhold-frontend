"use client";

import { useState } from "react";
import {
    EMPTY_USER_INVITE_DRAFT,
    USER_INVITE_COPY,
    type UserInviteDraft,
} from "@/lib/config/user-invite";
import { useCreateUser } from "@/lib/hooks/use-users";
import { errorMessage } from "@/lib/utils/api-error";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import { createUserSchema } from "@/lib/validations/user";

export function useUserInvite() {
    const createUser = useCreateUser();
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<UserInviteDraft>(
        EMPTY_USER_INVITE_DRAFT,
    );
    const [errors, setErrors] = useState<FieldErrors>({});

    const start = () => {
        if (createUser.isPending) return;
        createUser.reset();
        setDraft(EMPTY_USER_INVITE_DRAFT);
        setErrors({});
        setOpen(true);
    };

    const close = () => {
        if (!createUser.isPending) setOpen(false);
    };

    const submit = () => {
        if (createUser.isPending) return;
        const parsed = createUserSchema.safeParse({
            ...draft,
            phoneNumber: draft.phoneNumber.trim() || undefined,
        });

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        createUser.mutate(parsed.data, { onSuccess: () => setOpen(false) });
    };

    return {
        open,
        draft,
        errors,
        pending: createUser.isPending,
        failure: createUser.isError
            ? errorMessage(createUser.error, USER_INVITE_COPY.retry)
            : undefined,
        setDraft,
        start,
        close,
        submit,
    };
}

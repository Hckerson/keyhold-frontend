"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isSafeRedirect, portalForRole } from "@/lib/constants";
import { AUTH_FAILURES } from "@/lib/config/auth-recovery";
import { useSignIn } from "@/lib/hooks/use-sign-in";
import { errorMessage } from "@/lib/utils/api-error";
import {
    fieldErrorFor,
    loginSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const INITIAL_VALUES = { email: "", password: "" };

type LoginField = keyof typeof INITIAL_VALUES;

export function useLoginForm(redirectTo?: string) {
    const router = useRouter();
    const signIn = useSignIn();

    const [values, setValues] = useState(INITIAL_VALUES);
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const parsed = loginSchema.safeParse(values);

    const handleChange =
        (field: LoginField) => (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined }));
            setFormError(null);
        };

    const handleBlur = (field: LoginField) => () =>
        setErrors((current) => ({
            ...current,
            [field]: fieldErrorFor(loginSchema, values, field),
        }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setPending(true);
        setFormError(null);

        try {
            const user = await signIn(parsed.data, remember);

            router.replace(
                isSafeRedirect(redirectTo)
                    ? redirectTo
                    : portalForRole(user.role),
            );
        } catch (error) {
            setFormError(errorMessage(error, AUTH_FAILURES.signIn));
            setPending(false);
        }
    };

    return {
        values,
        remember,
        setRemember,
        errors,
        formError,
        pending,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}

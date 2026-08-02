"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
    AuthField,
    AuthFormError,
    AuthFormHeader,
    AuthNotice,
    AuthPlane,
    AuthSubmit,
    AuthTitleBlock,
} from "@/components/features/auth/parts";
import { apiClient } from "@/lib/api/client";
import { AUTH_ENDPOINTS, AUTH_ROUTES } from "@/lib/constants";
import { errorMessage } from "@/lib/utils/api-error";
import {
    MIN_PASSWORD_LENGTH,
    fieldErrorFor,
    newPasswordSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const RESET_FAILED =
    "We couldn't reset your password. The link may have expired — request a new one.";

const NEW_PASSWORD_VALUES = { password: "", confirmPassword: "" };

const RECOVERY_STEP = { current: 2, total: 2 };

const DONE_ENTRIES = [
    {
        label: "Ready when you are",
        href: AUTH_ROUTES.login,
        action: "Go to sign in",
    },
];

const PENDING_ENTRIES = [
    {
        label: "Link expired",
        href: AUTH_ROUTES.resetPassword,
        action: "Request a new one",
    },
    {
        label: "Know your password",
        href: AUTH_ROUTES.login,
        action: "Back to sign in",
    },
];

export interface ResetConfirmStepProps {
    token: string;
}

export function ResetConfirmStep({ token }: ResetConfirmStepProps) {
    const [values, setValues] = useState(NEW_PASSWORD_VALUES);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [done, setDone] = useState(false);

    const parsed = newPasswordSchema.safeParse(values);

    const handleChange =
        (field: keyof typeof NEW_PASSWORD_VALUES) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined }));
            setFormError(null);
        };

    const handleBlur = (field: keyof typeof NEW_PASSWORD_VALUES) => () =>
        setErrors((current) => ({
            ...current,
            [field]: fieldErrorFor(newPasswordSchema, values, field),
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
            await apiClient.post(AUTH_ENDPOINTS.resetPassword, {
                token,
                password: parsed.data.password,
            });
            setDone(true);
        } catch (error) {
            setFormError(errorMessage(error, RESET_FAILED));
        } finally {
            setPending(false);
        }
    };

    if (done) {
        return (
            <AuthPlane>
                <AuthFormHeader
                    kicker="Recovery complete"
                    title="Password updated"
                    description="Your new password is active. Sign in to pick up where you left off."
                    step={RECOVERY_STEP}
                />
                <AuthNotice
                    tone="success"
                    title="All set"
                    description="You can now sign in with your new password."
                />
                <AuthTitleBlock entries={DONE_ENTRIES} />
            </AuthPlane>
        );
    }

    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="New credentials"
                title="Choose a new password"
                description={`Pick something you haven't used before, at least ${MIN_PASSWORD_LENGTH} characters long.`}
                step={RECOVERY_STEP}
            />

            <AuthFormError title="Reset failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col">
                    <AuthField
                        index="01"
                        label="New password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        autoFocus
                        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                        value={values.password}
                        error={errors.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                    />

                    <AuthField
                        index="02"
                        label="Confirm new password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repeat your new password"
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                    />
                </fieldset>

                <AuthSubmit
                    label="Update password"
                    pendingLabel="Updating password"
                    pending={pending}
                    disabled={!parsed.success}
                />
            </form>

            <AuthTitleBlock entries={PENDING_ENTRIES} />
        </AuthPlane>
    );
}

ResetConfirmStep.displayName = "ResetConfirmStep";

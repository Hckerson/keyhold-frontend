"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence } from "motion/react";
import {
    AuthField,
    AuthFormError,
    AuthFormHeader,
    AuthPlane,
    AuthSubmit,
    AuthTitleBlock,
} from "@/components/features/auth/parts";
import { ResetDonePanel } from "@/components/features/auth/reset-done-panel";
import { apiClient } from "@/lib/api/client";
import {
    RECOVERY_PENDING_ENTRIES,
    RECOVERY_STEP,
} from "@/lib/config/auth-recovery";
import { AUTH_ENDPOINTS } from "@/lib/constants";
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

    return (
        <AnimatePresence mode="wait">
            {done ? (
                <ResetDonePanel key="done" />
            ) : (
                <AuthPlane key="confirm">
                    <AuthFormHeader
                        kicker="New credentials"
                        title="Choose a new password"
                        description={`Pick something you haven't used before, at least ${MIN_PASSWORD_LENGTH} characters long.`}
                        step={RECOVERY_STEP.confirm}
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

                    <AuthTitleBlock entries={RECOVERY_PENDING_ENTRIES} />
                </AuthPlane>
            )}
        </AnimatePresence>
    );
}

ResetConfirmStep.displayName = "ResetConfirmStep";

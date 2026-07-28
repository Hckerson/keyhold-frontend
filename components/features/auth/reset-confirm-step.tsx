"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
    AuthField,
    AuthFooterLink,
    AuthFormError,
    AuthFormHeader,
    AuthSubmit,
} from "@/components/features/auth/parts";
import { Callout } from "@/components/ui/callout";
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
            <div className="flex flex-col gap-6">
                <AuthFormHeader
                    title="Password updated"
                    description="Your new password is active. Sign in to pick up where you left off."
                />
                <Callout
                    variant="success"
                    title="All set"
                    description="You can now sign in with your new password."
                />
                <AuthFooterLink
                    prompt="Ready when you are."
                    href={AUTH_ROUTES.login}
                    label="Go to sign in"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <AuthFormHeader
                title="Choose a new password"
                description="Pick something you haven't used before, at least 8 characters long."
            />

            <AuthFormError title="Reset failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col gap-3">
                    <AuthField
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

            <p className="text-text-secondary text-xs">
                Link expired?{" "}
                <Link
                    href={AUTH_ROUTES.resetPassword}
                    className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth rounded-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    Request a new one
                </Link>
            </p>
        </div>
    );
}

ResetConfirmStep.displayName = "ResetConfirmStep";

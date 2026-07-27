"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
    AuthField,
    AuthFooterLink,
    AuthFormError,
    AuthFormHeader,
    AuthSubmit,
} from "@/components/patterns/auth";
import { Callout } from "@/components/ui/callout";
import { apiClient } from "@/lib/api-client";
import { AUTH_ENDPOINTS, AUTH_ROUTES } from "@/lib/constants";
import { errorMessage } from "@/lib/utils/api-error";
import {
    MIN_PASSWORD_LENGTH,
    fieldErrorFor,
    newPasswordSchema,
    resetPasswordSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const REQUEST_FAILED =
    "We couldn't send the reset link. Check the address and try again.";

const RESET_FAILED =
    "We couldn't reset your password. The link may have expired — request a new one.";

/* ── request a link ── */

const REQUEST_VALUES = { email: "" };

function RequestLinkForm() {
    const [values, setValues] = useState(REQUEST_VALUES);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [sentTo, setSentTo] = useState<string | null>(null);

    const parsed = resetPasswordSchema.safeParse(values);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ email: event.target.value });
        setErrors({});
        setFormError(null);
    };

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
            await apiClient.post(AUTH_ENDPOINTS.forgotPassword, parsed.data);
            setSentTo(parsed.data.email);
        } catch (error) {
            setFormError(errorMessage(error, REQUEST_FAILED));
        } finally {
            setPending(false);
        }
    };

    if (sentTo) {
        return (
            <div className="flex flex-col gap-6">
                <AuthFormHeader
                    title="Check your inbox"
                    description="Follow the link in the message to choose a new password. It expires in 30 minutes."
                />
                <Callout
                    variant="success"
                    title="Reset link sent"
                    description={`We sent instructions to ${sentTo}.`}
                />
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => setSentTo(null)}
                        className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth self-start rounded-sm text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        Use a different email address
                    </button>
                    <AuthFooterLink
                        prompt="Remembered it?"
                        href={AUTH_ROUTES.login}
                        label="Back to sign in"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <AuthFormHeader
                title="Reset your password"
                description="Enter the email on your account and we'll send a link to set a new password."
            />

            <AuthFormError title="Request failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending}>
                    <AuthField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="you@example.com"
                        value={values.email}
                        error={errors.email}
                        onChange={handleChange}
                        onBlur={() =>
                            setErrors({
                                email: fieldErrorFor(
                                    resetPasswordSchema,
                                    values,
                                    "email",
                                ),
                            })
                        }
                    />
                </fieldset>

                <AuthSubmit
                    label="Send reset link"
                    pendingLabel="Sending link"
                    pending={pending}
                    disabled={!parsed.success}
                />
            </form>

            <AuthFooterLink
                prompt="Remembered it?"
                href={AUTH_ROUTES.login}
                label="Back to sign in"
            />
        </div>
    );
}

/* ── choose a new password ── */

const NEW_PASSWORD_VALUES = { password: "", confirmPassword: "" };

function NewPasswordForm({ token }: { token: string }) {
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

export interface ResetPasswordFormProps {
    token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    return token ? <NewPasswordForm token={token} /> : <RequestLinkForm />;
}

ResetPasswordForm.displayName = "ResetPasswordForm";

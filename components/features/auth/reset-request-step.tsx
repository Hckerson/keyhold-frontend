"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
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
    fieldErrorFor,
    resetPasswordSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const REQUEST_FAILED =
    "We couldn't send the reset link. Check the address and try again.";

const REQUEST_VALUES = { email: "" };

export function ResetRequestStep() {
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

ResetRequestStep.displayName = "ResetRequestStep";

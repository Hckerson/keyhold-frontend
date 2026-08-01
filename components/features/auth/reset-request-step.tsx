"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { cn } from "@/lib/utils";
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
    fieldErrorFor,
    resetPasswordSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const REQUEST_FAILED =
    "We couldn't send the reset link. Check the address and try again.";

const REQUEST_VALUES = { email: "" };

const RECOVERY_STEP = { current: 1, total: 2 };

const FOOTER_ENTRIES = [
    {
        label: "Remembered it",
        href: AUTH_ROUTES.login,
        action: "Back to sign in",
    },
];

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
            <AuthPlane>
                <AuthFormHeader
                    kicker="Link dispatched"
                    title="Check your inbox"
                    description="Follow the link in the message to choose a new password. It expires in 30 minutes."
                    step={RECOVERY_STEP}
                />
                <AuthNotice
                    tone="success"
                    title="Reset link sent"
                    description={`We sent instructions to ${sentTo}.`}
                />
                <button
                    type="button"
                    onClick={() => setSentTo(null)}
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        "text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth self-start rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                    )}
                >
                    Use a different email
                </button>
                <AuthTitleBlock entries={FOOTER_ENTRIES} />
            </AuthPlane>
        );
    }

    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="Account recovery"
                title="Reset your password"
                description="Enter the email on your account and we'll send a link to set a new password."
                step={RECOVERY_STEP}
            />

            <AuthFormError title="Request failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col">
                    <AuthField
                        index="01"
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

            <AuthTitleBlock entries={FOOTER_ENTRIES} />
        </AuthPlane>
    );
}

ResetRequestStep.displayName = "ResetRequestStep";

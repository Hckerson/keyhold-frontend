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
import { ResetSentPanel } from "@/components/features/auth/reset-sent-panel";
import { useRequestPasswordReset } from "@/lib/hooks/use-auth-recovery";
import {
    RECOVERY_BACK_ENTRIES,
    RECOVERY_STEP,
} from "@/lib/config/auth-recovery";
import {
    fieldErrorFor,
    resetPasswordSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const REQUEST_VALUES = { email: "" };

export function ResetRequestStep() {
    const request = useRequestPasswordReset();

    const [values, setValues] = useState(REQUEST_VALUES);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [sentTo, setSentTo] = useState<string | null>(null);

    const { pending, error: formError } = request;

    const parsed = resetPasswordSchema.safeParse(values);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ email: event.target.value });
        setErrors({});
        request.clearError();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        try {
            await request.submit(parsed.data);
            setSentTo(parsed.data.email);
        } catch {
            return;
        }
    };

    return (
        <AnimatePresence mode="wait" propagate>
            {sentTo ? (
                <ResetSentPanel
                    key="sent"
                    email={sentTo}
                    onUseAnotherEmail={() => setSentTo(null)}
                />
            ) : (
                <AuthPlane key="request">
                    <AuthFormHeader
                        kicker="Account recovery"
                        title="Reset your password"
                        description="Enter the email on your account and we'll send a link to set a new password."
                        step={RECOVERY_STEP.request}
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

                    <AuthTitleBlock entries={RECOVERY_BACK_ENTRIES} />
                </AuthPlane>
            )}
        </AnimatePresence>
    );
}

ResetRequestStep.displayName = "ResetRequestStep";

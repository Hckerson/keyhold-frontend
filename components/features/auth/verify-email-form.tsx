"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    AuthField,
    AuthFormError,
    AuthFormHeader,
    AuthNotice,
    AuthPlane,
    AuthSubmit,
    AuthTitleBlock,
} from "@/components/features/auth/parts";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import {
    AUTH_FAILURES,
    RECOVERY_DONE_ENTRIES,
    VERIFY_COPY as COPY,
    VERIFY_STEP,
} from "@/lib/config/auth-recovery";
import {
    useResendVerification,
    useVerifyEmail,
} from "@/lib/hooks/use-email-verification";
import { EMAIL_CODE_LENGTH, verifyEmailSchema } from "@/lib/validations/auth";
import { errorMessage } from "@/lib/utils/api-error";
import { cn } from "@/lib/utils";

const PENDING_LABEL = "Confirming";
const CODE_PLACEHOLDER = "000000";
const ERROR_TITLE = "Verification failed";

export interface VerifyEmailFormProps {
    email?: string;
    redirectTo?: string;
}

export function VerifyEmailForm({ email, redirectTo }: VerifyEmailFormProps) {
    const router = useRouter();
    const verify = useVerifyEmail();
    const resend = useResendVerification();
    const [code, setCode] = useState("");
    const [error, setError] = useState<string>();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value.replace(/\D/g, ""));
        setError(undefined);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const parsed = verifyEmailSchema.safeParse({ code });

        if (!parsed.success) {
            setError(parsed.error.issues[0]?.message);
            return;
        }

        verify.mutate(parsed.data.code, {
            onSuccess: () => {
                if (redirectTo) router.replace(redirectTo);
            },
        });
    };

    if (verify.isSuccess && !redirectTo)
        return (
            <AuthPlane>
                <AuthFormHeader
                    kicker={COPY.kicker}
                    title={COPY.done}
                    description={COPY.doneLede}
                    step={VERIFY_STEP.confirm}
                />
                <AuthNotice
                    tone="success"
                    title={COPY.done}
                    description={COPY.doneLede}
                />
                <AuthTitleBlock entries={RECOVERY_DONE_ENTRIES} />
            </AuthPlane>
        );

    return (
        <AuthPlane>
            <AuthFormHeader
                kicker={COPY.kicker}
                title={COPY.title}
                description={
                    email
                        ? `${COPY.description} Sent to ${email}.`
                        : COPY.description
                }
                step={VERIFY_STEP.confirm}
            />

            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
                noValidate
            >
                <AuthField
                    index="01"
                    label={COPY.label}
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={EMAIL_CODE_LENGTH}
                    placeholder={CODE_PLACEHOLDER}
                    value={code}
                    error={error}
                    onChange={onChange}
                />

                <AuthFormError
                    title={ERROR_TITLE}
                    message={
                        verify.isError
                            ? errorMessage(verify.error, AUTH_FAILURES.verify)
                            : null
                    }
                />

                <AuthSubmit
                    label={COPY.submit}
                    pendingLabel={PENDING_LABEL}
                    pending={verify.isPending}
                    disabled={code.length !== EMAIL_CODE_LENGTH}
                />
            </form>

            <button
                type="button"
                onClick={() => resend.mutate()}
                disabled={resend.isPending}
                className={cn(
                    authLabelVariants({ tier: "label" }),
                    "text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50",
                )}
            >
                {COPY.resend}
            </button>

            <AuthTitleBlock
                entries={
                    redirectTo
                        ? [
                              {
                                  label: COPY.skipLabel,
                                  href: redirectTo,
                                  action: COPY.skip,
                              },
                          ]
                        : RECOVERY_DONE_ENTRIES
                }
            />
        </AuthPlane>
    );
}

VerifyEmailForm.displayName = "VerifyEmailForm";

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CredentialSlat } from "@/components/features/auth/join/credential-slat";
import { RoleDossier } from "@/components/features/auth/join/role-dossier";
import type { JoinRoleOption } from "@/components/features/auth/join/join-roles";
import {
    CONFIRM_FIELD,
    IDENTITY_FIELDS,
    PASSWORD_FIELD,
    SESSION_DAYS,
    SIGNUP_COPY,
    SIGNUP_FIELDS,
    STRENGTH_TIERS,
    strengthOf,
    type SignupFieldId,
} from "@/components/features/auth/join/signup-fields";
import { signupSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import { cn } from "@/lib/utils";

/* ── password strength gauge, spans the credential plane ── */

function StrengthLedger({ value }: { value: string }) {
    if (value.length === 0) {
        return (
            <span className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase">
                {SIGNUP_COPY.strengthHint}
            </span>
        );
    }

    const score = strengthOf(value);
    const tier = STRENGTH_TIERS[score];

    return (
        <div className="flex items-center gap-2">
            <span
                className={cn(
                    "shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase",
                    tier.word,
                )}
            >
                {tier.label}
            </span>
            <span aria-hidden="true" className="flex flex-1 gap-0.5">
                {STRENGTH_TIERS.map((step, index) => (
                    <span
                        key={step.label}
                        className={cn(
                            "ease-smooth h-0.5 flex-1 rounded-full transition-colors duration-200",
                            index <= score ? tier.bar : "bg-sidebar-active",
                        )}
                    />
                ))}
            </span>
        </div>
    );
}

StrengthLedger.displayName = "StrengthLedger";

/* ── one toggle governing both secure fields ── */

function SecureToggle({
    visible,
    onToggle,
}: {
    visible: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={visible}
            aria-controls="password confirmPassword"
            className="border-sidebar-border text-sidebar-text hover:text-text-inverse hover:border-highlight/40 focus-visible:ring-highlight ease-smooth inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            {visible ? (
                <EyeOff size={12} strokeWidth={1.5} aria-hidden="true" />
            ) : (
                <Eye size={12} strokeWidth={1.5} aria-hidden="true" />
            )}
            {visible ? SIGNUP_COPY.hideLabel : SIGNUP_COPY.showLabel}
        </button>
    );
}

SecureToggle.displayName = "SecureToggle";

/* ── submit-level failure, dark-native replacement for Callout ── */

function SubmitAlert({ message }: { message: string }) {
    return (
        <p
            role="alert"
            className="border-error/40 bg-error/10 text-error-light flex items-start gap-2 rounded-md border p-2 text-xs leading-[1.5]"
        >
            <AlertCircle
                size={12}
                strokeWidth={1.5}
                aria-hidden="true"
                className="mt-0.5 shrink-0"
            />
            {message}
        </p>
    );
}

SubmitAlert.displayName = "SubmitAlert";

/* ── legal ── */

function LegalNote() {
    return (
        <p className="text-sidebar-text text-xs leading-[1.7]">
            {SIGNUP_COPY.legalLead}{" "}
            <Link
                href="/terms"
                className="text-text-inverse hover:text-highlight ease-smooth underline underline-offset-2 transition-colors duration-200"
            >
                {SIGNUP_COPY.termsLabel}
            </Link>{" "}
            and{" "}
            <Link
                href="/privacy"
                className="text-text-inverse hover:text-highlight ease-smooth underline underline-offset-2 transition-colors duration-200"
            >
                {SIGNUP_COPY.privacyLabel}
            </Link>
            .
        </p>
    );
}

LegalNote.displayName = "LegalNote";

/* ── shell ── */

export interface CredentialsStepProps {
    option: JoinRoleOption;
    values: Record<SignupFieldId, string>;
    onChange: (id: SignupFieldId, value: string) => void;
    onBack: () => void;
}

export function CredentialsStep({
    option,
    values,
    onChange,
    onBack,
}: CredentialsStepProps) {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [secureVisible, setSecureVisible] = useState(false);
    const [announcement, setAnnouncement] = useState("");

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape" || isLoading) return;
            if ((event.target as HTMLElement | null)?.tagName === "INPUT")
                return;
            onBack();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isLoading, onBack]);

    const parsed = signupSchema.safeParse({ ...values, role: option.value });
    const isValid = (id: SignupFieldId) =>
        values[id].length > 0 &&
        (parsed.success ||
            !parsed.error.issues.some((issue) => issue.path[0] === id));

    const handleChange = (id: SignupFieldId, value: string) => {
        onChange(id, value);
        setErrors((current) => {
            if (!current[id] && !current.submit) return current;
            const next = { ...current };
            delete next[id];
            delete next.submit;
            return next;
        });
    };

    const handleBlur = () => {
        const complete = SIGNUP_FIELDS.filter((field) =>
            isValid(field.id),
        ).length;
        setAnnouncement(SIGNUP_COPY.progressTemplate(complete));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const result = signupSchema.parse({
                ...values,
                role: option.value,
            });
            const response = await query.post<AuthResponse>(
                "/auth/register",
                result,
            );

            if (
                !response.data ||
                !response.data.user ||
                !response.data.accessToken
            ) {
                setErrors({
                    submit: response.message || SIGNUP_COPY.failedError,
                });
                setIsLoading(false);
                return;
            }

            const { user, accessToken } = response.data;
            setAuth(user, accessToken);
            setCookie("access_token", accessToken, SESSION_DAYS);
            router.push(option.portal);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path.length > 0) {
                        newErrors[String(issue.path[0])] = issue.message;
                    }
                });
                setErrors(newErrors);
            } else {
                setErrors({ submit: SIGNUP_COPY.genericError });
            }
            setIsLoading(false);
        }
    };

    const hasSecureError = Boolean(errors.password || errors.confirmPassword);

    return (
        <div className="animate-in fade-in mx-auto flex w-full max-w-4xl flex-col gap-4 duration-300">
            <form
                onSubmit={(event) => void handleSubmit(event)}
                className="grid gap-4 md:grid-cols-[0.85fr_1.15fr] md:items-start"
            >
                <RoleDossier
                    option={option}
                    onBack={onBack}
                    disabled={isLoading}
                />

                <div className="border-sidebar-border bg-sidebar/45 animate-in fade-in slide-in-from-bottom-2 fill-mode-both flex flex-col gap-3 rounded-xl border p-3 backdrop-blur-md delay-75 duration-300">
                    <div className="flex flex-col gap-2">
                        <span className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase">
                            {SIGNUP_COPY.identityLabel}
                        </span>
                        <div className="grid gap-2 lg:grid-cols-2">
                            {IDENTITY_FIELDS.map((field, index) => (
                                <CredentialSlat
                                    key={field.id}
                                    spec={field}
                                    value={values[field.id]}
                                    valid={isValid(field.id)}
                                    error={errors[field.id]}
                                    secureVisible={secureVisible}
                                    disabled={isLoading}
                                    autoFocus={index === 0}
                                    onChange={(value) =>
                                        handleChange(field.id, value)
                                    }
                                    onBlur={handleBlur}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className={cn(
                            "bg-sidebar-active/60 flex flex-col gap-2.5 rounded-lg p-3",
                            hasSecureError && "ring-error/40 ring-1",
                        )}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sidebar-text font-mono text-[10px] tracking-[0.14em] uppercase">
                                {SIGNUP_COPY.credentialLabel}
                            </span>
                            <SecureToggle
                                visible={secureVisible}
                                onToggle={() =>
                                    setSecureVisible((current) => !current)
                                }
                            />
                        </div>

                        <CredentialSlat
                            spec={PASSWORD_FIELD}
                            value={values.password}
                            valid={isValid("password")}
                            error={errors.password}
                            secureVisible={secureVisible}
                            disabled={isLoading}
                            onChange={(value) =>
                                handleChange("password", value)
                            }
                            onBlur={handleBlur}
                        />

                        <StrengthLedger value={values.password} />

                        <div className="border-sidebar-border border-l pl-3">
                            <CredentialSlat
                                spec={CONFIRM_FIELD}
                                value={values.confirmPassword}
                                valid={isValid("confirmPassword")}
                                error={errors.confirmPassword}
                                secureVisible={secureVisible}
                                disabled={isLoading}
                                onChange={(value) =>
                                    handleChange("confirmPassword", value)
                                }
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>

                    {errors.submit && <SubmitAlert message={errors.submit} />}

                    <LegalNote />

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full [--btn-ring:var(--color-highlight)]"
                        isLoading={isLoading}
                    >
                        {SIGNUP_COPY.submitLabel}
                    </Button>

                    <p className="sr-only" role="status" aria-live="polite">
                        {announcement}
                    </p>
                </div>
            </form>

            <p className="text-sidebar-text text-xs">
                {SIGNUP_COPY.accountPrompt}{" "}
                <Link
                    href="/login"
                    className="text-text-inverse hover:text-highlight ease-smooth font-medium underline-offset-4 transition-colors duration-200 hover:underline"
                >
                    {SIGNUP_COPY.signInLabel}
                </Link>
            </p>
        </div>
    );
}

CredentialsStep.displayName = "CredentialsStep";

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    AuthFieldGroup,
    AuthField,
} from "@/components/features/auth/auth-field";
import type { JoinRoleOption } from "@/components/features/auth/join/join-roles";
import { signupSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import { cn } from "@/lib/utils";

const SESSION_DAYS = 7;

type FieldId = "fullName" | "email" | "password" | "confirmPassword";

interface SignupField {
    id: FieldId;
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    autoComplete: string;
    secure?: boolean;
}

const SIGNUP_FIELDS: readonly SignupField[] = [
    {
        id: "fullName",
        label: "Name",
        placeholder: "Jonathan Doe",
        autoComplete: "name",
    },
    {
        id: "email",
        label: "Email",
        placeholder: "you@example.com",
        type: "email",
        autoComplete: "email",
    },
    {
        id: "password",
        label: "Password",
        placeholder: "At least 8 characters",
        autoComplete: "new-password",
        secure: true,
    },
    {
        id: "confirmPassword",
        label: "Confirm",
        placeholder: "Repeat password",
        autoComplete: "new-password",
        secure: true,
    },
];

const EMPTY_VALUES: Record<FieldId, string> = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const STRENGTH_TIERS = [
    { label: "Weak", tone: "bg-error" },
    { label: "Fair", tone: "bg-warning" },
    { label: "Strong", tone: "bg-success" },
] as const;

const strengthOf = (value: string) => {
    if (value.length < 8) return 0;
    const varied = /[a-z]/.test(value) && /[A-Z0-9]/.test(value);
    return varied && value.length >= 12 ? 2 : 1;
};

/* ── inline strength readout, lives in the password row ── */

function StrengthMeter({ value }: { value: string }) {
    const score = strengthOf(value);
    const tier = STRENGTH_TIERS[score];

    return (
        <span className="flex items-center gap-1.5">
            <span className="text-text-muted font-mono text-[10px] tracking-[0.1em] uppercase">
                {tier.label}
            </span>
            <span className="flex gap-0.5" aria-hidden="true">
                {STRENGTH_TIERS.map((step, i) => (
                    <span
                        key={step.label}
                        className={cn(
                            "ease-smooth h-0.5 w-3 rounded-full transition-colors duration-200",
                            i <= score ? tier.tone : "bg-border-dark",
                        )}
                    />
                ))}
            </span>
        </span>
    );
}

export function CredentialsStep({
    option,
    onBack,
}: {
    option: JoinRoleOption;
    onBack: () => void;
}) {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [values, setValues] = useState<Record<FieldId, string>>(EMPTY_VALUES);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isLoading) onBack();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isLoading, onBack]);

    const parsed = signupSchema.safeParse({ ...values, role: option.value });
    const isValid = (id: FieldId) =>
        values[id].length > 0 &&
        (parsed.success ||
            !parsed.error.issues.some((issue) => issue.path[0] === id));

    const setValue = (id: FieldId, value: string) =>
        setValues((current) => ({ ...current, [id]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    submit:
                        response.message || "Signup failed. Please try again.",
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
                setErrors({
                    submit: "Something went wrong. Please try again.",
                });
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in zoom-in-95 mx-auto w-full max-w-96 duration-300">
            <div className="bg-background ring-highlight/20 flex flex-col gap-4 rounded-xl p-5 shadow-2xl ring-1">
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isLoading}
                        className="border-border text-text-secondary hover:border-accent hover:text-accent focus-visible:ring-accent ease-smooth inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
                    >
                        <ArrowLeft size={12} strokeWidth={1.5} />
                        {option.label}
                    </button>
                    <span className="text-text-muted font-mono text-[10px] tracking-[0.16em] uppercase">
                        Step 02 of 02
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <h1 className="font-display text-text text-h6 leading-[1.2] font-light tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-text-secondary text-xs">
                        {option.headline} — four details and your portal is
                        ready.
                    </p>
                </div>

                <form
                    onSubmit={(e) => void handleSubmit(e)}
                    className="flex flex-col gap-3.5"
                >
                    <AuthFieldGroup>
                        {SIGNUP_FIELDS.map((field, i) => (
                            <AuthField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                type={field.type}
                                secure={field.secure}
                                autoComplete={field.autoComplete}
                                placeholder={field.placeholder}
                                autoFocus={i === 0}
                                value={values[field.id]}
                                onChange={(e) =>
                                    setValue(field.id, e.target.value)
                                }
                                error={errors[field.id]}
                                valid={isValid(field.id)}
                                status={
                                    field.id === "password" &&
                                    values.password.length > 0 &&
                                    !errors.password ? (
                                        <StrengthMeter
                                            value={values.password}
                                        />
                                    ) : undefined
                                }
                                disabled={isLoading}
                            />
                        ))}
                    </AuthFieldGroup>

                    {errors.submit && (
                        <Callout variant="error" title={errors.submit} />
                    )}

                    <p className="text-text-muted text-[10px] leading-[1.7]">
                        By continuing you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-text-secondary hover:text-accent ease-smooth underline underline-offset-2 transition-colors duration-200"
                        >
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-text-secondary hover:text-accent ease-smooth underline underline-offset-2 transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Create account
                    </Button>
                </form>

                <p className="text-text-secondary border-border border-t pt-3.5 text-center text-xs">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-accent hover:text-accent-dark ease-smooth font-medium transition-colors duration-200"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

CredentialsStep.displayName = "CredentialsStep";

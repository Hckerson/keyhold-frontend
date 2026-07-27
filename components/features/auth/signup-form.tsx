"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AuthField,
    AuthFooterLink,
    AuthFormError,
    AuthFormHeader,
    AuthRoleChoice,
    AuthSubmit,
    SocialAuthRow,
    type SignupRole,
} from "@/components/patterns/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/api-client";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ENDPOINTS,
    AUTH_ROUTES,
    SESSION_DAYS,
    portalForRole,
} from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthResponse } from "@/lib/types/auth";
import { setCookie } from "@/lib/utils/cookies";
import { errorMessage } from "@/lib/utils/api-error";
import {
    MIN_PASSWORD_LENGTH,
    fieldErrorFor,
    signupSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const INITIAL_VALUES = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SIGN_UP_FAILED =
    "We couldn't create your account. Review your details and try again.";

const LEGAL_LINK_CLASS =
    "text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

export function SignupForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [role, setRole] = useState<SignupRole | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const submission = { ...values, role, acceptedTerms };
    const parsed = signupSchema.safeParse(submission);

    const handleChange =
        (field: keyof typeof INITIAL_VALUES) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined }));
            setFormError(null);
        };

    const handleBlur = (field: keyof typeof INITIAL_VALUES) => () =>
        setErrors((current) => ({
            ...current,
            [field]: fieldErrorFor(signupSchema, submission, field),
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
            const { data } = await apiClient.post<{ data: AuthResponse }>(
                AUTH_ENDPOINTS.register,
                {
                    fullName: parsed.data.fullName,
                    email: parsed.data.email,
                    password: parsed.data.password,
                    role: parsed.data.role,
                },
            );
            const { user, accessToken } = data.data;

            setAuth(user, accessToken);
            setCookie(ACCESS_TOKEN_COOKIE, accessToken, SESSION_DAYS);
            router.replace(portalForRole(user.role));
        } catch (error) {
            setFormError(errorMessage(error, SIGN_UP_FAILED));
            setPending(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <AuthFormHeader
                title="Begin your application"
                description="Apply for access to the marketplace — as a buyer seeking a residence, or an agent presenting one."
            />

            <AuthFormError title="Application failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col gap-3">
                    <AuthRoleChoice
                        name="role"
                        legend="I'm here for"
                        value={role}
                        error={errors.role}
                        onChange={(next) => {
                            setRole(next);
                            setErrors((current) => ({
                                ...current,
                                role: undefined,
                            }));
                            setFormError(null);
                        }}
                    />

                    <AuthField
                        label="Full name"
                        name="fullName"
                        autoComplete="name"
                        placeholder="Elena Voss"
                        value={values.fullName}
                        error={errors.fullName}
                        onChange={handleChange("fullName")}
                        onBlur={handleBlur("fullName")}
                    />

                    <AuthField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        error={errors.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                    />

                    <AuthField
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                        value={values.password}
                        error={errors.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                    />

                    <AuthField
                        label="Confirm password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                    />

                    <div className="flex flex-col gap-1">
                        <Checkbox
                            id="acceptedTerms"
                            name="acceptedTerms"
                            checked={acceptedTerms}
                            aria-invalid={
                                errors.acceptedTerms ? true : undefined
                            }
                            aria-describedby={
                                errors.acceptedTerms
                                    ? "acceptedTerms-error"
                                    : undefined
                            }
                            onChange={(event) => {
                                setAcceptedTerms(event.target.checked);
                                setErrors((current) => ({
                                    ...current,
                                    acceptedTerms: undefined,
                                }));
                            }}
                            onBlur={() =>
                                setErrors((current) => ({
                                    ...current,
                                    acceptedTerms: fieldErrorFor(
                                        signupSchema,
                                        submission,
                                        "acceptedTerms",
                                    ),
                                }))
                            }
                            label={
                                <>
                                    I agree to the{" "}
                                    <Link
                                        href={AUTH_ROUTES.terms}
                                        className={LEGAL_LINK_CLASS}
                                    >
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href={AUTH_ROUTES.privacy}
                                        className={LEGAL_LINK_CLASS}
                                    >
                                        Privacy Policy
                                    </Link>
                                </>
                            }
                        />
                        {errors.acceptedTerms && (
                            <p
                                id="acceptedTerms-error"
                                className="text-error text-xs"
                            >
                                {errors.acceptedTerms}
                            </p>
                        )}
                    </div>
                </fieldset>

                <AuthSubmit
                    label="Create account"
                    pendingLabel="Creating account"
                    pending={pending}
                    disabled={!parsed.success}
                />
            </form>

            <SocialAuthRow
                action="Sign up"
                label="Or apply with"
                disabled={pending}
            />

            <AuthFooterLink
                prompt="Already have an account?"
                href={AUTH_ROUTES.login}
                label="Sign in"
            />
        </div>
    );
}

SignupForm.displayName = "SignupForm";

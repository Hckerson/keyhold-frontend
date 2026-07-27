"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AuthField,
    AuthFooterLink,
    AuthFormError,
    AuthFormHeader,
    AuthSubmit,
    SocialAuthRow,
} from "@/components/patterns/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/api-client";
import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ENDPOINTS,
    AUTH_ROUTES,
    SESSION_DAYS,
    isSafeRedirect,
    portalForRole,
} from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthResponse } from "@/lib/types/auth";
import { setCookie } from "@/lib/utils/cookies";
import { errorMessage } from "@/lib/utils/api-error";
import {
    fieldErrorFor,
    loginSchema,
    toFieldErrors,
    type FieldErrors,
} from "@/lib/validations/auth";

const INITIAL_VALUES = { email: "", password: "" };

const SIGN_IN_FAILED =
    "We couldn't sign you in. Check your email and password, then try again.";

export interface LoginFormProps {
    redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [remember, setRemember] = useState(true);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const parsed = loginSchema.safeParse(values);

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
            [field]: fieldErrorFor(loginSchema, values, field),
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
                AUTH_ENDPOINTS.login,
                parsed.data,
            );
            const { user, accessToken } = data.data;

            setAuth(user, accessToken);
            setCookie(
                ACCESS_TOKEN_COOKIE,
                accessToken,
                remember ? SESSION_DAYS : null,
            );

            router.replace(
                isSafeRedirect(redirectTo)
                    ? redirectTo
                    : portalForRole(user.role),
            );
        } catch (error) {
            setFormError(errorMessage(error, SIGN_IN_FAILED));
            setPending(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <AuthFormHeader
                title="Sign in to your account"
                description="Access saved residences, private viewings and your advisor's notes."
            />

            <AuthFormError title="Sign in failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col gap-3">
                    <AuthField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        placeholder="Your password"
                        value={values.password}
                        error={errors.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        hint={
                            <Link
                                href={AUTH_ROUTES.resetPassword}
                                className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth rounded-sm text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                            >
                                Forgot password?
                            </Link>
                        }
                    />

                    <Checkbox
                        id="remember"
                        name="remember"
                        label="Keep me signed in on this device"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                    />
                </fieldset>

                <AuthSubmit
                    label="Sign in"
                    pendingLabel="Signing in"
                    pending={pending}
                    disabled={!parsed.success}
                />
            </form>

            <SocialAuthRow
                action="Sign in"
                redirectTo={redirectTo}
                disabled={pending}
            />

            <AuthFooterLink
                prompt="No account yet?"
                href={AUTH_ROUTES.signup}
                label="Apply for access"
            />
        </div>
    );
}

LoginForm.displayName = "LoginForm";

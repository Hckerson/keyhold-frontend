"use client";

import Link from "next/link";
import {
    AuthCheck,
    AuthField,
    AuthFormError,
    AuthFormHeader,
    AuthNotice,
    AuthPlane,
    AuthSubmit,
    AuthTitleBlock,
    DevAuthRow,
    SocialAuthRow,
} from "@/components/features/auth/parts";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { cn } from "@/lib/utils";
import { AUTH_ROUTES } from "@/lib/constants";
import { SESSION_EXPIRED } from "@/lib/config/feedback";
import {
    OAUTH_NOTICES,
    loginFooterEntries,
    type OAuthFailure,
} from "@/lib/config/auth-recovery";
import { useLoginForm } from "@/lib/hooks/use-login-form";

export interface LoginFormProps {
    redirectTo?: string;
    expired?: boolean;
    oauthFailure?: OAuthFailure;
}

export function LoginForm({
    redirectTo,
    expired,
    oauthFailure,
}: LoginFormProps) {
    const {
        values,
        remember,
        setRemember,
        errors,
        formError,
        pending,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useLoginForm(redirectTo);

    return (
        <AuthPlane>
            <AuthFormHeader
                kicker="Returning member"
                title="Sign in to your account"
                description="Access saved residences, private viewings and your advisor's notes."
            />

            {expired && !formError && (
                <AuthNotice
                    tone="info"
                    title={SESSION_EXPIRED.title}
                    description={SESSION_EXPIRED.description}
                />
            )}

            {oauthFailure && !formError && (
                <AuthNotice
                    tone="error"
                    title={OAUTH_NOTICES[oauthFailure].title}
                    description={OAUTH_NOTICES[oauthFailure].description}
                />
            )}

            <AuthFormError title="Sign in failed" message={formError} />

            <form
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
                className="flex flex-col gap-4"
            >
                <fieldset disabled={pending} className="flex flex-col gap-3">
                    <div className="flex flex-col">
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
                            onChange={handleChange("email")}
                            onBlur={handleBlur("email")}
                        />

                        <AuthField
                            index="02"
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
                                    className={cn(
                                        authLabelVariants({ tier: "label" }),
                                        "text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                                    )}
                                >
                                    Forgot?
                                </Link>
                            }
                        />
                    </div>

                    <AuthCheck
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
                />
            </form>

            <SocialAuthRow
                action="Sign in"
                redirectTo={redirectTo}
                disabled={pending}
            />

            <DevAuthRow redirectTo={redirectTo} disabled={pending} />

            <AuthTitleBlock entries={loginFooterEntries(redirectTo)} />
        </AuthPlane>
    );
}

LoginForm.displayName = "LoginForm";

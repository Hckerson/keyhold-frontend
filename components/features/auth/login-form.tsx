"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Lock } from "lucide-react";

import { loginSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Callout } from "@/components/ui/callout";
import { AuthHeading } from "@/components/features/auth/auth-heading";
import {
    AuthFieldGroup,
    AuthField,
} from "@/components/features/auth/auth-field";

const PORTAL_BY_ROLE: Record<string, string> = {
    ADMIN: "/admin",
    BUYER: "/dashboard",
    SELLER: "/agent",
};

function GoogleGlyph() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px]">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
            />
        </svg>
    );
}

function AppleGlyph() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-[17px]"
        >
            <path d="M16.36 12.9c.02 2.5 2.2 3.34 2.22 3.35-.02.06-.35 1.2-1.15 2.37-.7 1.02-1.42 2.03-2.56 2.05-1.12.02-1.48-.66-2.76-.66-1.28 0-1.68.64-2.74.68-1.1.04-1.94-1.1-2.64-2.11-1.44-2.09-2.54-5.9-1.06-8.48.73-1.28 2.05-2.09 3.48-2.11 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.55.02 2.08.22 3.07 1.67-.08.05-1.83 1.07-1.81 3.19M14.3 5.4c.58-.7.98-1.68.87-2.65-.84.03-1.86.56-2.47 1.26-.54.62-1.02 1.62-.89 2.57.94.07 1.9-.48 2.49-1.18" />
        </svg>
    );
}

export function LoginForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const result = loginSchema.parse({ email, password });
            const response = await query.post<AuthResponse>(
                "/auth/login",
                result,
            );

            if (
                !response.data ||
                !response.data.user ||
                !response.data.accessToken
            ) {
                setErrors({
                    submit:
                        response.message || "Login failed. Please try again.",
                });
                setIsLoading(false);
                return;
            }

            const { user, accessToken } = response.data;
            setAuth(user, accessToken);
            setCookie("access_token", accessToken, remember ? 30 : 7);
            router.push(PORTAL_BY_ROLE[user.role] || "/");
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
        <div className="mx-auto w-full max-w-[360px]">
            <AuthHeading
                eyebrow="Member Access"
                title="Welcome back"
                subtitle="Sign in to your private portfolio and continue where you left off."
            />

            <div className="mt-[28px] flex flex-col gap-2.5">
                <button
                    type="button"
                    className="ease-smooth border-border-dark text-text hover:border-text-muted hover:bg-background-alt bg-background font-body flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border text-[13.5px] font-normal transition-all hover:-translate-y-px"
                >
                    <GoogleGlyph />
                    Continue with Google
                </button>
                <button
                    type="button"
                    className="ease-smooth border-border-dark text-text hover:border-text-muted hover:bg-background-alt bg-background font-body flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border text-[13.5px] font-normal transition-all hover:-translate-y-px"
                >
                    <AppleGlyph />
                    Continue with Apple
                </button>
            </div>

            <div className="my-[22px] flex items-center gap-3.5">
                <div className="bg-border h-px flex-1" />
                <span className="text-text-muted font-mono text-[9.5px] tracking-[1.6px] whitespace-nowrap uppercase">
                    or sign in with email
                </span>
                <div className="bg-border h-px flex-1" />
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
                <AuthFieldGroup>
                    <AuthField
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        disabled={isLoading}
                    />
                    <AuthField
                        id="password"
                        label="Password"
                        secure
                        autoComplete="current-password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        disabled={isLoading}
                    />
                </AuthFieldGroup>

                {errors.submit && (
                    <Callout variant="error" title={errors.submit} />
                )}

                <div className="flex items-center justify-between">
                    <Checkbox
                        id="remember"
                        label="Keep me signed in"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <Link
                        href="/reset-password"
                        className="ease-smooth text-highlight-dark hover:text-accent text-[12.5px] transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="mt-[22px] w-full"
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Sign In
                </Button>
            </form>

            <div className="text-text-muted mt-4 flex items-center justify-center gap-[7px]">
                <Lock size={12} strokeWidth={1.5} />
                <span className="text-text-muted font-mono text-[10px] tracking-[0.8px]">
                    256-bit encrypted · Private by design
                </span>
            </div>

            <div className="border-border-light text-text-secondary mt-[30px] border-t pt-[22px] text-center text-[13px] font-light">
                New to Luxury RE?{" "}
                <Link
                    href="/signup"
                    className="ease-smooth text-accent hover:text-highlight-dark font-medium transition-colors"
                >
                    Create an account
                </Link>
            </div>
        </div>
    );
}

LoginForm.displayName = "LoginForm";

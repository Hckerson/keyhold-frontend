"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout } from "@/components/ui/callout";
import { DevQuickLogin } from "@/components/features/dev-quick-login";
import { loginSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";

const PORTAL_BY_ROLE: Record<string, string> = {
    ADMIN: "/admin",
    BUYER: "/dashboard",
    SELLER: "/agent",
};

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            setCookie("access_token", accessToken, 7);
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
        <div className="space-y-6">
            <header className="space-y-1.5 text-center">
                <h1 className="text-h3 font-display text-text font-light">
                    Welcome back
                </h1>
                <p className="text-text-secondary text-sm">
                    Sign in to your luxury real estate account
                </p>
            </header>

            <div className="bg-background-muted border-border-light rounded-xl border p-6 shadow-sm">
                <form
                    onSubmit={(e) => void handleSubmit(e)}
                    className="space-y-4"
                >
                    <Input
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        disabled={isLoading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        disabled={isLoading}
                    />

                    {errors.submit && (
                        <Callout variant="error" title={errors.submit} />
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>

                    <DevQuickLogin />
                </form>
            </div>

            <div className="space-y-3 text-center text-sm">
                <Link
                    href="/reset-password"
                    className="text-text-secondary hover:text-accent ease-smooth block transition-colors"
                >
                    Forgot your password?
                </Link>
                <p className="text-text-secondary">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-accent hover:text-accent-dark ease-smooth font-medium transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

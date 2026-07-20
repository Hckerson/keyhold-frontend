"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout } from "@/components/ui/callout";
import { DevQuickLogin } from "@/components/features/dev-quick-login";
import { signupSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import { cn } from "@/lib/utils";

const ROLES = [
    { value: "BUYER", label: "Buyer" },
    { value: "SELLER", label: "Seller / Agent" },
] as const;

type Role = (typeof ROLES)[number]["value"];

const PORTAL_BY_ROLE: Record<Role, string> = {
    BUYER: "/dashboard",
    SELLER: "/agent",
};

export default function SignupPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<Role>("BUYER");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const result = signupSchema.parse({
                fullName,
                email,
                password,
                confirmPassword,
                role,
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
            setCookie("access_token", accessToken, 7);
            router.push(PORTAL_BY_ROLE[role]);
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
                    Create your account
                </h1>
                <p className="text-text-secondary text-sm">
                    Join the premium real estate marketplace
                </p>
            </header>

            <div className="bg-background-muted border-border-light rounded-xl border p-6 shadow-sm">
                <form
                    onSubmit={(e) => void handleSubmit(e)}
                    className="space-y-4"
                >
                    <Input
                        label="Full Name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={errors.fullName}
                        disabled={isLoading}
                    />

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
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        disabled={isLoading}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        disabled={isLoading}
                    />

                    <fieldset>
                        <legend className="text-text mb-2 text-sm font-medium">
                            Account Type
                        </legend>
                        <div
                            role="radiogroup"
                            aria-label="Account type"
                            className="grid grid-cols-2 gap-2"
                        >
                            {ROLES.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={role === option.value}
                                    onClick={() => setRole(option.value)}
                                    disabled={isLoading}
                                    className={cn(
                                        "ease-smooth rounded-lg border px-3 py-2 text-sm transition-colors disabled:opacity-50",
                                        role === option.value
                                            ? "border-accent bg-accent-light text-accent font-medium"
                                            : "border-border bg-background text-text-secondary hover:border-accent/40 hover:text-accent",
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {errors.role && (
                            <p className="text-error mt-1 text-xs">
                                {errors.role}
                            </p>
                        )}
                    </fieldset>

                    {errors.submit && (
                        <Callout variant="error" title={errors.submit} />
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Create Account
                    </Button>

                    <DevQuickLogin />
                </form>
            </div>

            <p className="text-text-secondary text-center text-sm">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-accent hover:text-accent-dark ease-smooth font-medium transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import { devLoginAs } from "@/lib/utils/dev-auth";

const DEV_MODE = process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";

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

            const portalMap: Record<string, string> = {
                ADMIN: "/admin",
                BUYER: "/dashboard",
                SELLER: "/agent",
            };
            router.push(portalMap[user.role] || "/");
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
                setErrors({ submit: "An unexpected error occurred." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-h3 font-display text-text font-light">
                    Welcome Back
                </h1>
                <p className="text-text-secondary text-base">
                    Sign in to your luxury real estate account
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-h5">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => void handleSubmit(e)}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-text text-sm font-medium">
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-error text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-text text-sm font-medium">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-error text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>

                        {errors.submit && (
                            <p className="text-error text-center text-sm">
                                {errors.submit}
                            </p>
                        )}

                        {DEV_MODE && (
                            <div className="border-border-light space-y-2 border-t pt-4">
                                <p className="text-text-secondary text-center text-xs">
                                    Development Mode - Quick Login
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("ADMIN");
                                            router.push("/admin");
                                        }}
                                        className="bg-background border-border text-text hover:border-accent hover:text-accent rounded border px-2 py-1 text-xs transition-colors"
                                    >
                                        Admin
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("BUYER");
                                            router.push("/dashboard");
                                        }}
                                        className="bg-background border-border text-text hover:border-accent hover:text-accent rounded border px-2 py-1 text-xs transition-colors"
                                    >
                                        Buyer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("SELLER");
                                            router.push("/agent");
                                        }}
                                        className="bg-background border-border text-text hover:border-accent hover:text-accent rounded border px-2 py-1 text-xs transition-colors"
                                    >
                                        Seller
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Link
                    href="/reset-password"
                    className="text-text-secondary hover:text-accent block text-center text-sm transition-colors"
                >
                    Forgot your password?
                </Link>

                <p className="text-text-secondary text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-accent hover:text-accent-dark font-medium transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import { devLoginAs } from "@/lib/utils/dev-auth";

const DEV_MODE = process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";

export default function SignupPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<"BUYER" | "SELLER">("BUYER");
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
            const response = await query.post<AuthResponse>("/auth/register", result);

            if (!response.data || !response.data.user || !response.data.accessToken) {
                setErrors({ submit: response.message || "Signup failed. Please try again." });
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
        } catch (error: any) {
            if (error.errors) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err: any) => {
                    if (err.path[0]) {
                        newErrors[err.path[0]] = err.message;
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
                    Join Luxury RE
                </h1>
                <p className="text-text-secondary text-base">
                    Create your premium real estate account
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-h5">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-text text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.fullName && (
                                <p className="text-error text-sm">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

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

                        <div className="space-y-2">
                            <label className="text-text text-sm font-medium">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-error text-sm">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-text text-sm font-medium">
                                Account Type
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="BUYER"
                                        checked={role === "BUYER"}
                                        onChange={(e) => setRole(e.target.value as "BUYER" | "SELLER")}
                                        disabled={isLoading}
                                    />
                                    <span className="text-text text-sm">Buyer</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="SELLER"
                                        checked={role === "SELLER"}
                                        onChange={(e) => setRole(e.target.value as "BUYER" | "SELLER")}
                                        disabled={isLoading}
                                    />
                                    <span className="text-text text-sm">Seller/Agent</span>
                                </label>
                            </div>
                            {errors.role && (
                                <p className="text-error text-sm">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        <Button
                            variant="primary"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Creating account..."
                                : "Create Account"}
                        </Button>

                        {errors.submit && (
                            <p className="text-error text-sm text-center">
                                {errors.submit}
                            </p>
                        )}

                        {DEV_MODE && (
                            <div className="pt-4 border-t border-border space-y-2">
                                <p className="text-text-secondary text-xs text-center">
                                    Development Mode - Quick Login
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("ADMIN");
                                            router.push("/admin");
                                        }}
                                        className="bg-background border border-border text-text hover:border-accent hover:text-accent text-xs rounded px-2 py-1 transition-colors"
                                    >
                                        Admin
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("BUYER");
                                            router.push("/dashboard");
                                        }}
                                        className="bg-background border border-border text-text hover:border-accent hover:text-accent text-xs rounded px-2 py-1 transition-colors"
                                    >
                                        Buyer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            devLoginAs("SELLER");
                                            router.push("/agent");
                                        }}
                                        className="bg-background border border-border text-text hover:border-accent hover:text-accent text-xs rounded px-2 py-1 transition-colors"
                                    >
                                        Seller
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>

            <p className="text-text-secondary text-center text-sm">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-accent hover:text-accent-dark font-medium transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}

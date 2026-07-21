"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    AuthFieldGroup,
    AuthField,
} from "@/components/features/auth/auth-field";
import {
    RoleSelect,
    type RoleOption,
} from "@/components/features/auth/role-select";
import { DevQuickLogin } from "@/components/features/dev-quick-login";
import { signupSchema } from "@/lib/validations/auth";
import { query } from "@/lib/api-client";
import type { AuthResponse } from "@/lib/types/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";

type Role = "BUYER" | "SELLER";

const ROLE_OPTIONS: readonly RoleOption<Role>[] = [
    { value: "BUYER", label: "Buyer", description: "I'm looking to buy" },
    { value: "SELLER", label: "Seller / Agent", description: "I'm listing" },
];

const PORTAL_BY_ROLE: Record<Role, string> = {
    BUYER: "/dashboard",
    SELLER: "/agent",
};

export function SignupForm() {
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
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
            <AuthFieldGroup>
                <AuthField
                    id="fullName"
                    label="Full Name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    disabled={isLoading}
                />
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
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    disabled={isLoading}
                />
                <AuthField
                    id="confirmPassword"
                    label="Confirm Password"
                    secure
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                />
            </AuthFieldGroup>

            <RoleSelect
                label="Account Type"
                value={role}
                options={ROLE_OPTIONS}
                onChange={setRole}
                error={errors.role}
                disabled={isLoading}
            />

            {errors.submit && <Callout variant="error" title={errors.submit} />}

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
    );
}

SignupForm.displayName = "SignupForm";

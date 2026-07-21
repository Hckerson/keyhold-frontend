"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { MailCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    AuthFieldGroup,
    AuthField,
} from "@/components/features/auth/auth-field";
import { AuthHeading } from "@/components/features/auth/auth-heading";
import { resetPasswordSchema } from "@/lib/validations/auth";

export function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            resetPasswordSchema.parse({ email });
            setSuccess(true);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0]?.message || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="space-y-6">
                <span className="bg-success/10 text-success grid size-12 place-items-center rounded-full">
                    <MailCheck size={20} strokeWidth={1.5} />
                </span>
                <div className="space-y-2">
                    <p className="text-text-muted text-caption font-mono tracking-wide uppercase">
                        Account Recovery
                    </p>
                    <h1 className="font-display text-text text-h4 font-light">
                        Check your email
                    </h1>
                    <p className="text-text-secondary text-sm">
                        We&apos;ve sent a password reset link to{" "}
                        <span className="text-text font-medium">{email}</span>.
                        Follow the link to set a new password.
                    </p>
                </div>
                <Link
                    href="/login"
                    className={buttonVariants({
                        variant: "secondary",
                        className: "w-full",
                    })}
                >
                    Back to Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <AuthHeading
                eyebrow="Account Recovery"
                title="Reset password"
                subtitle="Enter your email to receive a reset link"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthFieldGroup>
                    <AuthField
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={error}
                        disabled={isLoading}
                    />
                </AuthFieldGroup>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Send Reset Link
                </Button>
            </form>

            <p className="text-text-secondary text-sm">
                Remember your password?{" "}
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

ResetPasswordForm.displayName = "ResetPasswordForm";

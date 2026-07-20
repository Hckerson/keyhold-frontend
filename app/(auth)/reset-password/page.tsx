"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { MailCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/lib/validations/auth";

export default function ResetPasswordPage() {
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
            <div className="space-y-6 text-center">
                <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <MailCheck size={22} strokeWidth={1.5} />
                </span>
                <div className="space-y-1.5">
                    <h1 className="text-h3 font-display text-text font-light">
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
        <div className="space-y-6">
            <header className="space-y-1.5 text-center">
                <h1 className="text-h3 font-display text-text font-light">
                    Reset password
                </h1>
                <p className="text-text-secondary text-sm">
                    Enter your email to receive a reset link
                </p>
            </header>

            <div className="bg-background-muted border-border-light rounded-xl border p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={error}
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Send Reset Link
                    </Button>
                </form>
            </div>

            <p className="text-text-secondary text-center text-sm">
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

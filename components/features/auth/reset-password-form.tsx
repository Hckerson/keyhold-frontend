"use client";

import { ResetConfirmStep } from "@/components/features/auth/reset-confirm-step";
import { ResetRequestStep } from "@/components/features/auth/reset-request-step";

export interface ResetPasswordFormProps {
    token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    return token ? <ResetConfirmStep token={token} /> : <ResetRequestStep />;
}

ResetPasswordForm.displayName = "ResetPasswordForm";

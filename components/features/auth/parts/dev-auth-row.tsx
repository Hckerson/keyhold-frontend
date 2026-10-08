"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { Spinner } from "@/components/ui/spinner";
import {
    DEV_ACCOUNTS,
    DEV_PASSWORD,
    DEV_QUICK_LOGIN,
} from "@/lib/config/dev-accounts";
import { isSafeRedirect, portalForRole } from "@/lib/constants";
import { useSignIn } from "@/lib/hooks/use-sign-in";
import { cn } from "@/lib/utils";
import type { DevAccount } from "@/lib/config/dev-accounts";

const DEV_LABEL = "Development sign in";

export interface DevAuthRowProps {
    redirectTo?: string;
    disabled?: boolean;
}

export function DevAuthRow({ redirectTo, disabled = false }: DevAuthRowProps) {
    const router = useRouter();
    const signIn = useSignIn();
    const [pending, setPending] = useState<string | null>(null);

    if (!DEV_QUICK_LOGIN) return null;

    const handleClick = async (account: DevAccount) => {
        setPending(account.email);

        try {
            const user = await signIn({
                email: account.email,
                password: DEV_PASSWORD,
            });

            router.replace(
                isSafeRedirect(redirectTo)
                    ? redirectTo
                    : portalForRole(user.role),
            );
        } catch {
            setPending(null);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span aria-hidden="true" className="bg-border h-px flex-1" />
                <span
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        "text-text-muted select-none",
                    )}
                >
                    {DEV_LABEL}
                </span>
                <span aria-hidden="true" className="bg-border h-px flex-1" />
            </div>
            <div className="grid grid-cols-3 gap-2">
                {DEV_ACCOUNTS.map((account) => (
                    <button
                        key={account.email}
                        type="button"
                        disabled={disabled || pending !== null}
                        onClick={() => void handleClick(account)}
                        className={cn(
                            authLabelVariants({ tier: "label" }),
                            "border-border bg-background text-text-secondary hover:border-accent hover:text-text focus-visible:ring-accent ease-smooth flex h-9 items-center justify-center gap-2 rounded-xs border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                        )}
                    >
                        {pending === account.email && (
                            <Spinner
                                size="sm"
                                tone="current"
                                aria-hidden="true"
                                className="size-3"
                            />
                        )}
                        {account.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

DevAuthRow.displayName = "DevAuthRow";

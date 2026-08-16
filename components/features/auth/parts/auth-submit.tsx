"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { Spinner } from "@/components/ui/spinner";
import { AUTH_SWAP_MOTION } from "@/lib/config/auth-motion";

export interface AuthSubmitProps {
    label: string;
    pendingLabel: string;
    pending: boolean;
    disabled: boolean;
}

export function AuthSubmit({
    label,
    pendingLabel,
    pending,
    disabled,
}: AuthSubmitProps) {
    return (
        <button
            type="submit"
            disabled={disabled || pending}
            aria-busy={pending || undefined}
            className="group border-accent-dark bg-accent text-text-inverse hover:bg-accent-dark focus-visible:ring-accent ease-smooth flex h-10 w-full items-center justify-between rounded-xs border px-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
            <span className={authLabelVariants({ tier: "marker" })}>
                {pending ? pendingLabel : label}
            </span>
            <span className="flex items-center gap-3">
                <span aria-hidden="true" className="bg-highlight h-4 w-px" />
                <span className="relative block size-3">
                    <AnimatePresence initial={false}>
                        {pending ? (
                            <m.span
                                key="pending"
                                {...AUTH_SWAP_MOTION}
                                className="absolute inset-0"
                            >
                                <Spinner
                                    size="sm"
                                    tone="current"
                                    className="size-3"
                                />
                            </m.span>
                        ) : (
                            <m.span
                                key="idle"
                                {...AUTH_SWAP_MOTION}
                                className="absolute inset-0"
                            >
                                <ArrowRight
                                    strokeWidth={1.5}
                                    className="ease-smooth size-3 transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            </m.span>
                        )}
                    </AnimatePresence>
                </span>
            </span>
        </button>
    );
}

AuthSubmit.displayName = "AuthSubmit";

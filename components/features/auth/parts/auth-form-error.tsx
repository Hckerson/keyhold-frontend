"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { AuthNotice } from "@/components/features/auth/parts/auth-notice";
import { AUTH_COLLAPSE_MOTION } from "@/lib/config/auth-motion";

export interface AuthFormErrorProps {
    title: string;
    message: string | null;
}

export function AuthFormError({ title, message }: AuthFormErrorProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (message) containerRef.current?.focus();
    }, [message]);

    return (
        <AnimatePresence initial={false}>
            {message && (
                <m.div
                    key="notice"
                    role="alert"
                    aria-live="assertive"
                    tabIndex={-1}
                    ref={containerRef}
                    {...AUTH_COLLAPSE_MOTION}
                    className="overflow-hidden focus-visible:outline-none"
                >
                    <AuthNotice
                        tone="error"
                        title={title}
                        description={message}
                    />
                </m.div>
            )}
        </AnimatePresence>
    );
}

AuthFormError.displayName = "AuthFormError";

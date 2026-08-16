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
        <div
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            ref={containerRef}
            className="focus-visible:outline-none"
        >
            <AnimatePresence initial={false}>
                {message && (
                    <m.div
                        key="notice"
                        {...AUTH_COLLAPSE_MOTION}
                        className="overflow-hidden"
                    >
                        <AuthNotice
                            tone="error"
                            title={title}
                            description={message}
                        />
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}

AuthFormError.displayName = "AuthFormError";

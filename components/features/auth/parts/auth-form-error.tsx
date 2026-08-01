"use client";

import { useEffect, useRef } from "react";
import { AuthNotice } from "@/components/features/auth/parts/auth-notice";

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
            {message && (
                <AuthNotice tone="error" title={title} description={message} />
            )}
        </div>
    );
}

AuthFormError.displayName = "AuthFormError";

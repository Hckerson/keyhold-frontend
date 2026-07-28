"use client";

import { useEffect, useRef } from "react";
import { Callout } from "@/components/ui/callout";

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
        >
            {message && (
                <Callout variant="error" title={title} description={message} />
            )}
        </div>
    );
}

AuthFormError.displayName = "AuthFormError";

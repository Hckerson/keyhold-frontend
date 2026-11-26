import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { SkipLink } from "@/components/layout/skip-link";
import { BrandPanel } from "@/components/features/auth/brand-panel";
import { AuthMotionFrame } from "@/components/features/auth/parts/auth-motion-frame";
import styles from "@/components/features/auth/auth-shell.module.css";
import { MAIN_CONTENT_ID } from "@/lib/constants";

export interface AuthShellProps {
    children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <SkipLink />
            <BrandPanel />
            <main
                id={MAIN_CONTENT_ID}
                className={`${styles.ground} gutter-x gutter-x--flush flex flex-col justify-center py-12`}
            >
                <div className="mx-auto w-full max-w-85">
                    <div className="desk-hidden mb-10">
                        <Wordmark />
                    </div>
                    <AuthMotionFrame>{children}</AuthMotionFrame>
                </div>
            </main>
        </div>
    );
}

AuthShell.displayName = "AuthShell";

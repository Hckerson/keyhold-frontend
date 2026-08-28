import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { BrandPanel } from "@/components/features/auth/brand-panel";
import { AuthMotionFrame } from "@/components/features/auth/parts/auth-motion-frame";

export interface AuthShellProps {
    children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <BrandPanel />
            <main className="gutter-x gutter-x--flush bg-background flex flex-col justify-center py-12">
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

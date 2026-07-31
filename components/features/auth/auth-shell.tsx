import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { BrandPanel } from "@/components/features/auth/brand-panel";

export interface AuthShellProps {
    children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <BrandPanel />
            <main className="bg-background flex flex-col justify-center px-6 py-12 sm:px-14">
                <div className="mx-auto w-full max-w-85">
                    <div className="mb-10 lg:hidden">
                        <Wordmark />
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}

AuthShell.displayName = "AuthShell";

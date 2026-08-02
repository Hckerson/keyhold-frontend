"use client";

import { useRouter } from "next/navigation";
import { devLoginAs } from "@/lib/utils/dev-auth";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { cn } from "@/lib/utils";

const DEV_MODE = process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";

const DEV_ROLES = [
    { role: "ADMIN", label: "Admin", portal: "/admin" },
    { role: "BUYER", label: "Buyer", portal: "/dashboard" },
    { role: "SELLER", label: "Seller", portal: "/agent" },
] as const;

export function DevQuickLogin() {
    const router = useRouter();

    if (!DEV_MODE) return null;

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-end gap-2">
            <span
                className={cn(
                    authLabelVariants({ tier: "label" }),
                    "text-sidebar-text inline-flex items-center gap-1.5",
                )}
            >
                <span
                    aria-hidden="true"
                    className="bg-warning size-1.5 rounded-full"
                />
                Dev mode
            </span>

            <span aria-hidden="true" className="bg-sidebar-border h-3 w-px" />

            {DEV_ROLES.map((entry) => (
                <button
                    key={entry.role}
                    type="button"
                    aria-label={`Dev quick login as ${entry.label}`}
                    onClick={() => {
                        devLoginAs(entry.role);
                        router.push(entry.portal);
                    }}
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        "border-sidebar-border text-sidebar-text hover:text-text-inverse hover:border-highlight/40 focus-visible:ring-highlight ease-smooth rounded-full border px-2 py-0.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                    )}
                >
                    {entry.label}
                </button>
            ))}
        </div>
    );
}

DevQuickLogin.displayName = "DevQuickLogin";

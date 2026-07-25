"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { devLoginAs } from "@/lib/utils/dev-auth";

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
        <div className="border-sidebar-border bg-sidebar/60 mx-auto flex w-full max-w-96 flex-col gap-2 rounded-xl border p-3 backdrop-blur-md">
            <p className="text-sidebar-text text-center font-mono text-[10px] tracking-[0.16em] uppercase">
                Dev mode · quick login
            </p>
            <div className="grid grid-cols-3 gap-2">
                {DEV_ROLES.map((entry) => (
                    <Button
                        key={entry.role}
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            devLoginAs(entry.role);
                            router.push(entry.portal);
                        }}
                    >
                        {entry.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}

DevQuickLogin.displayName = "DevQuickLogin";

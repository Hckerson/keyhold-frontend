"use client";

import { LogOut } from "lucide-react";
import {
    SIDEBAR_ICON_SLOT,
    SIDEBAR_ROW,
    SIDEBAR_ROW_COLLAPSED,
    SIDEBAR_ROW_IDLE,
} from "@/lib/config/sidebar";
import { SidebarUserCard } from "@/components/layout/sidebar-user-card";
import type { AuthUser } from "@/lib/types/auth";
import { cn } from "@/lib/utils";

export function SidebarFooter({
    user,
    onLogout,
    signingOut = false,
    collapsed,
}: {
    user?: AuthUser | null;
    onLogout?: () => void;
    signingOut?: boolean;
    collapsed: boolean;
}) {
    return (
        <div
            className={cn(
                "border-sidebar-border flex shrink-0 flex-col gap-0.5 border-t py-1.5",
                collapsed ? "px-1.5" : "px-2",
            )}
        >
            {user && <SidebarUserCard user={user} collapsed={collapsed} />}

            {onLogout && (
                <button
                    type="button"
                    onClick={onLogout}
                    disabled={signingOut}
                    aria-busy={signingOut}
                    title={collapsed ? "Log out" : undefined}
                    aria-label="Log out"
                    className={cn(
                        SIDEBAR_ROW,
                        SIDEBAR_ROW_IDLE,
                        collapsed && SIDEBAR_ROW_COLLAPSED,
                        "disabled:pointer-events-none disabled:opacity-45",
                    )}
                >
                    <span className={SIDEBAR_ICON_SLOT}>
                        <LogOut size={12} strokeWidth={1.5} />
                    </span>
                    {!collapsed && <span>Log out</span>}
                </button>
            )}
        </div>
    );
}

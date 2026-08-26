"use client";

import { LogOut } from "lucide-react";
import { rowBase, rowIconSlot, rowIdle } from "@/components/layout/sidebar-nav";
import type { AuthUser } from "@/lib/types/auth";
import { cn, initialsOf } from "@/lib/utils";

function UserCard({ user, collapsed }: { user: AuthUser; collapsed: boolean }) {
    return (
        <div
            className={cn(
                "flex h-11 items-center gap-2 rounded-lg px-2",
                collapsed && "justify-center px-0",
            )}
        >
            <span className={cn(rowIconSlot, "h-11")}>
                <span className="bg-sidebar-active text-sidebar-text-active ring-highlight/25 grid size-6 place-items-center rounded-full font-mono text-[10px] font-semibold ring-1">
                    {initialsOf(user.name)}
                </span>
                <span className="bg-success ring-sidebar absolute right-0 bottom-2 size-1.5 rounded-full ring-2" />
            </span>
            {!collapsed && (
                <div className="min-w-0 flex-1">
                    <p className="text-sidebar-text-active truncate text-xs font-medium">
                        {user.name}
                    </p>
                    <p className="rail-label mt-0.5 truncate">{user.role}</p>
                </div>
            )}
        </div>
    );
}

export function SidebarFooter({
    user,
    onLogout,
    collapsed,
}: {
    user?: AuthUser | null;
    onLogout?: () => void;
    collapsed: boolean;
}) {
    return (
        <div className="border-sidebar-border flex shrink-0 flex-col gap-0.5 border-t px-2 py-1.5">
            {user && <UserCard user={user} collapsed={collapsed} />}

            {onLogout && (
                <button
                    type="button"
                    onClick={onLogout}
                    title={collapsed ? "Log out" : undefined}
                    aria-label="Log out"
                    className={cn(
                        rowBase,
                        rowIdle,
                        collapsed && "justify-center px-0",
                    )}
                >
                    <span className={rowIconSlot}>
                        <LogOut size={12} strokeWidth={1.5} />
                    </span>
                    {!collapsed && <span>Log out</span>}
                </button>
            )}
        </div>
    );
}

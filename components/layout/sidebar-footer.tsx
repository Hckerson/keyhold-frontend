"use client";

import { LogOut } from "lucide-react";
import { rowBase, rowIdle } from "@/components/layout/sidebar-nav";
import type { AuthUser } from "@/lib/types/auth";
import { cn, initialsOf } from "@/lib/utils";

function UserCard({ user, collapsed }: { user: AuthUser; collapsed: boolean }) {
    const roleLabel = user.role.charAt(0) + user.role.slice(1).toLowerCase();
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-xl p-2",
                collapsed
                    ? "justify-center"
                    : "bg-sidebar-active/40 ring-sidebar-border ring-1",
            )}
        >
            <div className="relative shrink-0">
                <div className="from-highlight/30 to-highlight/10 text-sidebar-text-active ring-highlight/20 grid size-8 place-items-center rounded-full bg-linear-to-br text-xs font-semibold ring-1">
                    {initialsOf(user.name)}
                </div>
                <span className="bg-success ring-sidebar absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2" />
            </div>
            {!collapsed && (
                <div className="min-w-0 flex-1">
                    <p className="text-sidebar-text-active truncate text-sm font-medium">
                        {user.name}
                    </p>
                    <p className="text-sidebar-text truncate text-xs">
                        {roleLabel}
                    </p>
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
        <div className="border-sidebar-border flex flex-col gap-1 border-t p-3">
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
                        collapsed ? "justify-center px-0" : "px-3",
                    )}
                >
                    <LogOut
                        size={16}
                        strokeWidth={1.5}
                        className="ease-smooth shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    {!collapsed && <span>Log out</span>}
                </button>
            )}
        </div>
    );
}

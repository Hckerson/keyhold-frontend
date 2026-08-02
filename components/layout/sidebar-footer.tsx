"use client";

import { LogOut } from "lucide-react";
import { rowBase, rowIdle } from "@/components/layout/sidebar-nav";
import type { AuthUser } from "@/lib/types/auth";
import { cn, initialsOf } from "@/lib/utils";

function UserCard({ user, collapsed }: { user: AuthUser; collapsed: boolean }) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 rounded-lg p-1.5",
                collapsed
                    ? "justify-center"
                    : "bg-sidebar-active/40 ring-sidebar-border ring-1",
            )}
        >
            <div className="relative shrink-0">
                <div className="from-highlight/30 to-highlight/10 text-sidebar-text-active ring-highlight/20 grid size-7 place-items-center rounded-full bg-linear-to-br text-xs font-semibold ring-1">
                    {initialsOf(user.name)}
                </div>
                <span className="bg-success ring-sidebar absolute -right-0.5 -bottom-0.5 size-2 rounded-full ring-2" />
            </div>
            {!collapsed && (
                <div className="min-w-0 flex-1">
                    <p className="text-sidebar-text-active truncate text-xs font-medium">
                        {user.name}
                    </p>
                    <p className="text-sidebar-text-muted text-caption mt-0.5 truncate tracking-[0.14em] uppercase">
                        {user.role}
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
        <div className="border-sidebar-border flex flex-col gap-0.5 border-t p-2">
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
                        collapsed ? "justify-center px-0" : "px-2",
                    )}
                >
                    <LogOut
                        size={14}
                        strokeWidth={1.5}
                        className="ease-smooth shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    {!collapsed && <span>Log out</span>}
                </button>
            )}
        </div>
    );
}

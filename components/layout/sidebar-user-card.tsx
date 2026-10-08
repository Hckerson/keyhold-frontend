import { SIDEBAR_ICON_SLOT, SIDEBAR_ROW_COLLAPSED } from "@/lib/config/sidebar";
import type { AuthUser } from "@/lib/types/auth";
import { cn, initialsOf } from "@/lib/utils";

export interface SidebarUserCardProps {
    user: AuthUser;
    collapsed: boolean;
}

export function SidebarUserCard({ user, collapsed }: SidebarUserCardProps) {
    return (
        <div
            className={cn(
                "flex h-11 items-center gap-2 rounded-lg px-2",
                collapsed && SIDEBAR_ROW_COLLAPSED,
            )}
        >
            <span className={cn(SIDEBAR_ICON_SLOT, "h-11")}>
                <span className="bg-sidebar-active text-sidebar-text-active ring-accent-soft/25 grid size-6 place-items-center rounded-full font-mono text-[10px] font-semibold ring-1">
                    {initialsOf(user.name)}
                </span>
                <span className="bg-accent ring-sidebar absolute right-0 bottom-2 size-1.5 rounded-full ring-2" />
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

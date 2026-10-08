import type { SidebarNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface SidebarRowValueProps {
    item: SidebarNavItem;
}

export function SidebarRowValue({ item }: SidebarRowValueProps) {
    if (item.state) {
        return (
            <span
                className={cn(
                    "shrink-0 font-mono text-[10px] tabular-nums",
                    item.state === "active"
                        ? "text-accent-soft"
                        : "text-sidebar-text-muted",
                )}
            >
                {item.count ?? "—"}
            </span>
        );
    }

    if (item.badge === undefined) return null;

    return (
        <span className="bg-accent-soft/15 text-accent-soft shrink-0 rounded-full px-1.5 font-mono text-[10px] font-medium tabular-nums">
            {item.badge}
        </span>
    );
}

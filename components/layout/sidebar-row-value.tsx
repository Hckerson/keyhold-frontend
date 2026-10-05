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
                        ? "text-highlight"
                        : "text-sidebar-text-muted",
                )}
            >
                {item.count ?? "—"}
            </span>
        );
    }

    if (item.badge === undefined) return null;

    return (
        <span className="bg-highlight/15 text-highlight shrink-0 rounded-full px-1.5 font-mono text-[10px] font-medium tabular-nums">
            {item.badge}
        </span>
    );
}

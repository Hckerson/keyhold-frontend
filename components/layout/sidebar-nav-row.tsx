import Link from "next/link";
import { SidebarRowValue } from "@/components/layout/sidebar-row-value";
import {
    SIDEBAR_ICON_SLOT,
    SIDEBAR_ROW,
    SIDEBAR_ROW_COLLAPSED,
    SIDEBAR_ROW_IDLE,
    SIDEBAR_STATION_DISC,
    SIDEBAR_STATION_LABEL,
} from "@/lib/config/sidebar";
import type { SidebarNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface SidebarNavRowProps {
    item: SidebarNavItem;
    active: boolean;
    collapsed: boolean;
    segmentAbove?: string;
    segmentBelow?: string;
}

export function SidebarNavRow({
    item,
    active,
    collapsed,
    segmentAbove,
    segmentBelow,
}: SidebarNavRowProps) {
    const Icon = item.icon;

    const className = cn(
        SIDEBAR_ROW,
        collapsed && SIDEBAR_ROW_COLLAPSED,
        active && "bg-sidebar-active text-sidebar-text-active",
        !active && (item.href ? SIDEBAR_ROW_IDLE : "text-sidebar-text-muted"),
    );

    const content = (
        <>
            <span className={SIDEBAR_ICON_SLOT}>
                {segmentAbove && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "absolute top-0 left-1/2 h-1.5 w-px -translate-x-1/2",
                            segmentAbove,
                        )}
                    />
                )}
                {segmentBelow && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            "absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2",
                            segmentBelow,
                        )}
                    />
                )}
                <span
                    className={cn(
                        "relative grid size-6 place-items-center rounded-full",
                        item.state &&
                            `border ${SIDEBAR_STATION_DISC[item.state]}`,
                    )}
                >
                    <Icon size={12} strokeWidth={1.5} />
                </span>
            </span>

            {!collapsed && (
                <span
                    className={cn(
                        "min-w-0 flex-1 truncate",
                        item.state && SIDEBAR_STATION_LABEL[item.state],
                    )}
                >
                    {item.label}
                </span>
            )}
            {!collapsed && <SidebarRowValue item={item} />}
        </>
    );

    if (!item.href) {
        return (
            <div
                title={collapsed ? item.label : undefined}
                className={className}
            >
                {content}
            </div>
        );
    }

    return (
        <Link
            href={item.href}
            title={collapsed ? item.label : undefined}
            aria-current={active ? "page" : undefined}
            className={className}
        >
            {content}
        </Link>
    );
}

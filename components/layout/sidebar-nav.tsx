"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: number | string;
}

export interface SidebarSection {
    label?: string;
    items: SidebarNavItem[];
}

export const rowBase =
    "group relative flex h-8 items-center gap-2 rounded-md text-xs transition-colors duration-200 ease-smooth";
export const rowIdle =
    "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active";

function NavLink({
    item,
    active,
    collapsed,
}: {
    item: SidebarNavItem;
    active: boolean;
    collapsed: boolean;
}) {
    const Icon = item.icon;
    return (
        <Link
            href={item.href}
            title={collapsed ? item.label : undefined}
            aria-current={active ? "page" : undefined}
            className={cn(
                rowBase,
                collapsed ? "justify-center px-0" : "px-2",
                active
                    ? "bg-sidebar-active text-sidebar-text-active ring-highlight/15 font-medium ring-1 ring-inset"
                    : rowIdle,
            )}
        >
            {active && (
                <span className="bg-highlight shadow-highlight/60 absolute top-1/2 left-0 h-4 w-0.75 -translate-y-1/2 rounded-r-full shadow-[0_0_12px_0]" />
            )}
            <Icon
                size={14}
                strokeWidth={1.5}
                className={cn(
                    "ease-smooth shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                    active && "text-highlight",
                )}
            />
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge !== undefined && (
                <span className="bg-highlight/15 text-highlight text-caption ml-auto rounded-full px-1.5 py-0.5 font-medium tabular-nums">
                    {item.badge}
                </span>
            )}
        </Link>
    );
}

export function SidebarNav({
    sections,
    activeHref,
    collapsed,
}: {
    sections: SidebarSection[];
    activeHref?: string;
    collapsed: boolean;
}) {
    return (
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 py-2">
            {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-0.5">
                    {section.label &&
                        (collapsed ? (
                            index > 0 && (
                                <div className="bg-sidebar-border mx-auto my-1 h-px w-5" />
                            )
                        ) : (
                            <p className="text-sidebar-text-muted text-caption px-2 pb-0.5 font-medium tracking-[0.14em] uppercase">
                                {section.label}
                            </p>
                        ))}
                    {section.items.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            active={item.href === activeHref}
                            collapsed={collapsed}
                        />
                    ))}
                </div>
            ))}
        </nav>
    );
}

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
    "group relative flex h-9 items-center gap-3 rounded-lg text-sm transition-colors duration-200 ease-smooth";
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
                collapsed ? "justify-center px-0" : "px-3",
                active
                    ? "bg-sidebar-active text-sidebar-text-active ring-highlight/15 ring-1 ring-inset"
                    : rowIdle,
            )}
        >
            {active && (
                <span className="bg-highlight shadow-highlight/60 absolute top-1/2 left-0 h-5 w-0.75 -translate-y-1/2 rounded-r-full shadow-[0_0_12px_0]" />
            )}
            <Icon
                size={16}
                strokeWidth={1.5}
                className={cn(
                    "ease-smooth shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                    active && "text-highlight",
                )}
            />
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge !== undefined && (
                <span className="bg-highlight/15 text-highlight ml-auto rounded-full px-2 py-0.5 text-xs font-medium">
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
        <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
            {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-1">
                    {section.label &&
                        (collapsed ? (
                            index > 0 && (
                                <div className="bg-sidebar-border mx-auto my-1 h-px w-5" />
                            )
                        ) : (
                            <p className="text-sidebar-text-muted text-caption px-3 pb-1 font-medium tracking-[0.14em] uppercase">
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

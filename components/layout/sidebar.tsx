"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { LogoChip } from "@/components/brand/logo-chip";
import {
    SidebarNav,
    type SidebarSection,
} from "@/components/layout/sidebar-nav";
import { SidebarFooter } from "@/components/layout/sidebar-footer";
import type { AuthUser } from "@/lib/types/auth";
import { cn } from "@/lib/utils";

export type {
    SidebarNavItem,
    SidebarSection,
} from "@/components/layout/sidebar-nav";

export interface SidebarProps {
    brand: { full: string; tagline?: string };
    sections: SidebarSection[];
    user?: AuthUser | null;
    onLogout?: () => void;
    className?: string;
}

function Brand({
    brand,
    collapsed,
}: {
    brand: SidebarProps["brand"];
    collapsed: boolean;
}) {
    return (
        <div
            className={cn(
                "border-sidebar-border relative flex h-14 items-center border-b",
                collapsed ? "justify-center px-0" : "gap-2 px-3",
            )}
        >
            <LogoChip tone="dark" size="sm" />
            {!collapsed && (
                <div className="min-w-0">
                    <p className="text-sidebar-text-active font-display truncate text-sm leading-none font-light">
                        {brand.full}
                    </p>
                    {brand.tagline && (
                        <p className="text-highlight/80 text-caption mt-0.5 tracking-[0.16em] uppercase">
                            {brand.tagline}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export function Sidebar({
    brand,
    sections,
    user,
    onLogout,
    className,
}: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const activeHref = useMemo(() => {
        return sections
            .flatMap((section) => section.items)
            .filter(
                (item) =>
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`),
            )
            .sort((a, b) => b.href.length - a.href.length)[0]?.href;
    }, [sections, pathname]);

    return (
        <aside
            className={cn(
                "bg-sidebar border-sidebar-border ease-smooth relative flex h-screen shrink-0 flex-col border-r transition-[width] duration-300",
                collapsed ? "w-12" : "w-52",
                className,
            )}
        >
            <div
                aria-hidden="true"
                className="from-sidebar-text-active/5 pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent"
            />
            <div
                aria-hidden="true"
                className="via-highlight/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
            />

            <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-pressed={collapsed}
                className="border-sidebar-border bg-sidebar text-sidebar-text hover:text-highlight hover:border-highlight/40 ease-smooth absolute top-20 -right-3 z-50 grid size-5 -translate-y-1/2 place-items-center rounded-full border shadow-md transition-colors duration-200"
            >
                <ChevronLeft
                    size={12}
                    strokeWidth={2}
                    className={cn(
                        "ease-smooth transition-transform duration-300",
                        collapsed && "rotate-180",
                    )}
                />
            </button>

            <Brand brand={brand} collapsed={collapsed} />

            <SidebarNav
                sections={sections}
                activeHref={activeHref}
                collapsed={collapsed}
            />

            <SidebarFooter
                user={user}
                onLogout={onLogout}
                collapsed={collapsed}
            />
        </aside>
    );
}

Sidebar.displayName = "Sidebar";

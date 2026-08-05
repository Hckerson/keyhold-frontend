"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { LogoChip } from "@/components/brand/logo-chip";
import {
    SidebarNav,
    type SidebarSection,
} from "@/components/layout/sidebar-nav";
import { SidebarStatus } from "@/components/layout/sidebar-status";
import { SidebarFooter } from "@/components/layout/sidebar-footer";
import type { AuthUser, JourneyStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export type {
    SidebarNavItem,
    SidebarSection,
} from "@/components/layout/sidebar-nav";

export interface SidebarProps {
    brand: { full: string; tagline?: string };
    sections: SidebarSection[];
    status?: JourneyStatus;
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
                "border-sidebar-border flex h-14 shrink-0 items-center border-b",
                collapsed ? "justify-center px-0" : "gap-2 px-3",
            )}
        >
            <LogoChip tone="dark" size="sm" />
            {!collapsed && (
                <div className="min-w-0">
                    <p className="text-sidebar-text-active font-display truncate text-xs leading-none font-light">
                        {brand.full}
                    </p>
                    {brand.tagline && (
                        <p className="rail-label mt-1 truncate">
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
    status,
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
                    item.href !== undefined &&
                    (pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)),
            )
            .sort((a, b) => (b.href?.length ?? 0) - (a.href?.length ?? 0))[0]
            ?.href;
    }, [sections, pathname]);

    return (
        <aside
            className={cn(
                "bg-sidebar border-sidebar-border ease-smooth relative flex h-screen shrink-0 flex-col border-r transition-[width] duration-300",
                collapsed ? "w-12" : "w-52",
                className,
            )}
        >
            <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-pressed={collapsed}
                className="border-sidebar-border bg-sidebar text-sidebar-text hover:text-highlight hover:border-highlight/40 focus-visible:ring-highlight ease-smooth absolute top-7 -right-3 z-50 grid size-5 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <ChevronLeft
                    size={12}
                    strokeWidth={1.5}
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

            {status && !collapsed && <SidebarStatus status={status} />}

            <SidebarFooter
                user={user}
                onLogout={onLogout}
                collapsed={collapsed}
            />
        </aside>
    );
}

Sidebar.displayName = "Sidebar";

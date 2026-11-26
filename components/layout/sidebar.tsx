"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
    SidebarBrand,
    type SidebarBrandProps,
} from "@/components/layout/sidebar-brand";
import {
    SidebarDrawer,
    type SidebarDrawerProps,
} from "@/components/layout/sidebar-drawer";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SidebarStatus } from "@/components/layout/sidebar-status";
import { SidebarFooter } from "@/components/layout/sidebar-footer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import type { AuthUser, JourneyStatus, SidebarSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RAIL_QUERY } from "@/lib/constants";
import { SIDEBAR_PANEL } from "@/lib/config/sidebar";

export interface SidebarProps {
    brand: SidebarBrandProps["brand"];
    sections: SidebarSection[];
    status?: JourneyStatus | null;
    user?: AuthUser | null;
    onLogout?: () => void;
    signingOut?: boolean;
    open?: boolean;
    onClose?: () => void;
    finalFocus?: SidebarDrawerProps["finalFocus"];
    className?: string;
}

export function Sidebar({
    brand,
    sections,
    status,
    user,
    onLogout,
    signingOut,
    open = false,
    onClose,
    finalFocus,
    className,
}: SidebarProps) {
    const pathname = usePathname();
    const isRail = useMediaQuery(RAIL_QUERY);
    const [railCollapsed, setRailCollapsed] = useState(false);
    const collapsed = isRail && railCollapsed;

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

    const contents = (
        <>
            <SidebarBrand
                brand={brand}
                collapsed={collapsed}
                onClose={onClose}
            />

            <SidebarNav
                sections={sections}
                activeHref={activeHref}
                collapsed={collapsed}
            />

            {status && !collapsed && <SidebarStatus status={status} />}

            <SidebarFooter
                user={user}
                onLogout={onLogout}
                signingOut={signingOut}
                collapsed={collapsed}
            />
        </>
    );

    return (
        <>
            <aside
                className={cn(
                    SIDEBAR_PANEL,
                    "z-50 lg:visible lg:relative lg:z-auto lg:w-52 lg:shrink-0 lg:translate-x-0 lg:transition-[width]",
                    "invisible -translate-x-full",
                    collapsed && "lg:w-12",
                    className,
                )}
            >
                <button
                    type="button"
                    onClick={() => setRailCollapsed((value) => !value)}
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                    aria-pressed={collapsed}
                    className="border-sidebar-border bg-sidebar text-sidebar-text hover:text-accent-soft hover:border-accent-soft/40 focus-visible:ring-accent-soft ease-smooth absolute top-7 -right-3 z-50 hidden size-5 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none lg:grid"
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

                {contents}
            </aside>

            <SidebarDrawer
                open={open && !isRail}
                onClose={onClose}
                finalFocus={finalFocus}
            >
                {contents}
            </SidebarDrawer>
        </>
    );
}

Sidebar.displayName = "Sidebar";

"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
    SidebarBrand,
    type SidebarBrandProps,
} from "@/components/layout/sidebar-brand";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SidebarStatus } from "@/components/layout/sidebar-status";
import { SidebarFooter } from "@/components/layout/sidebar-footer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import type { AuthUser, JourneyStatus, SidebarSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RAIL_QUERY } from "@/lib/constants";

export interface SidebarProps {
    brand: SidebarBrandProps["brand"];
    sections: SidebarSection[];
    status?: JourneyStatus | null;
    user?: AuthUser | null;
    onLogout?: () => void;
    signingOut?: boolean;
    open?: boolean;
    onClose?: () => void;
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
    className,
}: SidebarProps) {
    const pathname = usePathname();
    const isRail = useMediaQuery(RAIL_QUERY);
    const [railCollapsed, setRailCollapsed] = useState(false);
    const collapsed = isRail && railCollapsed;

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) =>
            event.key === "Escape" && onClose?.();

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

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
        <>
            <div
                aria-hidden="true"
                onClick={onClose}
                className={cn(
                    "desk-hidden bg-text/50 ease-smooth fixed inset-0 z-40 backdrop-blur-[2px] transition-opacity duration-300",
                    open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
            />

            <aside
                className={cn(
                    "bg-sidebar border-sidebar-border ease-smooth fixed inset-y-0 left-0 z-50 flex h-screen w-60 flex-col border-r transition-[transform,visibility] duration-300",
                    "lg:visible lg:relative lg:z-auto lg:w-52 lg:shrink-0 lg:translate-x-0 lg:transition-[width]",
                    open
                        ? "visible translate-x-0"
                        : "invisible -translate-x-full",
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
            </aside>
        </>
    );
}

Sidebar.displayName = "Sidebar";

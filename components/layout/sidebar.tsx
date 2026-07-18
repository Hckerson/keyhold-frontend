"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LogOut, ChevronLeft, type LucideIcon } from "lucide-react";
import type { AuthUser } from "@/lib/types/auth";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

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

export interface SidebarProps {
    brand: { full: string; short: string; tagline?: string };
    sections: SidebarSection[];
    user?: AuthUser | null;
    onLogout?: () => void;
    className?: string;
}

const rowBase =
    "group relative flex h-10 items-center gap-3 rounded-lg text-sm transition-colors duration-200 ease-smooth";
const rowIdle =
    "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active";

function initialsOf(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/* --------------------------------- Brand --------------------------------- */

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
                "border-sidebar-border relative flex h-16 items-center border-b",
                collapsed ? "justify-center px-0" : "gap-3 px-4",
            )}
        >
            <div className="from-highlight/25 to-highlight/5 ring-highlight/25 grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br ring-1">
                <Building2
                    size={18}
                    strokeWidth={1.5}
                    className="text-highlight"
                />
            </div>
            {!collapsed && (
                <div className="min-w-0">
                    <p className="text-sidebar-text-active font-display truncate text-lg leading-none font-light">
                        {brand.full}
                    </p>
                    {brand.tagline && (
                        <p className="text-highlight/80 text-caption mt-1 tracking-[0.16em] uppercase">
                            {brand.tagline}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

/* -------------------------------- Nav link ------------------------------- */

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
                <span className="bg-highlight shadow-highlight/60 absolute top-1/2 left-0 h-6 w-0.75 -translate-y-1/2 rounded-r-full shadow-[0_0_12px_0]" />
            )}
            <Icon
                size={18}
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

/* ------------------------------- User card ------------------------------- */

function UserCard({ user, collapsed }: { user: AuthUser; collapsed: boolean }) {
    const roleLabel = user.role.charAt(0) + user.role.slice(1).toLowerCase();
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-xl p-2",
                collapsed
                    ? "justify-center"
                    : "bg-sidebar-active/40 ring-sidebar-border ring-1",
            )}
        >
            <div className="relative shrink-0">
                <div className="from-highlight/30 to-highlight/10 text-sidebar-text-active ring-highlight/20 grid size-9 place-items-center rounded-full bg-linear-to-br text-xs font-semibold ring-1">
                    {initialsOf(user.name)}
                </div>
                <span className="bg-success ring-sidebar absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2" />
            </div>
            {!collapsed && (
                <div className="min-w-0 flex-1">
                    <p className="text-sidebar-text-active truncate text-sm font-medium">
                        {user.name}
                    </p>
                    <p className="text-sidebar-text truncate text-xs">
                        {roleLabel}
                    </p>
                </div>
            )}
        </div>
    );
}

/* -------------------------------- Sidebar -------------------------------- */

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
                collapsed ? "w-16" : "w-60",
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
                className="border-sidebar-border bg-sidebar text-sidebar-text hover:text-highlight hover:border-highlight/40 ease-smooth absolute top-24 -right-3 z-50 grid size-6 -translate-y-1/2 place-items-center rounded-full border shadow-md transition-colors duration-200"
            >
                <ChevronLeft
                    size={14}
                    strokeWidth={2}
                    className={cn(
                        "ease-smooth transition-transform duration-300",
                        collapsed && "rotate-180",
                    )}
                />
            </button>

            <Brand brand={brand} collapsed={collapsed} />

            <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
                {sections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        {section.label &&
                            (collapsed ? (
                                index > 0 && (
                                    <div className="bg-sidebar-border mx-auto my-1 h-px w-5" />
                                )
                            ) : (
                                <p className="text-sidebar-text/60 text-caption px-3 pb-1 font-medium tracking-[0.14em] uppercase">
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

            <div className="border-sidebar-border flex flex-col gap-1 border-t p-3">
                {user && <UserCard user={user} collapsed={collapsed} />}

                {onLogout && (
                    <button
                        type="button"
                        onClick={onLogout}
                        title={collapsed ? "Log out" : undefined}
                        aria-label="Log out"
                        className={cn(
                            rowBase,
                            rowIdle,
                            collapsed ? "justify-center px-0" : "px-3",
                        )}
                    >
                        <LogOut
                            size={18}
                            strokeWidth={1.5}
                            className="ease-smooth shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                        {!collapsed && <span>Log out</span>}
                    </button>
                )}
            </div>
        </aside>
    );
}

Sidebar.displayName = "Sidebar";

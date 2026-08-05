"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { JourneyStationState } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
    label: string;
    icon: LucideIcon;
    href?: string;
    badge?: number | string;
    count?: number;
    state?: JourneyStationState;
}

export interface SidebarSection {
    label?: string;
    spine?: boolean;
    items: SidebarNavItem[];
}

export const rowBase =
    "group relative flex h-9 items-center gap-2 rounded-md text-xs transition-colors duration-200 ease-smooth";
export const rowIdle =
    "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active";
export const rowIconSlot =
    "relative flex h-9 w-6 shrink-0 items-center justify-center";

const stationDisc: Record<JourneyStationState, string> = {
    complete: "border-highlight/40 bg-sidebar text-highlight/70",
    active: "border-highlight bg-highlight/15 text-highlight",
    pending: "border-sidebar-border bg-sidebar text-sidebar-text-muted",
};

const stationLabel: Record<JourneyStationState, string> = {
    complete: "text-sidebar-text",
    active: "text-sidebar-text-active font-medium",
    pending: "text-sidebar-text-muted",
};

const segmentTone = (item: SidebarNavItem) =>
    item.state === "complete" ? "bg-highlight/40" : "bg-sidebar-border";

function RowValue({ item }: { item: SidebarNavItem }) {
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

function NavRow({
    item,
    active,
    collapsed,
    segmentAbove,
    segmentBelow,
}: {
    item: SidebarNavItem;
    active: boolean;
    collapsed: boolean;
    segmentAbove?: string;
    segmentBelow?: string;
}) {
    const Icon = item.icon;

    const className = cn(
        rowBase,
        collapsed ? "justify-center pr-0" : "pr-2",
        active && "bg-sidebar-active text-sidebar-text-active",
        !active && (item.href ? rowIdle : "text-sidebar-text-muted"),
    );

    const content = (
        <>
            <span className={rowIconSlot}>
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
                        item.state && `border ${stationDisc[item.state]}`,
                    )}
                >
                    <Icon size={12} strokeWidth={1.5} />
                </span>
            </span>

            {!collapsed && (
                <span
                    className={cn(
                        "min-w-0 flex-1 truncate",
                        item.state && stationLabel[item.state],
                    )}
                >
                    {item.label}
                </span>
            )}
            {!collapsed && <RowValue item={item} />}
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

function SectionHeader({
    section,
    collapsed,
    leading,
}: {
    section: SidebarSection;
    collapsed: boolean;
    leading: boolean;
}) {
    if (!section.label) return null;

    if (collapsed) {
        return leading ? null : (
            <div
                aria-hidden="true"
                className="bg-sidebar-border mx-auto my-1 h-px w-5"
            />
        );
    }

    const stage = section.spine
        ? section.items.findIndex((item) => item.state === "active") + 1
        : 0;

    return (
        <div className="flex h-6 items-center justify-between gap-2 pr-2 pl-1">
            <span className="rail-label">{section.label}</span>
            {stage > 0 && (
                <span className="text-highlight font-mono text-[10px] tabular-nums">
                    {stage}/{section.items.length}
                </span>
            )}
        </div>
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
        <nav className="scroll-y scroll-invert flex flex-1 flex-col gap-2 px-2 py-2">
            {sections.map((section, sectionIndex) => (
                <div
                    key={section.label ?? sectionIndex}
                    className={cn(
                        "flex flex-col",
                        section.spine ? "gap-0" : "gap-0.5",
                    )}
                >
                    <SectionHeader
                        section={section}
                        collapsed={collapsed}
                        leading={sectionIndex === 0}
                    />
                    {section.items.map((item, index) => (
                        <NavRow
                            key={item.href ?? item.label}
                            item={item}
                            active={
                                item.href !== undefined &&
                                item.href === activeHref
                            }
                            collapsed={collapsed}
                            segmentAbove={
                                section.spine && index > 0
                                    ? segmentTone(section.items[index - 1])
                                    : undefined
                            }
                            segmentBelow={
                                section.spine &&
                                index < section.items.length - 1
                                    ? segmentTone(item)
                                    : undefined
                            }
                        />
                    ))}
                </div>
            ))}
        </nav>
    );
}

SidebarNav.displayName = "SidebarNav";

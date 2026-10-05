"use client";

import { SidebarNavRow } from "@/components/layout/sidebar-nav-row";
import { SidebarSectionHeader } from "@/components/layout/sidebar-section-header";
import type { SidebarNavItem, SidebarSection } from "@/lib/types";
import { cn } from "@/lib/utils";

const segmentTone = (item: SidebarNavItem) =>
    item.state === "complete" ? "bg-highlight/40" : "bg-sidebar-border";

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
        <nav
            className={cn(
                "scroll-y scroll-invert flex flex-1 flex-col gap-2 py-2",
                collapsed ? "scroll-hidden px-1.5" : "px-2",
            )}
        >
            {sections.map((section, sectionIndex) => (
                <div
                    key={section.label ?? sectionIndex}
                    className={cn(
                        "flex flex-col",
                        section.spine ? "gap-0" : "gap-0.5",
                    )}
                >
                    <SidebarSectionHeader
                        section={section}
                        collapsed={collapsed}
                        leading={sectionIndex === 0}
                    />
                    {section.items.map((item, index) => (
                        <SidebarNavRow
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

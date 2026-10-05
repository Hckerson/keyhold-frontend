import type { SidebarSection } from "@/lib/types";

export interface SidebarSectionHeaderProps {
    section: SidebarSection;
    collapsed: boolean;
    leading: boolean;
}

export function SidebarSectionHeader({
    section,
    collapsed,
    leading,
}: SidebarSectionHeaderProps) {
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
        <div className="flex h-6 items-center justify-between gap-2 px-2">
            <span className="rail-label">{section.label}</span>
            {stage > 0 && (
                <span className="text-highlight font-mono text-[10px] tabular-nums">
                    {stage}/{section.items.length}
                </span>
            )}
        </div>
    );
}

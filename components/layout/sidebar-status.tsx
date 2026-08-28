import type { JourneyStatus } from "@/lib/types";

export function SidebarStatus({ status }: { status: JourneyStatus }) {
    return (
        <div className="border-sidebar-border shrink-0 border-t p-2">
            <div className="border-sidebar-border bg-sidebar-active/40 rounded-lg border p-2.5">
                <p className="rail-label">Now</p>
                <p className="text-sidebar-text-active mt-1 truncate text-xs font-semibold">
                    {status.title}
                </p>
                <p className="text-sidebar-text mt-0.5 line-clamp-2 text-xs">
                    {status.detail}
                </p>
            </div>
        </div>
    );
}

SidebarStatus.displayName = "SidebarStatus";

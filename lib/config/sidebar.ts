import type { JourneyStationState } from "@/lib/types";

export const SIDEBAR_ROW =
    "group relative flex h-9 items-center gap-2 rounded-md px-2 text-xs transition-colors duration-200 ease-smooth";
export const SIDEBAR_ROW_IDLE =
    "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active";
export const SIDEBAR_ROW_COLLAPSED = "w-9 justify-center px-0";
export const SIDEBAR_ICON_SLOT =
    "relative flex h-9 w-6 shrink-0 items-center justify-center";

export const SIDEBAR_STATION_DISC: Record<JourneyStationState, string> = {
    complete: "border-highlight/40 bg-sidebar text-highlight/70",
    active: "border-highlight bg-highlight/15 text-highlight",
    pending: "border-sidebar-border bg-sidebar text-sidebar-text-muted",
};

export const SIDEBAR_STATION_LABEL: Record<JourneyStationState, string> = {
    complete: "text-sidebar-text",
    active: "text-sidebar-text-active font-medium",
    pending: "text-sidebar-text-muted",
};

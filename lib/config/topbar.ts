import { PUBLIC_ROUTES } from "@/lib/constants";

export const TOPBAR_SEARCH = {
    route: PUBLIC_ROUTES.search,
    shortcutKey: "k",
    placeholder: "Jump to a page or search…",
    label: "Open the command palette",
} as const;

export const TOPBAR_BADGE_CEILING = 9;

export const TOPBAR_SETTINGS_SEGMENT = "/settings";

export const TOPBAR_ICON_BUTTON =
    "text-text-secondary hover:bg-background-muted hover:text-text focus-visible:ring-accent ease-smooth relative grid size-8 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

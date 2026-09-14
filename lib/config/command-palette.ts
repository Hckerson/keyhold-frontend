export const COMMAND_PALETTE = {
    shortcutKey: "k",
    label: "Command palette",
    placeholder: "Jump to a page or search properties…",
    destinations: "Go to",
    search: "Search",
    empty: "Nothing matches that.",
    dismiss: "Esc",
    here: "Here",
    listId: "command-palette-list",
    searchId: "command-palette-search",
    routeId: (href: string) => `command-palette-route:${href}`,
} as const;

export const COMMAND_SEARCH_PREFIX = "Search properties for";

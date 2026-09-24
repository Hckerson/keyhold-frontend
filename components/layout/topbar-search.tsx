"use client";

import { Search } from "lucide-react";
import { TOPBAR_SEARCH } from "@/lib/config/topbar";

export interface TopbarSearchProps {
    isAppleDevice: boolean;
    onOpen: () => void;
}

export function TopbarSearch({ isAppleDevice, onOpen }: TopbarSearchProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            aria-label={TOPBAR_SEARCH.label}
            aria-keyshortcuts={isAppleDevice ? "Meta+K" : "Control+K"}
            className="border-border bg-background-alt text-text-muted hover:border-border-dark hover:bg-background focus-visible:ring-accent ease-smooth flex h-8 min-w-0 items-center justify-center gap-2 rounded-md border px-2.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none md:w-64 md:justify-start"
        >
            <Search className="size-3 shrink-0" strokeWidth={1.5} />
            <span className="reading-only-inline min-w-0 flex-1 truncate text-left text-xs">
                {TOPBAR_SEARCH.placeholder}
            </span>
            <kbd className="border-border bg-background reading-only-inline shrink-0 rounded-xs border px-1 py-px font-mono text-[10px] leading-none tracking-wide select-none">
                {isAppleDevice ? "⌘" : "Ctrl "}K
            </kbd>
        </button>
    );
}

TopbarSearch.displayName = "TopbarSearch";

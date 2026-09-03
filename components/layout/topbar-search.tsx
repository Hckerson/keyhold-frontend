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
            className="hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-8 min-w-0 items-center gap-2 px-2.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
        >
            <Search
                size={12}
                strokeWidth={1.5}
                className="text-text-muted shrink-0"
            />
            <span className="text-text-muted reading-only-inline truncate text-xs">
                {TOPBAR_SEARCH.placeholder}
            </span>
            <kbd className="text-text-muted reading-only-inline ml-6 shrink-0 font-mono text-[10px] tracking-wide select-none">
                {isAppleDevice ? "⌘" : "Ctrl "}K
            </kbd>
        </button>
    );
}

TopbarSearch.displayName = "TopbarSearch";

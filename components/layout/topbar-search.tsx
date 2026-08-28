"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { TOPBAR_SEARCH } from "@/lib/config/topbar";

export function TopbarSearch() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [isAppleDevice, setIsAppleDevice] = useState(false);

    useEffect(() => {
        setIsAppleDevice(/Mac|iPhone|iPad/.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.key.toLowerCase() === TOPBAR_SEARCH.shortcutKey &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = query.trim();
        router.push(
            trimmed
                ? `${TOPBAR_SEARCH.route}?q=${encodeURIComponent(trimmed)}`
                : TOPBAR_SEARCH.route,
        );
    };

    return (
        <form
            onSubmit={submit}
            className="reading-only focus-within:bg-background ease-smooth h-8 items-center gap-2 px-2.5 transition-colors duration-200"
        >
            <Search
                size={14}
                strokeWidth={1.5}
                className="text-text-muted shrink-0"
            />
            <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) =>
                    event.key === "Escape" && inputRef.current?.blur()
                }
                placeholder={TOPBAR_SEARCH.placeholder}
                aria-label={TOPBAR_SEARCH.label}
                className="text-text placeholder:text-text-muted w-44 bg-transparent text-sm focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {!query && (
                <kbd className="text-text-muted shrink-0 font-mono text-[10px] tracking-wide select-none">
                    {isAppleDevice ? "⌘" : "Ctrl "}K
                </kbd>
            )}
        </form>
    );
}

TopbarSearch.displayName = "TopbarSearch";

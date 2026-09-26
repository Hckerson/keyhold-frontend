"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import type { CommandItem, NavRoute } from "@/lib/types";
import {
    COMMAND_PALETTE,
    COMMAND_SEARCH_PREFIX,
} from "@/lib/config/command-palette";
import { TOPBAR_SEARCH } from "@/lib/config/topbar";
import { matchRoutes } from "@/lib/utils/nav";
import { rovingIndex } from "@/lib/utils/roving";

const STEP: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

const APPLE_PLATFORM = /Mac|iPhone|iPad/;
const subscribe = () => () => {};

export function useCommandPalette(routes: NavRoute[]) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [openOn, setOpenOn] = useState(pathname);
    const [activeFor, setActiveFor] = useState({ query, open });
    const isAppleDevice = useSyncExternalStore(
        subscribe,
        () => APPLE_PLATFORM.test(navigator.userAgent),
        () => false,
    );

    if (openOn !== pathname) {
        setOpenOn(pathname);
        setOpen(false);
    }

    if (activeFor.query !== query || activeFor.open !== open) {
        setActiveFor({ query, open });
        setActive(0);
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.key.toLowerCase() === COMMAND_PALETTE.shortcutKey &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const go = useCallback(
        (href: string) => {
            setOpen(false);
            router.push(href);
        },
        [router],
    );

    const items = useMemo<CommandItem[]>(() => {
        const trimmed = query.trim();

        return [
            ...matchRoutes(routes, query).map((route) => ({
                id: COMMAND_PALETTE.routeId(route.href),
                label: route.label,
                icon: route.icon,
                badge: route.badge,
                here: pathname === route.href,
                run: () => go(route.href),
            })),
            {
                id: COMMAND_PALETTE.searchId,
                label: trimmed
                    ? `${COMMAND_SEARCH_PREFIX} “${trimmed}”`
                    : COMMAND_PALETTE.placeholder,
                icon: SlidersHorizontal,
                run: () =>
                    go(
                        trimmed
                            ? `${TOPBAR_SEARCH.route}?q=${encodeURIComponent(trimmed)}`
                            : TOPBAR_SEARCH.route,
                    ),
            },
        ];
    }, [routes, query, pathname, go]);

    const openWith = useCallback(() => {
        setQuery("");
        setOpen(true);
    }, []);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const delta = STEP[event.key];

            if (delta !== undefined) {
                event.preventDefault();
                setActive((current) =>
                    rovingIndex(current, delta, items.length),
                );
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                items[active]?.run();
            }
        },
        [items, active],
    );

    return {
        open,
        setOpen,
        openWith,
        query,
        setQuery,
        items,
        active,
        setActive,
        onKeyDown,
        isAppleDevice,
    };
}

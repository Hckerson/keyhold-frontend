"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { AuthUser } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";
import {
    ACCOUNT_MENU_ACTIONS,
    ACCOUNT_MENU_LABEL,
} from "@/lib/config/account-menu";
import { cn, initialsOf } from "@/lib/utils";

export interface TopbarAccountProps {
    user: AuthUser;
    settingsHref: string;
    onLogout?: () => void;
}

export function TopbarAccount({
    user,
    settingsHref,
    onLogout,
}: TopbarAccountProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) =>
            event.key === "Escape" && setOpen(false);

        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node))
                setOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("pointerdown", onPointerDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open]);

    const run = (id: string) => {
        setOpen(false);
        if (id === "logout") onLogout?.();
        else router.push(settingsHref);
    };

    return (
        <div ref={rootRef} className="relative shrink-0">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-label={ACCOUNT_MENU_LABEL}
                aria-haspopup="menu"
                aria-expanded={open}
                className="hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-8 items-center gap-1 rounded-full py-0 pr-1.5 pl-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    initials={initialsOf(user.name)}
                    className="ring-border ring-1"
                />
                <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={cn(
                        "text-text-muted ease-smooth transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label={ACCOUNT_MENU_LABEL}
                    className="border-border bg-background-alt animate-in fade-in zoom-in-95 z-popover absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border shadow-lg"
                >
                    <div className="border-border-light bg-background-muted border-b px-3 py-2">
                        <p className="text-text truncate text-xs font-semibold">
                            {user.name}
                        </p>
                        <p className="text-text-secondary truncate text-xs">
                            {user.email}
                        </p>
                    </div>

                    <div className="p-1">
                        {ACCOUNT_MENU_ACTIONS.map((action) => (
                            <button
                                key={action.id}
                                type="button"
                                role="menuitem"
                                onClick={() => run(action.id)}
                                className={cn(
                                    "hover:bg-background focus-visible:bg-background ease-smooth flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs transition-colors duration-200 focus-visible:outline-none",
                                    action.tone === "error"
                                        ? "text-error"
                                        : "text-text",
                                )}
                            >
                                <action.icon
                                    size={12}
                                    strokeWidth={1.5}
                                    className="shrink-0"
                                />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

TopbarAccount.displayName = "TopbarAccount";

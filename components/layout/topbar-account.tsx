"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { AuthUser } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";
import {
    Menu,
    MenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuTrigger,
} from "@/components/ui/menu";
import {
    ACCOUNT_MENU_ACTIONS,
    ACCOUNT_MENU_LABEL,
    type AccountMenuAction,
} from "@/lib/config/account-menu";
import { USER_ROLES } from "@/lib/config/user-tones";
import { initialsOf } from "@/lib/utils";
import { MANAGED_ROLE_BY_USER } from "@/lib/utils/to-user-segments";

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

    const run = (id: AccountMenuAction["id"]) => {
        if (id === "logout") onLogout?.();
        else router.push(settingsHref);
    };

    return (
        <Menu>
            <MenuTrigger
                aria-label={ACCOUNT_MENU_LABEL}
                className="group hover:bg-background-muted data-popup-open:bg-background-muted focus-visible:ring-accent ease-smooth flex h-9 shrink-0 items-center gap-2 rounded-md px-1 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none md:pr-2"
            >
                <Avatar
                    size="xs"
                    tone="accent"
                    elevated={false}
                    initials={initialsOf(user.name)}
                />
                <span className="reading-only-inline min-w-0 text-left">
                    <span className="text-text block max-w-32 truncate text-xs leading-tight font-medium">
                        {user.name}
                    </span>
                    <span className="text-text-muted block font-mono text-[10px] leading-tight tracking-wide uppercase">
                        {USER_ROLES[MANAGED_ROLE_BY_USER[user.role]].label}
                    </span>
                </span>
                <ChevronDown
                    className="text-text-muted ease-smooth size-3 transition-transform duration-200 group-data-popup-open:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </MenuTrigger>

            <MenuContent className="w-52">
                <MenuGroup>
                    <MenuGroupLabel className="border-border-light bg-background-muted border-b px-3 py-2">
                        <span className="text-text block truncate text-xs font-semibold">
                            {user.name}
                        </span>
                        <span className="text-text-secondary block truncate text-xs">
                            {user.email}
                        </span>
                    </MenuGroupLabel>
                    <div className="p-1">
                        {ACCOUNT_MENU_ACTIONS.map((action) => (
                            <MenuItem
                                key={action.id}
                                icon={action.icon}
                                tone={action.tone ?? "neutral"}
                                onClick={() => run(action.id)}
                            >
                                {action.label}
                            </MenuItem>
                        ))}
                    </div>
                </MenuGroup>
            </MenuContent>
        </Menu>
    );
}

TopbarAccount.displayName = "TopbarAccount";

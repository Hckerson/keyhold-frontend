import { LogOut, Settings, type LucideIcon } from "lucide-react";

export interface AccountMenuAction {
    id: "settings" | "logout";
    label: string;
    icon: LucideIcon;
    tone?: "error";
}

export const ACCOUNT_MENU_LABEL = "Account menu";

export const ACCOUNT_MENU_ACTIONS: AccountMenuAction[] = [
    { id: "settings", label: "Account settings", icon: Settings },
    { id: "logout", label: "Sign out", icon: LogOut, tone: "error" },
];

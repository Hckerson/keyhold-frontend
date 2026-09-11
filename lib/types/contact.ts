import type { LucideIcon } from "lucide-react";

export interface ContactRoute {
    id: string;
    label: string;
    detail: string;
    action: string;
    href: string;
    icon: LucideIcon;
    note?: string;
}

export interface ContactRouteGroup {
    id: string;
    heading: string;
    routes: ContactRoute[];
}

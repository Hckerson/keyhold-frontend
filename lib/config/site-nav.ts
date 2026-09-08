import { portalForRole } from "@/lib/constants";
import type { AuthUser } from "@/lib/types";

export interface SiteNavLink {
    label: string;
    href: string;
}

const PUBLIC_NAV: SiteNavLink[] = [
    { label: "Search", href: "/search" },
    { label: "Map", href: "/map" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const siteNavFor = (
    role: AuthUser["role"] | undefined,
): SiteNavLink[] =>
    role
        ? [
              { label: "Search", href: "/search" },
              { label: "Map", href: "/map" },
              { label: "Dashboard", href: portalForRole(role) },
          ]
        : PUBLIC_NAV;

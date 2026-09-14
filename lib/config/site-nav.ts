import { portalForRole, PUBLIC_ROUTES } from "@/lib/constants";
import type { AuthUser } from "@/lib/types";

export interface SiteNavLink {
    label: string;
    href: string;
}

const PUBLIC_NAV: SiteNavLink[] = [
    { label: "Search", href: PUBLIC_ROUTES.search },
    { label: "Map", href: "/map" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const siteNavFor = (
    role: AuthUser["role"] | undefined,
): SiteNavLink[] =>
    role
        ? [
              { label: "Search", href: PUBLIC_ROUTES.search },
              { label: "Map", href: "/map" },
              { label: "Dashboard", href: portalForRole(role) },
          ]
        : PUBLIC_NAV;

export interface SiteLinkColumn {
    heading: string;
    links: SiteNavLink[];
}

export const FOOTER_COLUMNS: readonly SiteLinkColumn[] = [
    {
        heading: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Journal", href: "/blog" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Help", href: "/help" },
            { label: "Search listings", href: PUBLIC_ROUTES.search },
            { label: "Create an account", href: "/signup" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Accessibility", href: "/accessibility" },
        ],
    },
];

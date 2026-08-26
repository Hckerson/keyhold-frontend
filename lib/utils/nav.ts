import type { SidebarSection } from "@/components/layout/sidebar-nav";
import type { NavRoute, TrailCrumb } from "@/lib/types";

export const routesFrom = (sections: SidebarSection[]): NavRoute[] =>
    sections
        .flatMap((section) => section.items)
        .flatMap((item) =>
            item.href === undefined
                ? []
                : [
                      {
                          label: item.label,
                          href: item.href,
                          icon: item.icon,
                          badge:
                              typeof item.badge === "number"
                                  ? item.badge
                                  : undefined,
                      },
                  ],
        );

const holds = (href: string, pathname: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

export interface TrailInput {
    pathname: string;
    routes: NavRoute[];
    rootLabel: string;
    rootHref: string;
}

export const trailFor = ({
    pathname,
    routes,
    rootLabel,
    rootHref,
}: TrailInput): TrailCrumb[] => {
    const branch = routes
        .filter(
            (route) => route.href !== rootHref && holds(route.href, pathname),
        )
        .sort((a, b) => b.href.length - a.href.length)[0];

    if (!branch)
        return [
            {
                label: rootLabel,
                href: rootHref,
                current: pathname === rootHref,
            },
        ];

    return [
        { label: rootLabel, href: rootHref, current: false },
        {
            label: branch.label,
            href: branch.href,
            current: pathname === branch.href,
        },
    ];
};

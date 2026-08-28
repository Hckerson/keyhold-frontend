import { describe, expect, it } from "vitest";
import { Bell, CalendarDays, LayoutDashboard } from "lucide-react";
import type { SidebarSection } from "@/lib/types";
import { matchRoutes, routesFrom, trailFor } from "@/lib/utils/nav";

const SECTIONS: SidebarSection[] = [
    {
        items: [
            { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        label: "Journey",
        spine: true,
        items: [
            {
                label: "Viewings",
                href: "/dashboard/viewings",
                icon: CalendarDays,
                count: 3,
            },
            { label: "Closing", icon: CalendarDays, state: "pending" },
        ],
    },
    {
        label: "Inbox",
        items: [
            {
                label: "Alerts",
                href: "/dashboard/alerts",
                icon: Bell,
                badge: 4,
            },
        ],
    },
];

const ROOT = { rootLabel: "Dashboard", rootHref: "/dashboard" };

const labels = (pathname: string) =>
    trailFor({ pathname, routes: routesFrom(SECTIONS), ...ROOT }).map(
        (crumb) => crumb.label,
    );

describe("routesFrom", () => {
    it("carries live badge counts through to the topbar", () => {
        expect(
            routesFrom(SECTIONS).find(
                (route) => route.href === "/dashboard/alerts",
            )?.badge,
        ).toBe(4);
    });

    it("omits nav items that are labels rather than destinations", () => {
        expect(routesFrom(SECTIONS).map((route) => route.href)).not.toContain(
            undefined,
        );
    });
});

describe("trailFor", () => {
    it("names the journey route the user is actually on, not the portal root", () => {
        expect(labels("/dashboard/viewings")).toEqual([
            "Dashboard",
            "Viewings",
        ]);
    });

    it("shows the portal root alone when the root is the current page", () => {
        expect(labels("/dashboard")).toEqual(["Dashboard"]);
    });

    it("leaves the nearest nav route linkable on a deeper detail route", () => {
        const crumbs = trailFor({
            pathname: "/dashboard/viewings/abc123",
            routes: routesFrom(SECTIONS),
            ...ROOT,
        });

        expect(crumbs.at(-1)).toEqual({
            label: "Viewings",
            href: "/dashboard/viewings",
            current: false,
        });
    });

    it("marks exactly one crumb as the current page", () => {
        const crumbs = trailFor({
            pathname: "/dashboard/alerts",
            routes: routesFrom(SECTIONS),
            ...ROOT,
        });

        expect(crumbs.filter((crumb) => crumb.current)).toHaveLength(1);
    });
});

describe("matchRoutes", () => {
    it("returns every destination when the palette query is empty", () => {
        expect(matchRoutes(routesFrom(SECTIONS), "  ")).toHaveLength(3);
    });

    it("ignores case when matching a destination label", () => {
        expect(
            matchRoutes(routesFrom(SECTIONS), "aLERT").map(
                (route) => route.label,
            ),
        ).toEqual(["Alerts"]);
    });

    it("matches a fragment anywhere in the label, not only its start", () => {
        expect(
            matchRoutes(routesFrom(SECTIONS), "gs").map((route) => route.label),
        ).toEqual(["Viewings"]);
    });

    it("returns nothing when no destination label contains the query", () => {
        expect(matchRoutes(routesFrom(SECTIONS), "escrow")).toEqual([]);
    });
});

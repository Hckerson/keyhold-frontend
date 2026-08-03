import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { ManagedUser } from "@/lib/types";

export const USER_ROLE_SEGMENTS: DonutSegment[] = [
    { name: "Buyers", value: 722, tone: "accent" },
    { name: "Agents", value: 435, tone: "info" },
    { name: "Admins", value: 90, tone: "neutral" },
];

export const USER_TIER_SEGMENTS: DonutSegment[] = [
    { name: "Standard", value: 845, tone: "neutral" },
    { name: "Premium", value: 315, tone: "info" },
    { name: "Platinum", value: 87, tone: "highlight" },
];

const sumSegments = (segments: DonutSegment[]) =>
    segments.reduce((total, segment) => total + segment.value, 0);

export const TOTAL_USERS = sumSegments(USER_ROLE_SEGMENTS);
export const ACTIVE_USERS = 1_102;

const PRIOR_MONTH_USERS = 1_174;

export const USER_GROWTH_SERIES = [
    980,
    1_015,
    1_060,
    1_108,
    PRIOR_MONTH_USERS,
    TOTAL_USERS,
];

export const USER_GROWTH_LABEL = `+${(
    ((TOTAL_USERS - PRIOR_MONTH_USERS) / PRIOR_MONTH_USERS) *
    100
).toFixed(1)}%`;

export const MANAGED_USERS: ManagedUser[] = [
    {
        id: "1",
        name: "Elena Vasquez",
        email: "elena.vasquez@meridian.re",
        role: "agent",
        tier: "platinum",
        joinDate: "2022-11-02",
        lastActive: "2026-08-03",
        status: "active",
        transactions: 28,
        volume: 41_200_000,
    },
    {
        id: "2",
        name: "Thomas Beaumont",
        email: "t.beaumont@northlake.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2021-04-19",
        lastActive: "2026-07-25",
        status: "active",
        transactions: 9,
        volume: 32_900_000,
    },
    {
        id: "3",
        name: "Sarah Chen",
        email: "sarah.chen@meridian.re",
        role: "agent",
        tier: "premium",
        joinDate: "2023-06-20",
        lastActive: "2026-08-02",
        status: "active",
        transactions: 15,
        volume: 24_600_000,
    },
    {
        id: "4",
        name: "Robert Astor",
        email: "robert.astor@astorgroup.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2023-03-10",
        lastActive: "2026-07-30",
        status: "active",
        transactions: 5,
        volume: 18_400_000,
    },
    {
        id: "5",
        name: "Nina Lindqvist",
        email: "nina.lindqvist@meridian.re",
        role: "agent",
        tier: "premium",
        joinDate: "2023-10-27",
        lastActive: "2026-06-30",
        status: "inactive",
        transactions: 7,
        volume: 9_300_000,
    },
    {
        id: "6",
        name: "Daniel Okafor",
        email: "d.okafor@kestrelcap.com",
        role: "buyer",
        tier: "premium",
        joinDate: "2024-09-08",
        lastActive: "2026-07-19",
        status: "active",
        transactions: 3,
        volume: 4_750_000,
    },
    {
        id: "7",
        name: "Grace Okonjo",
        email: "grace.okonjo@meridian.re",
        role: "agent",
        tier: "standard",
        joinDate: "2025-02-11",
        lastActive: "2026-07-31",
        status: "active",
        transactions: 4,
        volume: 3_200_000,
    },
    {
        id: "8",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2024-01-15",
        lastActive: "2026-07-28",
        status: "active",
        transactions: 2,
        volume: 1_850_000,
    },
    {
        id: "9",
        name: "Victor Hale",
        email: "victor.hale@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2025-06-03",
        lastActive: "2026-05-22",
        status: "inactive",
        transactions: 1,
        volume: 620_000,
    },
    {
        id: "10",
        name: "Marcus Sterling",
        email: "m.sterling@sterlingrealty.com",
        role: "agent",
        tier: "standard",
        joinDate: "2024-05-01",
        lastActive: "2026-04-12",
        status: "suspended",
        transactions: 0,
        volume: 0,
    },
    {
        id: "11",
        name: "Priya Raghavan",
        email: "priya.raghavan@meridian.re",
        role: "admin",
        tier: "premium",
        joinDate: "2022-08-14",
        lastActive: "2026-08-01",
        status: "active",
        transactions: 0,
        volume: 0,
    },
    {
        id: "12",
        name: "Amara Diallo",
        email: "amara.diallo@meridian.re",
        role: "admin",
        tier: "platinum",
        joinDate: "2021-09-30",
        lastActive: "2026-08-02",
        status: "active",
        transactions: 0,
        volume: 0,
    },
];

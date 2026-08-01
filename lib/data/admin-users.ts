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
    980, 1_015, 1_060, 1_108, PRIOR_MONTH_USERS, TOTAL_USERS,
];

export const USER_GROWTH_LABEL = `+${(
    ((TOTAL_USERS - PRIOR_MONTH_USERS) / PRIOR_MONTH_USERS) *
    100
).toFixed(1)}%`;

export const MANAGED_USERS: ManagedUser[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2024-01-15",
        status: "active",
        transactions: 2,
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        role: "agent",
        tier: "premium",
        joinDate: "2023-06-20",
        status: "active",
        transactions: 15,
    },
    {
        id: "3",
        name: "Robert Astor",
        email: "robert@example.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2023-03-10",
        status: "active",
        transactions: 5,
    },
    {
        id: "4",
        name: "Marcus Sterling",
        email: "marcus@example.com",
        role: "agent",
        tier: "standard",
        joinDate: "2024-05-01",
        status: "suspended",
        transactions: 0,
    },
];

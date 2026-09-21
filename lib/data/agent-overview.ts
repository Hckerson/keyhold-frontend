import {
    Home,
    Users,
    TrendingUp,
    FileSignature,
    UserPlus,
    CalendarPlus,
} from "lucide-react";
import { countByStage } from "@/lib/data/agent-leads";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { PipelineStage, PipelineSummary, QuickAction } from "@/lib/types";
import type { Lead } from "@/lib/types/lead";
import { formatCompactUsd } from "@/lib/utils";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { SellerStats } from "@/lib/validations/stats";
import type { Transaction } from "@/lib/validations/transaction";

export const agentQuickActions: QuickAction[] = [
    {
        id: "list-property",
        label: "List a property",
        href: "/agent/listings",
        icon: Home,
        tone: "accent",
    },
    {
        id: "add-lead",
        label: "Review enquiries",
        href: "/agent/leads",
        icon: UserPlus,
        tone: "info",
    },
    {
        id: "schedule-showing",
        label: "Open the calendar",
        href: "/agent/calendar",
        icon: CalendarPlus,
        tone: "highlight",
    },
];

export const agentStats = (
    seller: SellerStats | undefined,
    leads: Lead[],
): StatDatum[] => [
    {
        id: "listings",
        label: "Active listings",
        value: `${seller?.activeListings ?? 0}`,
        icon: Home,
        href: "/agent/listings",
        tone: "accent",
    },
    {
        id: "leads",
        label: "Open enquiries",
        value: `${countByStage(leads).pending}`,
        icon: Users,
        href: "/agent/leads",
        tone: "info",
    },
    {
        id: "offers",
        label: "Open offers",
        value: `${seller?.pendingOffers ?? 0}`,
        icon: FileSignature,
        href: "/agent/pipeline",
        tone: "warning",
    },
    {
        id: "closed",
        label: "Closed volume",
        value: formatCompactUsd(seller?.closedValue ?? 0),
        icon: TrendingUp,
        href: "/agent/analytics",
        tone: "success",
    },
];

const stageValue = (connections: ConnectionListItem[]) =>
    connections.reduce(
        (total, connection) => total + connection.property.price,
        0,
    );

const salesValue = (sales: Transaction[]) =>
    sales.reduce((total, sale) => total + sale.finalPrice, 0);

export const pipelineStagesFrom = (
    connections: ConnectionListItem[],
    sales: Transaction[],
): PipelineStage[] => {
    const enquiries = connections.filter(
        (connection) => connection.status === "PENDING",
    );
    const negotiating = connections.filter(
        (connection) =>
            connection.status === "ACCEPTED" && connection._count.offers > 0,
    );
    const inProgress = sales.filter((sale) => sale.status !== "COMPLETED");
    const closed = sales.filter((sale) => sale.status === "COMPLETED");

    return [
        {
            id: "leads",
            name: "Enquiries",
            count: enquiries.length,
            value: stageValue(enquiries),
            tone: "neutral",
        },
        {
            id: "offers",
            name: "Offers",
            count: negotiating.length,
            value: stageValue(negotiating),
            tone: "info",
        },
        {
            id: "pending",
            name: "Pending",
            count: inProgress.length,
            value: salesValue(inProgress),
            tone: "warning",
        },
        {
            id: "closed",
            name: "Closed",
            count: closed.length,
            value: salesValue(closed),
            tone: "success",
        },
    ];
};

export const pipelineSummaryFrom = (
    stages: PipelineStage[],
): PipelineSummary => ({
    label: "Total pipeline",
    value: stages.reduce((total, stage) => total + stage.value, 0),
    dealCount: stages.reduce((total, stage) => total + stage.count, 0),
    href: "/agent/pipeline",
});

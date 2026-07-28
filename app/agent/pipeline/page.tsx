"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import {
    DealRow,
    DEAL_STAGES,
    type Deal,
} from "@/components/dashboard/deal-row";
import { cn } from "@/lib/utils";

const initialDeals: Deal[] = [
    {
        id: "1",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        price: 3200000,
        stage: "offers",
        daysInStage: 5,
        daysToClose: 38,
        lastActivity: "Offer submitted 2 days ago",
        nextStep: "Buyer inspection tomorrow",
        notes: "Buyer is pre-approved with Wells Fargo and wants a 30-day close. Seller prefers a leaseback through September.",
    },
    {
        id: "2",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        price: 2950000,
        stage: "pending",
        daysInStage: 8,
        daysToClose: 21,
        lastActivity: "Counter-offer sent 3 days ago",
        nextStep: "Counter-offer review",
        notes: "Counter at $2.95M with seller covering half of closing costs. Appraisal ordered for the 26th.",
    },
    {
        id: "3",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        price: 4500000,
        stage: "pending",
        daysInStage: 3,
        daysToClose: 30,
        lastActivity: "Inspection completed yesterday",
        nextStep: "Appraisal completion",
        notes: "Inspection flagged roof flashing and a pool heater. Buyer requesting a $40K credit instead of repairs.",
    },
    {
        id: "4",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        price: 3800000,
        stage: "closed",
        daysInStage: 1,
        daysToClose: 0,
        lastActivity: "Funds recorded this morning",
        nextStep: "Send closing gift and review request",
        notes: "Clean cash close in 18 days. Client referred two colleagues relocating from Chicago.",
    },
    {
        id: "5",
        property: "12 Canyon Ridge",
        buyer: "Priya Raman",
        price: 6750000,
        stage: "leads",
        daysInStage: 2,
        daysToClose: 75,
        lastActivity: "Second viewing booked",
        nextStep: "Send comparable sales package",
        notes: "Relocating from New York in the fall. Needs a guest house and a garage for four cars.",
    },
    {
        id: "6",
        property: "77 Hillcrest Terrace",
        buyer: "Robert Lang",
        price: 1850000,
        stage: "leads",
        daysInStage: 11,
        daysToClose: 90,
        lastActivity: "Requested a valuation",
        nextStep: "Present pricing analysis",
        notes: "Considering listing his current home first. Sensitive to carrying two mortgages.",
    },
];

const nextStageOf = (stage: Deal["stage"]) => {
    const index = DEAL_STAGES.findIndex((item) => item.id === stage);
    return DEAL_STAGES[(index + 1) % DEAL_STAGES.length];
};

export default function AgentPipelinePage() {
    const [deals, setDeals] = useState(initialDeals);

    const openDeals = deals.filter((deal) => deal.stage !== "closed");
    const totalValue =
        openDeals.reduce((sum, deal) => sum + deal.price, 0) / 1_000_000;
    const avgDays = openDeals.length
        ? Math.round(
              openDeals.reduce((sum, deal) => sum + deal.daysInStage, 0) /
                  openDeals.length,
          )
        : 0;

    const columns = useMemo(
        () =>
            DEAL_STAGES.map((stage) => {
                const items = deals.filter((deal) => deal.stage === stage.id);
                return {
                    ...stage,
                    items,
                    value:
                        items.reduce((sum, deal) => sum + deal.price, 0) /
                        1_000_000,
                };
            }),
        [deals],
    );

    const advance = (id: string) =>
        setDeals((prev) =>
            prev.map((deal) =>
                deal.id === id
                    ? {
                          ...deal,
                          stage: nextStageOf(deal.stage).id,
                          daysInStage: 0,
                      }
                    : deal,
            ),
        );

    const health = [
        {
            label: "Avg Days in Stage",
            value: String(avgDays),
            caption: "Target: 45–60 days to close",
            tone: "text-text",
        },
        {
            label: "Open Pipeline Value",
            value: `$${totalValue.toFixed(1)}M`,
            caption: `from ${openDeals.length} open deals`,
            tone: "text-accent",
        },
        {
            label: "Close Rate",
            value: "68%",
            caption: "vs 52% industry avg",
            tone: "text-success",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Sales Pipeline"
                description={`${openDeals.length} open deals worth $${totalValue.toFixed(2)}M`}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {columns.map((column) => (
                    <section
                        key={column.id}
                        aria-label={`${column.label} column`}
                        className="bg-background-alt border-border-light flex flex-col gap-3 rounded-xl border p-3"
                    >
                        <div className="flex items-baseline justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                    {column.label}
                                </span>
                                <span className="bg-background text-text-secondary rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
                                    {column.items.length}
                                </span>
                            </div>
                            <span className="text-text-secondary text-xs tabular-nums">
                                ${column.value.toFixed(1)}M
                            </span>
                        </div>

                        {column.items.length > 0 ? (
                            column.items.map((deal) => (
                                <DealRow
                                    key={deal.id}
                                    deal={deal}
                                    actionLabel={`Move to ${nextStageOf(deal.stage).label}`}
                                    onAdvance={advance}
                                />
                            ))
                        ) : (
                            <p className="border-border text-text-muted rounded-lg border border-dashed px-3 py-6 text-center text-xs">
                                No deals in {column.label.toLowerCase()}
                            </p>
                        )}
                    </section>
                ))}
            </div>

            <Panel
                title="Pipeline Health"
                description="Key metrics and insights"
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    {health.map((metric) => (
                        <div key={metric.label}>
                            <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                {metric.label}
                            </p>
                            <p
                                className={cn(
                                    "mt-1 text-xs font-medium tabular-nums",
                                    metric.tone,
                                )}
                            >
                                {metric.value}
                            </p>
                            <p className="text-text-muted mt-0.5 text-xs">
                                {metric.caption}
                            </p>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

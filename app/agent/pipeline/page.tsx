import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { DealRow, type DealStage } from "@/components/dashboard/deal-row";

interface Deal {
    id: string;
    property: string;
    buyer: string;
    price: number;
    stage: DealStage;
    daysInStage: number;
    nextStep: string;
}

const deals: Deal[] = [
    {
        id: "1",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        price: 3200000,
        stage: "offer",
        daysInStage: 5,
        nextStep: "Buyer inspection tomorrow",
    },
    {
        id: "2",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        price: 2950000,
        stage: "negotiating",
        daysInStage: 8,
        nextStep: "Counter-offer review",
    },
    {
        id: "3",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        price: 4500000,
        stage: "inspection",
        daysInStage: 3,
        nextStep: "Appraisal completion",
    },
    {
        id: "4",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        price: 3800000,
        stage: "closing",
        daysInStage: 1,
        nextStep: "Final walkthrough",
    },
];

export default function AgentPipelinePage() {
    const totalValue = deals.reduce((sum, d) => sum + d.price, 0) / 1_000_000;
    const avgDays = Math.round(
        deals.reduce((sum, d) => sum + d.daysInStage, 0) / deals.length,
    );

    const health = [
        {
            label: "Avg Days in Pipeline",
            value: String(avgDays),
            caption: "Target: 45–60 days",
            tone: "text-text",
        },
        {
            label: "Total Pipeline Value",
            value: `$${totalValue.toFixed(1)}M`,
            caption: `from ${deals.length} deals`,
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
                description={`${deals.length} active deals worth $${totalValue.toFixed(2)}M`}
            />

            <div className="space-y-4">
                {deals.map((deal) => (
                    <DealRow
                        key={deal.id}
                        property={deal.property}
                        buyer={deal.buyer}
                        price={deal.price}
                        stage={deal.stage}
                        daysInStage={deal.daysInStage}
                        nextStep={deal.nextStep}
                    />
                ))}
            </div>

            <Panel
                title="Pipeline Health"
                description="Key metrics and insights"
            >
                <div className="grid gap-6 sm:grid-cols-3">
                    {health.map((metric) => (
                        <div key={metric.label}>
                            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                                {metric.label}
                            </p>
                            <p
                                className={cn(
                                    "font-display text-h5 mt-1 font-light tabular-nums",
                                    metric.tone,
                                )}
                            >
                                {metric.value}
                            </p>
                            <p className="text-text-muted mt-1 text-xs">
                                {metric.caption}
                            </p>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Deal {
    id: string;
    property: string;
    buyer: string;
    price: number;
    stage: "showing" | "offer" | "negotiating" | "inspection" | "closing";
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

const stages = [
    { id: "showing", label: "Showing", color: "text-info" },
    { id: "offer", label: "Offer", color: "text-warning" },
    { id: "negotiating", label: "Negotiating", color: "text-warning" },
    { id: "inspection", label: "Inspection", color: "text-warning" },
    { id: "closing", label: "Closing", color: "text-success" },
];

const getStageProgress = (stage: string) => {
    const stageIndex = stages.findIndex((s) => s.id === stage);
    return Math.round(((stageIndex + 1) / stages.length) * 100);
};

const getStatusColor = (stage: string) => {
    switch (stage) {
        case "showing":
            return "text-info bg-info/10 border-info/20";
        case "offer":
        case "negotiating":
        case "inspection":
            return "text-warning bg-warning/10 border-warning/20";
        case "closing":
            return "text-success bg-success/10 border-success/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (stage: string) => {
    return stages.find((s) => s.id === stage)?.label || "Unknown";
};

export default function AgentPipelinePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text font-light">
                    Sales Pipeline
                </h1>
                <p className="text-text-secondary mt-2">
                    {deals.length} active deals worth $
                    {deals.reduce((sum, d) => sum + d.price, 0) / 1000000} M
                </p>
            </div>

            <div className="space-y-4">
                {deals.map((deal) => (
                    <Card
                        key={deal.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-h6 text-text font-light">
                                            {deal.property}
                                        </h3>
                                        <p className="text-text-secondary mt-1 text-sm">
                                            {deal.buyer}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(deal.stage)}`}
                                    >
                                        {getStatusLabel(deal.stage)}
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-h5 text-accent font-light">
                                        ${(deal.price / 1000000).toFixed(2)}M
                                    </span>
                                    <span className="text-text-secondary text-xs">
                                        {deal.daysInStage} days in this stage
                                    </span>
                                </div>

                                <div>
                                    <div className="mb-2 flex justify-between">
                                        <span className="text-text-secondary text-xs">
                                            Deal Progress
                                        </span>
                                        <span className="text-accent text-xs font-medium">
                                            {getStageProgress(deal.stage)}%
                                        </span>
                                    </div>
                                    <div className="bg-primary-dark h-2 w-full overflow-hidden rounded-full">
                                        <div
                                            className="from-accent to-accent-dark h-full bg-linear-to-r transition-all"
                                            style={{
                                                width: `${getStageProgress(deal.stage)}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-text-secondary mt-2 flex justify-between text-xs">
                                        {stages.map((s) => (
                                            <span key={s.id}>{s.label}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-border border-t pt-3">
                                    <p className="text-sm">
                                        <span className="text-text-secondary">
                                            Next:{" "}
                                        </span>
                                        <span className="text-text font-medium">
                                            {deal.nextStep}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        className="h-9 flex-1 text-sm"
                                    >
                                        Update Status
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="h-9 flex-1 text-sm"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pipeline Health</CardTitle>
                    <CardDescription>Key metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <p className="text-text-secondary mb-2 text-sm">
                                Avg Days in Pipeline
                            </p>
                            <p className="text-h5 text-text font-light">
                                {Math.round(
                                    deals.reduce(
                                        (sum, d) => sum + d.daysInStage,
                                        0,
                                    ) / deals.length,
                                )}
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                Target: 45-60 days
                            </p>
                        </div>

                        <div>
                            <p className="text-text-secondary mb-2 text-sm">
                                Total Pipeline Value
                            </p>
                            <p className="text-h5 text-accent font-light">
                                $
                                {(
                                    deals.reduce((sum, d) => sum + d.price, 0) /
                                    1000000
                                ).toFixed(1)}
                                M
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                from {deals.length} deals
                            </p>
                        </div>

                        <div>
                            <p className="text-text-secondary mb-2 text-sm">
                                Close Rate
                            </p>
                            <p className="text-h5 text-success font-light">
                                68%
                            </p>
                            <p className="text-text-secondary mt-1 text-xs">
                                vs 52% industry avg
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

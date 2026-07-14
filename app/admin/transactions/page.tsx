import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Transaction {
    id: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: "pending" | "escrow" | "completed" | "failed";
    initiatedDate: string;
}

const transactions: Transaction[] = [
    {
        id: "1",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        agent: "Sarah Chen",
        price: 3200000,
        status: "escrow",
        initiatedDate: "2024-07-05",
    },
    {
        id: "2",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        agent: "Michael Rodriguez",
        price: 2950000,
        status: "pending",
        initiatedDate: "2024-07-10",
    },
    {
        id: "3",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        agent: "Jennifer Martinez",
        price: 4500000,
        status: "completed",
        initiatedDate: "2024-06-28",
    },
    {
        id: "4",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        agent: "David Williams",
        price: 3800000,
        status: "completed",
        initiatedDate: "2024-06-15",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "text-info bg-info/10 border-info/20";
        case "escrow":
            return "text-warning bg-warning/10 border-warning/20";
        case "completed":
            return "text-success bg-success/10 border-success/20";
        case "failed":
            return "text-error bg-error/10 border-error/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function AdminTransactionsPage() {
    const totalVolume = transactions.reduce((sum, t) => sum + t.price, 0);
    const completedCount = transactions.filter(
        (t) => t.status === "completed",
    ).length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Transactions
                    </h1>
                    <p className="text-text-secondary mt-2">
                        ${(totalVolume / 1000000).toFixed(1)}M volume •{" "}
                        {completedCount} completed
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="text-sm">
                        Filter
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        Export
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <Card
                        key={transaction.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-h6 text-text font-light">
                                                {transaction.property}
                                            </h3>
                                            <p className="text-text-secondary mt-1 text-sm">
                                                {transaction.buyer} →{" "}
                                                {transaction.agent}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(transaction.status)}`}
                                        >
                                            {getStatusLabel(transaction.status)}
                                        </span>
                                    </div>

                                    <div className="border-border grid grid-cols-1 gap-6 border-y py-4 md:grid-cols-3">
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Sale Price
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                $
                                                {(
                                                    transaction.price / 1000000
                                                ).toFixed(2)}
                                                M
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Commission (2.5%)
                                            </p>
                                            <p className="text-accent text-sm font-medium">
                                                $
                                                {(
                                                    (transaction.price *
                                                        0.025) /
                                                    1000
                                                ).toFixed(0)}
                                                K
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Initiated
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {transaction.initiatedDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6 flex flex-col gap-2">
                                    <Button
                                        variant="secondary"
                                        className="w-32 text-sm"
                                    >
                                        View Details
                                    </Button>
                                    {transaction.status !== "completed" &&
                                        transaction.status !== "failed" && (
                                            <Button
                                                variant="ghost"
                                                className="w-32 text-sm"
                                            >
                                                Monitor
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

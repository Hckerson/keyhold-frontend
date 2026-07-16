import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Viewing {
    id: string;
    address: string;
    date: string;
    time: string;
    agent: string;
    agentPhone: string;
    status: "confirmed" | "pending" | "cancelled";
}

const viewings: Viewing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        date: "2024-07-13",
        time: "3:00 PM",
        agent: "Sarah Chen",
        agentPhone: "(310) 555-0123",
        status: "confirmed",
    },
    {
        id: "2",
        address: "234 Oak Street, Bel Air, CA",
        date: "2024-07-15",
        time: "10:00 AM",
        agent: "Michael Rodriguez",
        agentPhone: "(310) 555-0456",
        status: "confirmed",
    },
    {
        id: "3",
        address: "567 Palm Drive, Malibu, CA",
        date: "2024-07-20",
        time: "2:00 PM",
        agent: "Jennifer Martinez",
        agentPhone: "(310) 555-0789",
        status: "pending",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "confirmed":
            return "text-success bg-success/10 border-success/20";
        case "pending":
            return "text-warning bg-warning/10 border-warning/20";
        case "cancelled":
            return "text-error bg-error/10 border-error/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function ViewingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Scheduled Viewings
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {
                            viewings.filter((v) => v.status === "confirmed")
                                .length
                        }{" "}
                        confirmed viewing
                        {viewings.filter((v) => v.status === "confirmed")
                            .length !== 1
                            ? "s"
                            : ""}
                    </p>
                </div>
                <Link href="/search" className="block">
                    <Button variant="primary">Find Properties</Button>
                </Link>
            </div>

            <div className="space-y-4">
                {viewings.length > 0 ? (
                    viewings.map((viewing) => (
                        <Card
                            key={viewing.id}
                            className="hover:border-accent/50 transition-colors"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start justify-between">
                                            <h3 className="text-h6 text-text flex-1 font-light">
                                                {viewing.address}
                                            </h3>
                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                                                    viewing.status,
                                                )}`}
                                            >
                                                {getStatusLabel(viewing.status)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            <div>
                                                <p className="text-text-secondary mb-1 text-sm">
                                                    Date & Time
                                                </p>
                                                <p className="text-text font-medium">
                                                    {new Date(
                                                        viewing.date,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday: "short",
                                                            month: "short",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                    {" at "}
                                                    {viewing.time}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-text-secondary mb-1 text-sm">
                                                    Agent
                                                </p>
                                                <p className="text-text font-medium">
                                                    {viewing.agent}
                                                </p>
                                                <p className="text-text-secondary mt-1 text-xs">
                                                    {viewing.agentPhone}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-text-secondary mb-3 text-sm">
                                                    Actions
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="secondary"
                                                        className="h-8 flex-1 text-xs"
                                                    >
                                                        Call Agent
                                                    </Button>
                                                    {viewing.status ===
                                                        "confirmed" && (
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 flex-1 text-xs"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-text-secondary mb-6">
                                No scheduled viewings yet
                            </p>
                            <Link href="/search" className="inline-block">
                                <Button variant="primary">
                                    Browse Properties
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>
                        Schedule your property viewings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <div className="bg-accent/20 text-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
                            1
                        </div>
                        <div>
                            <p className="text-text font-medium">
                                Browse Properties
                            </p>
                            <p className="text-text-secondary mt-1 text-sm">
                                Find properties you want to see
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-accent/20 text-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
                            2
                        </div>
                        <div>
                            <p className="text-text font-medium">
                                Request Viewing
                            </p>
                            <p className="text-text-secondary mt-1 text-sm">
                                Select a time that works for you
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-accent/20 text-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
                            3
                        </div>
                        <div>
                            <p className="text-text font-medium">
                                Get Confirmation
                            </p>
                            <p className="text-text-secondary mt-1 text-sm">
                                Agent confirms your appointment
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

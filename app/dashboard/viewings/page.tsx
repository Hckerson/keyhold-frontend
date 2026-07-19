import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { StepList, type Step } from "@/components/ui/step-list";
import { ViewingRow, type Viewing } from "@/components/dashboard/viewing-row";

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

const howItWorks: Step[] = [
    {
        title: "Browse Properties",
        description: "Find properties you want to see",
    },
    {
        title: "Request a Viewing",
        description: "Select a time that works for you",
    },
    {
        title: "Get Confirmation",
        description: "Your agent confirms the appointment",
    },
];

export default function ViewingsPage() {
    const confirmed = viewings.filter((v) => v.status === "confirmed").length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Scheduled Viewings"
                description={`${confirmed} confirmed viewing${
                    confirmed !== 1 ? "s" : ""
                }`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Find Properties
                        </Button>
                    </Link>
                }
            />

            {viewings.length > 0 ? (
                <div className="space-y-4">
                    {viewings.map((viewing) => (
                        <ViewingRow key={viewing.id} viewing={viewing} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={CalendarDays}
                    title="No scheduled viewings yet"
                    description="Viewings you book will appear here."
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Browse Properties
                            </Button>
                        </Link>
                    }
                />
            )}

            <Panel title="How It Works">
                <div className="space-y-4">
                    <p className="text-text-secondary text-sm">
                        Book a viewing in three simple steps.
                    </p>
                    <StepList steps={howItWorks} />
                </div>
            </Panel>
        </div>
    );
}

import { Plane, Castle, Sparkles, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard } from "@/components/ui/service-card";
import { StepList, type Step } from "@/components/ui/step-list";
import { ContactRow, type BadgeTone } from "@/components/dashboard/contact-row";

type Tier = "platinum" | "premium" | "vip";

interface VIPClient {
    id: string;
    name: string;
    tier: Tier;
    budget: number;
    deals: number;
    status: string;
    lastContact: string;
    nextAction: string;
}

const services = [
    {
        icon: Plane,
        title: "International Relocation",
        description: "Luxury property search worldwide",
    },
    {
        icon: Castle,
        title: "Estate Services",
        description: "Multi-property portfolio management",
    },
    {
        icon: Sparkles,
        title: "Concierge Support",
        description: "24/7 white-glove service",
    },
    {
        icon: Banknote,
        title: "Investment Advisory",
        description: "Real estate investment strategy",
    },
];

const vipClients: VIPClient[] = [
    {
        id: "1",
        name: "Robert Astor",
        tier: "platinum",
        budget: 50000000,
        deals: 3,
        status: "Active buyer",
        lastContact: "Today at 9:00 AM",
        nextAction: "Portfolio review tomorrow",
    },
    {
        id: "2",
        name: "Sophia Laurent",
        tier: "platinum",
        budget: 35000000,
        deals: 2,
        status: "Looking to sell",
        lastContact: "Yesterday",
        nextAction: "Schedule property appraisal",
    },
    {
        id: "3",
        name: "Marcus Sterling",
        tier: "premium",
        budget: 15000000,
        deals: 1,
        status: "Under contract",
        lastContact: "2 days ago",
        nextAction: "Closing coordination",
    },
];

const tierMeta: Record<Tier, { tone: BadgeTone; label: string }> = {
    platinum: { tone: "info", label: "Platinum" },
    premium: { tone: "neutral", label: "Premium" },
    vip: { tone: "success", label: "VIP" },
};

const tips: Step[] = [
    {
        title: "Monthly check-ins",
        description:
            "Schedule monthly check-ins with Platinum clients to discuss market trends and opportunities.",
    },
    {
        title: "Exclusive access",
        description:
            "Provide exclusive access to off-market and pocket listings.",
    },
    {
        title: "White-glove services",
        description:
            "Arrange home staging, photography, and design consultation.",
    },
    {
        title: "Coordinate specialists",
        description:
            "Loop in contractors, architects, and interior designers for client needs.",
    },
];

export default function VIPConciergePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="VIP Concierge"
                description="Manage your premium clients and white-glove services"
                action={
                    <Button variant="primary" size="sm">
                        Add VIP Client
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-h6 font-display text-text font-light">
                    Active VIP Clients
                </h2>
                {vipClients.map((client) => (
                    <ContactRow
                        key={client.id}
                        contact={{
                            name: client.name,
                            subtitle: client.status,
                            badge: tierMeta[client.tier],
                            fields: [
                                {
                                    label: "Budget",
                                    value: (
                                        <span className="tabular-nums">
                                            $
                                            {(
                                                client.budget / 1_000_000
                                            ).toFixed(1)}
                                            M
                                        </span>
                                    ),
                                },
                                {
                                    label: "Transactions",
                                    value: (
                                        <span className="tabular-nums">
                                            {client.deals} closed
                                        </span>
                                    ),
                                },
                                {
                                    label: "Last Contact",
                                    value: client.lastContact,
                                },
                            ],
                            nextAction: client.nextAction,
                        }}
                        actions={
                            <>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full sm:w-28"
                                >
                                    Call
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full sm:w-28"
                                >
                                    Email
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full sm:w-28"
                                >
                                    Profile
                                </Button>
                            </>
                        }
                    />
                ))}
            </div>

            <Panel
                title="Concierge Best Practices"
                description="Tips for VIP client retention"
            >
                <StepList steps={tips} />
            </Panel>
        </div>
    );
}

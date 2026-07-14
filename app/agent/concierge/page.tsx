import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface VIPClient {
    id: string;
    name: string;
    tier: "platinum" | "premium" | "vip";
    budget: number;
    deals: number;
    status: string;
    lastContact: string;
    nextAction: string;
}

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

const services = [
    {
        icon: "✈️",
        title: "International Relocation",
        description: "Luxury property search worldwide",
    },
    {
        icon: "🏰",
        title: "Estate Services",
        description: "Multi-property portfolio management",
    },
    {
        icon: "🎨",
        title: "Concierge Support",
        description: "24/7 white-glove service",
    },
    {
        icon: "💰",
        title: "Investment Advisory",
        description: "Real estate investment strategy",
    },
];

const getTierColor = (tier: string) => {
    switch (tier) {
        case "platinum":
            return "text-accent bg-accent/10 border-accent/20";
        case "premium":
            return "text-info bg-info/10 border-info/20";
        case "vip":
            return "text-success bg-success/10 border-success/20";
        default:
            return "text-text-secondary";
    }
};

const getTierLabel = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
};

export default function VIPConciergePagePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        VIP Concierge
                    </h1>
                    <p className="text-text-secondary mt-2">
                        Manage your premium clients and white-glove services
                    </p>
                </div>
                <Button variant="primary">Add VIP Client</Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services.map((service) => (
                    <Card
                        key={service.title}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 text-3xl">
                                    {service.icon}
                                </span>
                                <div>
                                    <h3 className="text-text text-sm font-medium">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-secondary mt-2 text-xs">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-h5 text-text font-light">
                    Active VIP Clients
                </h2>
                {vipClients.map((client) => (
                    <Card
                        key={client.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start gap-4">
                                        <div>
                                            <h3 className="text-h6 text-text font-light">
                                                {client.name}
                                            </h3>
                                            <p className="text-text-secondary mt-1 text-sm">
                                                {client.status}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${getTierColor(client.tier)}`}
                                        >
                                            {getTierLabel(client.tier)}
                                        </span>
                                    </div>

                                    <div className="border-border grid grid-cols-1 gap-6 border-y py-4 md:grid-cols-3">
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Budget
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                $
                                                {(
                                                    client.budget / 1000000
                                                ).toFixed(1)}
                                                M
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Transactions
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {client.deals} closed deal
                                                {client.deals !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Last Contact
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {client.lastContact}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-sm">
                                            <span className="text-text-secondary">
                                                Next Action:{" "}
                                            </span>
                                            <span className="text-text font-medium">
                                                {client.nextAction}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-6 flex flex-col gap-2">
                                    <Button
                                        variant="secondary"
                                        className="w-32 text-sm"
                                    >
                                        Call
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-32 text-sm"
                                    >
                                        Email
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-32 text-sm"
                                    >
                                        Profile
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Concierge Best Practices</CardTitle>
                    <CardDescription>
                        Tips for VIP client retention
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 font-medium">
                            1.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Schedule monthly check-ins with Platinum clients to
                            discuss market trends and opportunities
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 font-medium">
                            2.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Provide exclusive access to off-market listings and
                            pocket listings
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 font-medium">
                            3.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Arrange white-glove services including home staging,
                            photography, and design consultation
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 font-medium">
                            4.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Coordinate with specialists (contractors,
                            architects, interior designers) for client needs
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 font-medium">
                            5.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Send personalized market reports and investment
                            insights quarterly
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    budget: number;
    interests: string[];
    status: "hot" | "warm" | "cold";
    lastContact: string;
    nextAction: string;
}

const leads: Lead[] = [
    {
        id: "1",
        name: "Michael Johnson",
        email: "michael@example.com",
        phone: "(310) 555-0100",
        budget: 5000000,
        interests: ["Beverly Hills", "Modern", "4+ Beds"],
        status: "hot",
        lastContact: "2 hours ago",
        nextAction: "Schedule showing tomorrow",
    },
    {
        id: "2",
        name: "Patricia Brown",
        email: "patricia@example.com",
        phone: "(310) 555-0101",
        budget: 3500000,
        interests: ["Bel Air", "Traditional", "3 Beds"],
        status: "warm",
        lastContact: "1 day ago",
        nextAction: "Send property list",
    },
    {
        id: "3",
        name: "David Williams",
        email: "david@example.com",
        phone: "(310) 555-0102",
        budget: 2500000,
        interests: ["West Hollywood", "Condo", "2 Beds"],
        status: "warm",
        lastContact: "3 days ago",
        nextAction: "Follow up call",
    },
    {
        id: "4",
        name: "Jennifer Davis",
        email: "jennifer@example.com",
        phone: "(310) 555-0103",
        budget: 4000000,
        interests: ["Malibu", "Beachfront", "4+ Beds"],
        status: "cold",
        lastContact: "1 week ago",
        nextAction: "Nurture campaign",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "hot":
            return "text-success bg-success/10 border-success/20";
        case "warm":
            return "text-warning bg-warning/10 border-warning/20";
        case "cold":
            return "text-text-secondary bg-text-secondary/10 border-text-secondary/20";
        default:
            return "text-text-secondary";
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1) + " Lead";
};

export default function AgentLeadsPage() {
    const hotLeads = leads.filter((l) => l.status === "hot");
    const warmLeads = leads.filter((l) => l.status === "warm");

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-h3 font-display text-text font-light">
                        Lead Pipeline
                    </h1>
                    <p className="text-text-secondary mt-2">
                        {hotLeads.length} hot • {warmLeads.length} warm •{" "}
                        {leads.filter((l) => l.status === "cold").length} cold
                    </p>
                </div>
                <Button variant="primary">Add Lead</Button>
            </div>

            <div className="space-y-4">
                {leads.map((lead) => (
                    <Card
                        key={lead.id}
                        className="hover:border-accent/50 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start gap-4">
                                        <div>
                                            <h3 className="text-h6 text-text font-light">
                                                {lead.name}
                                            </h3>
                                            <p className="text-text-secondary mt-1 text-sm">
                                                {lead.email} • {lead.phone}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${getStatusColor(lead.status)}`}
                                        >
                                            {getStatusLabel(lead.status)}
                                        </span>
                                    </div>

                                    <div className="border-border mb-4 grid grid-cols-1 gap-6 border-t pt-3 md:grid-cols-3">
                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Budget
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                $
                                                {(
                                                    lead.budget / 1000000
                                                ).toFixed(2)}
                                                M
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Interests
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {lead.interests.map(
                                                    (interest) => (
                                                        <span
                                                            key={interest}
                                                            className="bg-accent/10 text-accent rounded px-2 py-1 text-xs"
                                                        >
                                                            {interest}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-text-secondary mb-1 text-xs">
                                                Last Contact
                                            </p>
                                            <p className="text-text text-sm font-medium">
                                                {lead.lastContact}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-text-secondary text-sm">
                                        <span className="text-accent font-medium">
                                            Next action:{" "}
                                        </span>
                                        {lead.nextAction}
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
                                        Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lead Management Tips</CardTitle>
                    <CardDescription>
                        Best practices for converting leads to sales
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 text-sm font-medium">
                            1.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Contact hot leads within 24 hours with personalized
                            property suggestions
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 text-sm font-medium">
                            2.
                        </span>
                        <p className="text-text-secondary text-sm">
                            Send warm leads monthly market reports and new
                            listing alerts
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className="text-accent flex-shrink-0 text-sm font-medium">
                            3.
                        </span>
                        <p className="text-text-secondary text-sm">
                            For cold leads, establish a nurture campaign with
                            educational content
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

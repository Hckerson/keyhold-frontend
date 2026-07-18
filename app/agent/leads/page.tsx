import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StepList, type Step } from "@/components/ui/step-list";
import { ContactRow, type BadgeTone } from "@/components/dashboard/contact-row";

type LeadStatus = "hot" | "warm" | "cold";

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    budget: number;
    interests: string[];
    status: LeadStatus;
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

const statusMeta: Record<LeadStatus, { tone: BadgeTone; label: string }> = {
    hot: { tone: "success", label: "Hot Lead" },
    warm: { tone: "warning", label: "Warm Lead" },
    cold: { tone: "neutral", label: "Cold Lead" },
};

const tips: Step[] = [
    {
        title: "Respond fast to hot leads",
        description:
            "Contact hot leads within 24 hours with personalized property suggestions.",
    },
    {
        title: "Nurture warm leads",
        description:
            "Send warm leads monthly market reports and new listing alerts.",
    },
    {
        title: "Keep cold leads engaged",
        description:
            "Establish a nurture campaign with educational content for cold leads.",
    },
];

export default function AgentLeadsPage() {
    const count = (status: LeadStatus) =>
        leads.filter((l) => l.status === status).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Lead Pipeline"
                description={`${count("hot")} hot · ${count("warm")} warm · ${count("cold")} cold`}
                action={
                    <Button variant="primary" size="sm">
                        Add Lead
                    </Button>
                }
            />

            <div className="space-y-4">
                {leads.map((lead) => (
                    <ContactRow
                        key={lead.id}
                        name={lead.name}
                        subtitle={`${lead.email} · ${lead.phone}`}
                        badge={statusMeta[lead.status]}
                        fields={[
                            {
                                label: "Budget",
                                value: (
                                    <span className="tabular-nums">
                                        ${(lead.budget / 1_000_000).toFixed(2)}M
                                    </span>
                                ),
                            },
                            {
                                label: "Interests",
                                value: (
                                    <div className="flex flex-wrap gap-1">
                                        {lead.interests.map((interest) => (
                                            <span
                                                key={interest}
                                                className="bg-accent-light text-accent rounded px-2 py-0.5 text-xs font-normal"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                ),
                            },
                            { label: "Last Contact", value: lead.lastContact },
                        ]}
                        nextAction={lead.nextAction}
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
                                    Details
                                </Button>
                            </>
                        }
                    />
                ))}
            </div>

            <Panel
                title="Lead Management Tips"
                description="Best practices for converting leads to sales"
            >
                <StepList steps={tips} />
            </Panel>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { ContactRow } from "@/components/features/shared/contact-row";
import { tierMeta, type VIPClient } from "@/lib/data/agent-concierge";
import { formatMillions } from "@/lib/utils";

export interface ConciergeClientRowProps {
    client: VIPClient;
}

export function ConciergeClientRow({ client }: ConciergeClientRowProps) {
    return (
        <ContactRow
            contact={{
                name: client.name,
                subtitle: client.status,
                badge: tierMeta[client.tier],
                fields: [
                    {
                        label: "Budget",
                        value: (
                            <span className="tabular-nums">
                                {formatMillions(client.budget)}
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
    );
}

ConciergeClientRow.displayName = "ConciergeClientRow";

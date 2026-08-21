import { Button } from "@/components/ui/button";
import { PortalHeader } from "@/components/patterns/portal-header";

const CONCIERGE_TITLE = "VIP Concierge";
const CONCIERGE_LEDE =
    "White-glove coverage across your highest-value relationships";
const ADD_ACTION = "Add VIP Client";

export interface ConciergeHeaderProps {
    summary: string;
}

export function ConciergeHeader({ summary }: ConciergeHeaderProps) {
    return (
        <PortalHeader
            title={CONCIERGE_TITLE}
            lede={CONCIERGE_LEDE}
            summary={summary}
            action={
                <Button type="button" variant="primary" size="sm">
                    {ADD_ACTION}
                </Button>
            }
        />
    );
}

ConciergeHeader.displayName = "ConciergeHeader";

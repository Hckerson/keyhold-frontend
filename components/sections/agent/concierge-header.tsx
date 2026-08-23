import { PortalHeader } from "@/components/patterns/portal-header";

const CONCIERGE_TITLE = "VIP Concierge";
const CONCIERGE_LEDE =
    "White-glove coverage across your highest-value relationships";

export interface ConciergeHeaderProps {
    summary: string;
}

export function ConciergeHeader({ summary }: ConciergeHeaderProps) {
    return (
        <PortalHeader
            title={CONCIERGE_TITLE}
            lede={CONCIERGE_LEDE}
            summary={summary}
        />
    );
}

ConciergeHeader.displayName = "ConciergeHeader";
